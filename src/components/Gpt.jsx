import React, { useState } from 'react';

function Gpt() {
    const [query, setQuery] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [showNutrition, setShowNutrition] = useState(null); // Track if nutritional info is visible for each recipe
    const [showHealthLabels, setShowHealthLabels] = useState(null); // Track if health labels are visible for each recipe

    const fetchRecipes = async () => {
        try {
            const response = await fetch(
                `https://api.edamam.com/search?q=${query}&app_id=81f9552d&app_key=`
            );
            const data = await response.json();
            if (data.hits && Array.isArray(data.hits)) {
                setRecipes(data.hits);
            } else {
                setRecipes([]);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setRecipes([]);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchRecipes();
    };

    return (
        <div>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a recipe"
                />
                <button type="submit">Search</button>
            </form>

            {recipes.length > 0 ? (
                recipes.map((hit, index) => (
                    <div key={index} style={{ marginBottom: '20px' }}>
                        <img
                            src={hit.recipe?.image || "default-image-url.jpg"}
                            alt={hit.recipe?.label || "Recipe"}
                            style={{ width: '100%', maxWidth: '300px' }}
                        />
                        <button onClick={() => setShowNutrition(showNutrition === index ? null : index)}>
                            Nutritional Value
                        </button>
                        <button onClick={() => setShowHealthLabels(showHealthLabels === index ? null : index)}>
                            Health Labels
                        </button>

                        {/* Conditional rendering for nutritional value */}
                        {showNutrition === index && (
                            <div>
                                <h3>Nutritional Information:</h3>
                                <p>Calories: {Math.round(hit.recipe?.calories) || "N/A"}</p>
                                <p>Total Weight: {Math.round(hit.recipe?.totalWeight) || "N/A"} g</p>
                                <p>Total Time: {hit.recipe?.totalTime || "N/A"} mins</p>
                            </div>
                        )}

                        {/* Conditional rendering for health labels */}
                        {showHealthLabels === index && (
                            <div>
                                <h3>Health Labels:</h3>
                                <ul>
                                    {hit.recipe?.healthLabels?.map((label, i) => (
                                        <li key={i}>{label}</li>
                                    )) || <li>No health labels available</li>}
                                </ul>
                            </div>
                        )}
                    </div>
                ))
            ) : (
                <p>No recipes found. Try a different search term.</p>
            )}
        </div>
    );
}

export default Gpt;

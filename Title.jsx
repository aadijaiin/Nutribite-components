import React, { useState } from 'react';

const Title = () => {
  const [query, setQuery] = useState('');
  const [recipeTitles, setRecipeTitles] = useState([]);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const fetchRecipeTitles = async () => {
    const appId = '81f9552d';
    const appKey = 'e07c3da68262b65eab0000da428d846a';

    const url = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${appKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        const titles = data.hits.map(hit => hit.recipe.label);
        setRecipeTitles(titles);
        setError(null); // Clear any previous errors
      } else {
        setRecipeTitles([]); // Clear titles if no results
        setError("No recipes found for the search query.");
      }
    } catch (error) {
      console.error("Error fetching recipes:", error);
      setError("There was an error fetching the recipes.");
    }
  };

  const handleSearch = () => {
    if (query.trim() !== '') {
      fetchRecipeTitles();
    } else {
      setError("Please enter a search term.");
    }
  };

  return (
    <div>
      <h1>Recipe Search</h1>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter ingredient or recipe"
      />
      <button onClick={handleSearch}>Search</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {recipeTitles.map((title, index) => (
          <li key={index}>{title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Title;
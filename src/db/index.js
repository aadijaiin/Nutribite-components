import mongoose from "mongoose";


export const connectDB = async () => {
    try {
      const connectionInstance =  
      await mongoose.connect("")

      console.log(`\n MongoDB connected !! DB Host : ${
        connectionInstance.connection.host
      }`);
       
  
    
      } catch (error) {
          console.log("MongoDB connection error",error)
          process.exit(1)
          
      }
}
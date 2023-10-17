import mongoose from "mongoose"

export const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGO_URL, {
         useNewUrlParser: true,
         useUnifiedTopology: true,
      });
      console.log("connected to mongodb")
   } catch (error) {
      throw error;
   }
};

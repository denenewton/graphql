import mongoose from "mongoose";

const conn = async () => {
    try {
      await mongoose.connect(process.env.URL_MONGO);
      console.log("Connected with mongoDB");
    } catch (error) {
      console.log(error);
    }
  };


export default conn;
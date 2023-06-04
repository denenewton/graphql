import "dotenv/config";
import { ApolloServer } from "apollo-server";
//import express from "express";
//import cors from "cors";
import mongoose from "mongoose";

///const app = express();
//app.use(cors());

const port = parseInt(process.env.PORT) || 4000;

//Connect to DB.
const conn = async () => {
  try {
    await mongoose.connect(process.env.URL_MONGO);
    console.log("Connected with mongoDB");
  } catch (error) {
    console.log(error);
  }
};

function server({ typeDefs, resolvers }) {
  conn();
  const server = new ApolloServer({ typeDefs, resolvers });
  //await server.start();
  //server.applyMiddleware({ app });
  //app.listen(port, () => { console.log(`http://localhost:${port}/graphql`);});

  server.listen({ port: port}).then(({ url }) => console.log(`🚀 Server ready at ${url}`));
}

export default server;

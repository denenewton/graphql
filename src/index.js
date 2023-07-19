import "dotenv/config";
import { createYoga, createSchema } from "graphql-yoga";
import Castmember from "./model/Castmember";
import resolvers from "./graphql/resolvers";
import typeDefs from "./graphql/typeDefs";
import { createServer } from "node:http";
import conn from "./utils/connectMongo";
import Movie from "./model/Movie";

const port = parseInt(process.env.PORT) || 4000;

export const config = {
  api: { bodyParser: false },
};

(async function () {
  await conn();
})();

const schema = createSchema({
  typeDefs,
  resolvers: resolvers,
});

const yoga = createYoga({
  schema,
  context: { Castmember, Movie },
  graphqlEndpoint: "/graphql",
  cors: "*",
  fetchAPI: { Response },
});

const server = createServer(yoga);

server.listen(port, () => {
  console.info("🚀 Server is running on http://localhost:4000/graphql");
});

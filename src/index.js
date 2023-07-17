import "dotenv/config";
import { createYoga, createSchema } from "graphql-yoga";
import { createServer } from "node:http";
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import conn from "./utils/connectMongo";
import Movie from "./model/Movie";
import Castmember from "./model/Castmember";

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

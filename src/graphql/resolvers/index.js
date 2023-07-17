import { Mutation } from "./Mutation";
import { Movie, Query } from "./Query";

export default {
  Movie: {...Movie },
  Query: { ...Query },
  Mutation: { ...Mutation },
};

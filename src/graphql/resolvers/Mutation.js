import {
  verifyIdField,
  hasErrosMovie,
  ifMovieExists,
  payloadToSend,
  verifyUniqueFields,
} from "../../utils/hasErrors"

export const Mutation = {
  createMovie: async (_, { data }, { Movie }) => {
    if (hasErrosMovie(data)) return hasErrosMovie(data);

    if (await verifyUniqueFields(Movie, data))
      return await verifyUniqueFields(Movie, data);

    const _movie = await Movie.create(data);
    if (_movie) return payloadToSend(_movie);
  },

  updateMovie: async (_, { data, id }, { Movie }) => {
    if (verifyIdField(id)) return verifyIdField(id);

    if(await ifMovieExists(Movie, id, data?.title)) 
    return  await ifMovieExists(Movie, id, data?.title)
    

    if (data?.id) {
      return {
        __typename: "Error",
        message: "Sorry! id fields cannot be updated.",
      };
    }

    var movie = await Movie.findOneAndUpdate({ id: Number(id) }, data, {
      new: true,
    });

    return payloadToSend(movie);
  },

  deleteMovie: async (_, { id }, { Movie }) => {
    if (verifyIdField(id)) return verifyIdField(id);

    const movie = await Movie.findOneAndDelete({ id: Number(id) });

    if (!movie) {
      return {
        __typename: "Error",
        message: "Sorry! this movie doesn't exisist!!",
      };
    }

    if (movie) return payloadToSend(movie);
  },
};

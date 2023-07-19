import { verifyIdField, hasErrosMovie } from "../../utils/utilities";

export const Mutation = {

  createMovie: async (_, { data }, { Movie }) => {
    if (hasErrosMovie(data)) return hasErrosMovie(data);

    const movie = await Movie.findOne({ id: Number(data.id) });

    if (movie) {
      return {
        __typename: "Error",
        message: "This ID already exists try another one!!",
      };
    }

    const _movie = await Movie.create(data);
    if (_movie) return payloadToSend(_movie);
  },


  updateMovie: async (_, { data, id }, { Movie }) => {
    if (verifyIdField(id)) return verifyIdField(id);

    const mov = await Movie.findOne({ id: id });

    if (!mov) {
      return {
        __typename: "Error",
        message: "Sorry! this movie doesn't exisist!!",
      };
    }

    if (data?.id) {
      return {
        __typename: "Error",
        message: "Sorry! id can't be updated!!",
      };
    }

    var movie = await Movie.findOneAndUpdate({ id: Number(id) }, data, {new : true});

    if (!movie){
      return {
        __typename: "Error",
        message: "Sorry! this movie doesn't exisist!!",
      };
    }

     return payloadToSend(movie);


  },

  deleteMovie: async (_, { id }, { Movie }) =>{
    if (verifyIdField(id)) return verifyIdField(id);

    const movie  = await Movie.findOneAndDelete({ id: Number(id)})

    if (!movie){
      return {
        __typename: "Error",
        message: "Sorry! this movie doesn't exisist!!",
      };
    }

    if(movie) return payloadToSend(movie)
  }
    
};

function payloadToSend(_movie) {
  delete _movie["_doc"]._id;
  delete _movie["_doc"].__v;

  var payload = _movie["_doc"];

  return {
    __typename: "Movie",
    ...payload,
  };
}

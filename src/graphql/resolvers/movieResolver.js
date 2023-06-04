import Movie from '../../model/Movie'


export default {
  Query: {
    movies: async () => await Movie.find(),
    movie: async (_ , {id}) => await Movie.findById(id),
    getMovieByTitle: async (_, {title}) => await Movie.findOne({title: title}),
    getMovieByGenre: async (_, {genre}) => await Movie.find({genre: genre}),
    getMovieByYear: async (_, {year}) => await Movie.find({year: year}),
    
  },
  Mutation: {
    createMovie: async (_, {data}) => await Movie.create(data),
    updateMovie: async (_, {id, data}) => await Movie.findOneAndUpdate({_id: id}, data, { new: true }),
    deleteMovie: async (_, {id}) => !!( await Movie.findOneAndDelete(id)),
  },
};


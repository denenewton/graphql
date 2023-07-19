import { filtering } from '../../utils/utilities'

export const  Movie =  {
    cast: async (parent, args, { Castmember}) =>{
    const res = await Castmember.find({movieID: parent.id})
    return res
    },    
}


export const Query = {

    movies: async (_, { filter }, { Movie }) => await filtering(filter, Movie),
  
    movie: async (_ , { id }, { Movie}) => await Movie.findOne({id}),

    getMovieByTitle: async (_, {title}, {Movie}) => await Movie.findOne({title: { $regex: title, $options: "i" }}),

    getMovieByGenre: async (_, {genre}, {Movie}) => await Movie.find({genre: genre}),

    getMovieByYear: async (_, {year},  {Movie}) => await Movie.find({year: year}),
    
}
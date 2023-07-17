export const Mutation = {
    
    createMovie: async (_, {data},  {Movie}) => await Movie.create(data),

    updateMovie: async (_, {id, data},  {Movie}) => await Movie.findOneAndUpdate({_id: id}, data, { new: true }),

    deleteMovie: async (_, {id},  {Movie}) => !!( await Movie.findOneAndDelete(id)),
}
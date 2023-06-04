import mongoose from "mongoose";


const Schema = mongoose.Schema({
    title: {
        type:String,
        required:true
    },
    genre: {
        type:String,
        required:true
    },
    year: {
        type:Number,
        required:true
    },
    director:  {
        type:String,
        required:true
    },
    urlImage:{
        type:String,
        
    },
    urlMovie:{
        type:String,
       
    },
    description: {
        type:String,
        required:true
    },
    
})

export default mongoose.model('Movie' , Schema)

/**
 *  title:String!
    genre: String!
    year: Int!
    director: String!
    urlImage: String
    urlMovie: String
    description: String!
 */
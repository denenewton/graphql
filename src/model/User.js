import mongoose from "mongoose";


const Schema = mongoose.Schema({
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:false
    },
    active: {
        type:Boolean,
        required:true
    }
})

export default mongoose.model('User' , Schema)
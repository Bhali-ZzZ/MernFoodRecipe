import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {type:String , required:true},
    email : {type:String , required:true},
    password : {type:String , required:true},
    favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "recipies"
    }
  ]
})

const userModel = mongoose.model('users',userSchema)

export default userModel
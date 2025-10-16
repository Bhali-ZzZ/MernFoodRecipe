import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    title : {type:String , required:true},
    ingradients : {type:[String] , required:true},
    instruction : {type:String , required:true},
    image : {type:String , required:true},
    time : {type:String , required:true},
    addedBy : {type: mongoose.Schema.Types.ObjectId,
      ref: "users", // this links to your userModel
      required: true},
})

const recipeModel = mongoose.model('recipies',recipeSchema)

export default recipeModel
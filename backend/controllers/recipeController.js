import { v2 as cloudinary } from 'cloudinary'
import recipeModel from '../models/recipeModel.js'
import userModel from '../models/userModel.js'

export const addRecipe = async(req,res)=>{
    try {
        
        const {title , ingradients , instruction , time} = req.body
        const userId = req.userId
        const imageFile = req.file

        if(!title || !ingradients || !instruction || !time || !userId || !imageFile){
            return res.json({success:false , message:"Missing details"})
        }
        const imageUpload = await cloudinary.uploader.upload(imageFile.path)

        const newRecipe = new recipeModel({
            title,
            ingradients,
            instruction,
            time,
            addedBy: userId,
            image: imageUpload.secure_url
        })

        await newRecipe.save()

        res.json({success:true , message:"Recipe Added!"})


    } catch (error) {
        res.json({success:false , message:error.message})
    }
}


export const removeRecipe = async(req,res)=>{
    try {
        
        const {id} = req.body
        await recipeModel.findByIdAndDelete(id)
        res.json({success:true , message:"Recipe deleted!"})

    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

export const updateRecipe = async (req, res) => {
  try {
    const { title, ingradients, instruction, time, id } = req.body
    const imageFile = req.file

    // Check if recipe exists
    const recipe = await recipeModel.findById(id)
    if (!recipe) {
      return res.json({ success: false, message: "Recipe not found" })
    }

    // Upload image if provided
    let imageUrl = recipe.image
    if (imageFile) {
      const imageUpload = await cloudinary.uploader.upload(imageFile.path)
      imageUrl = imageUpload.secure_url
    }

    // ✅ Correctly update fields
    recipe.title = title || recipe.title
    recipe.ingradients = ingradients || recipe.ingradients
    recipe.instruction = instruction || recipe.instruction
    recipe.time = time || recipe.time
    recipe.image = imageUrl

    await recipe.save()

    res.json({ success: true, message: "Recipe Updated", recipe })
  } catch (error) {
    res.json({ success: false, message: error.message })
  }
}


export const getAllRecipies = async(req,res)=>{
    try {
        
        const recipies = await recipeModel.find({}).populate("addedBy", "name email");
        res.json({success:true , recipies})

    } catch (error) {
        res.json({success:false , message:error.message})
    }
}

export const getRecipeById = async(req,res)=>{
    try {
        
        const userId = req.userId

        const recipes = await recipeModel.find({ addedBy: userId }).populate("addedBy", "name email");

        if (!recipes || recipes.length === 0) {
          return res.json({ success: false, message: "No recipes found for this user" });
        }

        res.json({success:true , recipes})

    } catch (error) {
        res.json({success:false , message:error.message})
    }
}


export const favouriteRecipe = async (req, res) => {
  try {
    const userId = req.userId; // from Auth middleware
    const { recipeId } = req.body;

    // Check if recipe exists
    const recipe = await recipeModel.findById(recipeId)
    if (!recipe) {
      return res.json({ success: false, message: "Recipe not found" });
    }

    // Find the user
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // Check if already in favourites
    const alreadyFav = user.favourites.includes(recipeId);

    if (alreadyFav) {
      // remove from favourites
      user.favourites = user.favourites.filter(
        (favId) => favId.toString() !== recipeId
      );
      await user.save();
      return res.json({ success: true, message: "Removed from favourites 💔" });
    } else {
      // add to favourites
      user.favourites.push(recipeId);
      await user.save();
      return res.json({ success: true, message: "Added to favourites ❤️" });
    }
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


export const getFavouriteRecipes = async (req, res) => {
  try {
    const user = await userModel.findById(req.userId).populate("favourites");
    res.json({ success: true, favourites: user.favourites });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

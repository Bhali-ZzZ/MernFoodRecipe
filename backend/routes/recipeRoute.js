import express from 'express'
import upload from '../middlewares/multer.js'
import { addRecipe, favouriteRecipe, getAllRecipies, getFavouriteRecipes, getRecipeById, removeRecipe, updateRecipe } from '../controllers/recipeController.js'
import { AuthUser } from '../middlewares/AuthUser.js'

const recipeRouter = express.Router()

recipeRouter.post('/add-recipe',AuthUser,upload.single('image'),addRecipe)
recipeRouter.post('/remove-recipe',AuthUser,removeRecipe)
recipeRouter.get('/all-recipes',getAllRecipies)
recipeRouter.get('/user-recipes',AuthUser,getRecipeById)
recipeRouter.post("/favourite", AuthUser, favouriteRecipe);
recipeRouter.get("/user-favourite", AuthUser, getFavouriteRecipes);
recipeRouter.post('/update-recipe', AuthUser, upload.single('image'), updateRecipe)

export default recipeRouter
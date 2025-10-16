import axios from 'axios'
import React, { useState } from 'react'
import { useContext } from 'react'
import { toast } from 'react-toastify'
import { AppContext } from '../context/AppContext'

const AddRecipe = () => {

  const {token , backendUrl , getFavRecipies , getRecipeById , getAllRecipies} = useContext(AppContext)

  const [title, setTitle] = useState('')
  const [ingredients, setIngredients] = useState('')
  const [instructions, setInstructions] = useState('')
  const [image, setImage] = useState(null)
  const [time, setTime] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append('title',title)
    formData.append('ingradients', ingredients)
    formData.append('instruction', instructions)
    formData.append('image',image)
    formData.append('time',time)

    try {
      const {data} = await axios.post(backendUrl + '/api/recipe/add-recipe',formData,{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getFavRecipies()
        getRecipeById()
        getAllRecipies()
      }else{
        toast.error(data.message)
      }
      

    } catch (error) {
      toast.error(error.message)
    }


    setTitle('')
    setIngredients('')
    setInstructions('')
    setImage(null)
    setTime('')
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-6 sm:p-10 rounded-2xl w-[90%] max-w-lg">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Add New Recipe
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-gray-700 mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter recipe title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Ingredients */}
          <div>
            <label className="block text-gray-700 mb-1">Ingredients</label>
            <textarea
              placeholder="List ingredients (comma separated)"
              value={ingredients}
              onChange={(e) => setIngredients(e.target.value)}
              required
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Instructions */}
          <div>
            <label className="block text-gray-700 mb-1">Instructions</label>
            <textarea
              placeholder="Write cooking instructions"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              required
              rows="4"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-gray-700 mb-1">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {/* Preview */}
            {image && (
              <div className="mt-3 flex justify-center">
                <img
                  src={URL.createObjectURL(image)}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-md border border-gray-300"
                />
              </div>
            )}
          </div>

          {/* Time */}
          <div>
            <label className="block text-gray-700 mb-1">Cooking Time</label>
            <input
              type="text"
              placeholder="e.g. 30 mins"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors duration-200"
          >
            Add Recipe
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddRecipe

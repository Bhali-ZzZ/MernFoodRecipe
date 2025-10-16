import React from 'react'
import { useParams } from 'react-router-dom'
import recipesData from '../assets/assets'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const RecipeDetailPage = () => {
  const { id } = useParams()
  const {myRecipies , allRecipies , favRecipies} = useContext(AppContext)
  const recipe = myRecipies.find(r => r._id === id) || allRecipies.find((r) => r._id === id) || favRecipies.find((r) => r._id === id)

  if (!recipe) {
    return <p className="text-center mt-10 text-red-600">Recipe not found!</p>
  }

  return (
    <div className="max-w-3xl mx-auto my-10">
      <img src={recipe.image} alt={recipe.title} className="w-full h-64 object-cover rounded-lg shadow" />
      <h1 className="text-3xl font-bold mt-4 mb-2">{recipe.title}</h1>
      <p className="text-gray-600 mb-4">⏱ Time: {recipe.time}</p>
      <h2 className="text-xl font-semibold mb-2">Ingredients:</h2>
      <ul className="list-none text-gray-700 mb-4">
        {recipe.ingradients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <h2 className="text-xl font-semibold mb-2">Instructions:</h2>
      <p className="text-gray-700">{recipe.instruction}</p>
    </div>
  )
}

export default RecipeDetailPage

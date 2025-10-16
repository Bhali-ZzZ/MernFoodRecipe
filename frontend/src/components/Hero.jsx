import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Hero = () => {

  const {token} = useContext(AppContext)

  const navigate = useNavigate()

  const shareRecipe = ()=>{
    if(token){
      navigate('/add-recipe')
    }else{
      toast.warning("Please login to add new recipe!")
    }
  }

  return (
    <div className='flex flex-col-reverse sm:flex-row items-center sm:my-10 my-5'>
      <div className='w-full sm:w-1/2 pl-4 sm:pl-8 py-3 sm:py-7 flex flex-col gap-12 text-gray-800'>
        <p className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold'>Food Recipe</p>
        <p className='text-gray-600 text-xs sm:text-sm'>Welcome to Food Blog, your go-to place for mouthwatering recipes from around the world.
Whether you’re a home chef or a foodie at heart, explore thousands of dishes shared by passionate cooks like you.</p>
        <button onClick={shareRecipe} className='text-white w-fit font-semibold px-4 sm:px-6 py-2 sm:py-3 bg-gray-800 hover:bg-white hover:text-gray-800 border border-gray-800 rounded hover:transition-all duration-200 cursor-pointer'>Share your recipe</button>
      </div>

      <div className='w-full sm:w-1/2 flex justify-center items-center'>
        <img className='max-w-80' src={assets.f1} alt=""/>
      </div>
    </div>
  )
}

export default Hero

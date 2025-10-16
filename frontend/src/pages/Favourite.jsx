import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'
import Loading from '../components/Loading'


const Favourite = () => {

  const navigate = useNavigate()

  const {favRecipies} = useContext(AppContext)

  return favRecipies && favRecipies.length > 0 ? (
    <div>
       <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center my-5 sm:my-10'>Favourite Recipies</h1>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
              {favRecipies.map((recipe,index)=>(
                <div onClick={()=>navigate(`/recipe/${recipe._id}`)} key={index} className='flex flex-col shadow-sm shadow-gray-300 cursor-pointer'>
                  <img className='w-96 h-44 sm:h-56' src={recipe.image} alt=""/>
                  <p className='text-center font-semibold text-gray-800'>{recipe.title}</p>
                    <p className='text-xs sm:text-sm text-gray-600 my-1 mx-1'><span className='text-gray-800 font-semibold'>Time:</span> {recipe.time}</p>
                </div>
              ))}
            </div>
    </div>
  ) : <Loading/>
}

export default Favourite

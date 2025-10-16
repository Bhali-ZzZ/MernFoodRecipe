import React from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { MdEdit, MdDelete } from 'react-icons/md'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'
import Loading from '../components/Loading'

const RecipePage = () => {

  const {myRecipies , backendUrl , getFavRecipies , getRecipeById , getAllRecipies , token} = useContext(AppContext)
  const navigate = useNavigate()

  const deleteRecipe = async(id , e)=>{
    e.stopPropagation();
    try {
      const {data} = await axios.post(backendUrl + '/api/recipe/remove-recipe',{id},{headers:{token}})
      if(data.success){
        toast.success(data.message)
        getAllRecipies()
        getFavRecipies()
        getRecipeById()
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

 const updateHandler = (id, e) => {
    e.stopPropagation()
    navigate(`/update-recipe/${id}`)
  }



  return myRecipies && myRecipies.length > 0 ? (
    <div>
       <h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center my-5 sm:my-10'>My Recipies</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5'>
        {myRecipies.map((recipe,index)=>(
          <div onClick={()=>navigate(`/recipe/${recipe._id}`)} key={index} className='flex flex-col shadow-sm shadow-gray-300 cursor-pointer'>
            <img className='w-96 h-44 sm:h-56' src={recipe.image} alt=""/>
            <p className='text-center font-semibold text-gray-800'>{recipe.title}</p>
            <p className='text-center text-xs text-gray-800'>Added By: <span className='text-gray-500'>{recipe.addedBy.name}</span></p>
            <div className='flex justify-between px-1 py-3'>
              <p className='text-xs sm:text-sm text-gray-600'><span className='text-gray-800 font-semibold'>Time:</span> {recipe.time}</p>
               <div className="flex gap-4">
                  <MdEdit onClick={(e) => updateHandler(recipe._id, e)} className="text-blue-600 cursor-pointer text-xl hover:scale-110 transition-transform" />
                  <MdDelete onClick={(e)=>deleteRecipe(recipe._id , e)} className="text-red-600 cursor-pointer text-xl hover:scale-110 transition-transform" />
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ) : <Loading/>
}

export default RecipePage

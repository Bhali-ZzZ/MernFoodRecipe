import React, { useContext } from 'react'
import { AppContext } from './context/AppContext'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import RecipePage from './pages/RecipePage'
import Favourite from './pages/Favourite'
import Login from './pages/Login'
import RecipeDetailPage from './pages/RecipeDetailPage'
import AddRecipe from './pages/AddRecipe'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UpdateRecipe from './pages/UpdateRecipe'

const App = () => {

  

  return (
    <div className='px-[3vw] sm:px-[7vw] lg:px-[9vw]'>
      <Navbar/>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/my-recipe' element={<RecipePage/>}/>
        <Route path='/recipe/:id' element={<RecipeDetailPage/>}/>
        <Route path='/favourites' element={<Favourite/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/add-recipe' element={<AddRecipe/>}/>
        <Route path='/update-recipe' element={<UpdateRecipe/>}/>
        <Route path='/update-recipe/:recipeid' element={<UpdateRecipe/>}/>
      </Routes>
    </div>
  )
}

export default App

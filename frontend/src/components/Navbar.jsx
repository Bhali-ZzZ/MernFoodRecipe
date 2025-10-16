import React, { useContext } from 'react'
import {NavLink, useNavigate} from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'

const Navbar = () => {

  const {token , setToken , userData} = useContext(AppContext)

  const navigate = useNavigate()

    const logoutHandler = ()=>{
      localStorage.removeItem('token')   // 🧹 Remove token from localStorage
      setToken('')                      // 🧠 Clear token from context
      toast.success('Logged out successfully!') // 🎉 Toast message
      navigate('/login')  
  }

  return (
    <div className='flex justify-between items-center py-3'>
      <h1 onClick={()=>navigate('/')} className='text-xl sm:text-2xl md:text-3xl font-bold cursor-pointer'>Food Blog</h1>
      <ul className='flex gap-8 items-center'>
         {token && (
          <>
       <li className='font-medium'>
        <NavLink to={'/'}>Home</NavLink>
       </li>
       <li className='font-medium'>
        <NavLink to={'/my-recipe'}>My Recipe</NavLink>
       </li>
        <li className='font-medium'>
        <NavLink to={'/favourites'}>Favourites</NavLink>
        </li>
    </>
     )}
        {token
        ? <li onClick={logoutHandler} className='font-medium px-5 py-1.5 bg-black rounded-xl text-white cursor-pointer'>
         Logout
        </li>
        : <li onClick={()=>navigate('/login')} className='font-medium px-5 py-1.5 bg-black rounded-xl text-white cursor-pointer'>
          Login
        </li>
        }
        
      </ul>
    </div>
  )
}

export default Navbar

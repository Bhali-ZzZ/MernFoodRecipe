import axios from 'axios'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const {backendUrl , setToken} = useContext(AppContext)
  const navigate = useNavigate()

  const [isSignup, setIsSignup] = useState(false)
  const [name , setName] = useState('')
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

   const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    if (isSignup) {
      const { data } = await axios.post(`${backendUrl}/api/user/register`, {
        name,
        email,
        password,
      });

      if (data.success) {
        toast.success("User registered!");
        localStorage.setItem("token", data.token);
        setToken(data.token)
        navigate('/')

      } else {
        toast.error(data.message);
      }
    } else {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, {
        email,
        password,
      });

      if (data.success) {
        toast.success("Login successful!");
        localStorage.setItem("token", data.token);
        navigate('/')
        setToken(data.token)
      } else {
        toast.error(data.message);
      }
    }
  } catch (error) {
    console.error(error);
    toast.error(error.response?.data?.message || "Something went wrong!");
  }
};




  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <div className="bg-white p-6 sm:p-10 rounded-2xl w-[90%] max-w-md">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          {isSignup ? 'Create an Account' : 'Welcome Back'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignup && (
            <div>
              <label className="block text-gray-700 mb-1">Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e)=>setName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          )}

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
          >
            {isSignup ? 'Sign Up' : 'Log In'}
          </button>
        </form>

        <p className="text-center text-gray-600 text-sm mt-4">
          {isSignup ? 'Already have an account?' : "Don't have an account?"}{' '}
          <span
            className="text-blue-600 cursor-pointer font-medium hover:underline"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Log in' : 'Sign up'}
          </span>
        </p>
      </div>
    </div>
  )
}

export default Login

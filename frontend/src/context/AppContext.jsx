import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const AppContext = createContext()

const AppContextProvider = (prop)=>{

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const [token , setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)
    const [userData , setUserData] = useState(false)
    const [myRecipies , setMyRecipies] = useState([])
    const [allRecipies , setAllRecipies] = useState([])
    const [favRecipies , setFavRecipies] = useState([])

    const getUserData = async()=>{
        try {
            
            const {data} = await axios.get(backendUrl + '/api/user/data',{headers:{token}})
            if(data.success){
                setUserData(data.userData)
                
            }
            
        } catch (error) {
            console.log(error.message);
            
        }
    }
      
    
      const getRecipeById = async(req,res)=>{
        try {
          const {data} = await axios.get(backendUrl + '/api/recipe/user-recipes',{headers:{token}})
          if(data.success){
            setMyRecipies(data.recipes)
          }
        } catch (error) {
          toast.error(error.message)
        }
      }

      const getAllRecipies = async()=>{
        try {
          const {data} = await axios.get(backendUrl + '/api/recipe/all-recipes',{headers:{token}})
          if(data.success){
            setAllRecipies(data.recipies)
            console.log(data.recipies);
            
          }
        } catch (error) {
        toast.error(error.message)
        }
      }

      const getFavRecipies = async(req,res)=>{
        try {
            const {data} = await axios.get(backendUrl + '/api/recipe/user-favourite',{headers:{token}})
            if(data.success){
                setFavRecipies(data.favourites)
            }
        } catch (error) {
        toast.error(error.message)
        }
      }


      useEffect(()=>{
        getAllRecipies()
      },[])
    
      useEffect(()=>{
        if (token) {
          getRecipeById()
          getFavRecipies()
        }
      },[token])
      

    useEffect(()=>{
        if (token) {
            getUserData()
        }
    },[token])


    const value = {
        backendUrl,
        token,
        setToken,
        userData,
        myRecipies,
        allRecipies,
        favRecipies,
        getFavRecipies,
        getAllRecipies,
        getRecipeById
    }

    return (
        <AppContext.Provider value={value}>
            {prop.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider
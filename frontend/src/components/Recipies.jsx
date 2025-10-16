import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { toast } from "react-toastify";
import Loading from "./Loading";

const Recipies = () => {
  const { allRecipies, token, userData, backendUrl , getFavRecipies } = useContext(AppContext);
  const navigate = useNavigate();

  const [favourites, setFavourites] = useState([]);

  // ✅ Load favourites of current user (from context or API)
  useEffect(() => {
    if (userData && userData.favourites) {
      setFavourites(userData.favourites);
    }
  }, [userData]);

  // ✅ Toggle Favourite Handler
  const handleFavourite = async (recipeId, e) => {
    e.stopPropagation(); // Prevent opening recipe detail page

    if (!token) {
      toast.error("Please login to mark favourite");
      return;
    }

    try {
      const { data } = await axios.post(backendUrl + 
        "/api/recipe/favourite",
        { recipeId },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);

        // ✅ Update frontend instantly
        setFavourites((prev) =>
          prev.includes(recipeId)
            ? prev.filter((id) => id !== recipeId)
            : [...prev, recipeId]
        );
        getFavRecipies()
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Failed to update favourite");
      console.error(error);
    }
  };

  // ✅ Check if recipe is in favourites
  const isFavourite = (id) => favourites.includes(id);

  return allRecipies && allRecipies.length > 0 ? (
    <div>
      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center my-5 sm:my-10">
        All Recipes
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
        {allRecipies.map((recipe, index) => (
          <div
            onClick={() => navigate(`/recipe/${recipe._id}`)}
            key={index}
            className="flex flex-col shadow-sm shadow-gray-300 cursor-pointer rounded-md overflow-hidden bg-white"
          >
            <img
              className="w-96 h-44 sm:h-56 object-cover"
              src={recipe.image}
              alt=""
            />
            <p className="text-center font-semibold text-gray-800 px-2 mt-2">
              {recipe.title}
            </p>
            <p className="text-center text-xs text-gray-800">
              Added By:{" "}
              <span className="text-gray-500">
                {recipe.addedBy?.name || "Unknown"}
              </span>
            </p>

            <div className="flex justify-between items-center px-3 py-3">
              <p className="text-xs sm:text-sm text-gray-600">
                <span className="text-gray-800 font-semibold">Time:</span>{" "}
                {recipe.time}
              </p>

              {/* ❤️ Heart Icon */}
              {token 
              ? <div
                onClick={(e) => handleFavourite(recipe._id, e)}
                className="flex items-center justify-center"
              >
                {isFavourite(recipe._id) ? (
                  <AiFillHeart className="text-red-500 text-xl cursor-pointer hover:scale-110 transition-transform" />
                ) : (
                  <AiOutlineHeart className="text-gray-400 text-xl cursor-pointer hover:scale-110 transition-transform" />
                )}
              </div>
              : <div></div>
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  )
  : <Loading/>
};

export default Recipies;

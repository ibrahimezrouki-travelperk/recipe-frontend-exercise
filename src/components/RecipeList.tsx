import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { IRecipe } from "../models/IRecipe";
import { RecipeContainer, RecipeCard } from "./CommonStyles";
import Recipe from "./RecipeDetail";
import RecipeView from "../views/RecipeView";
import axios from "axios";

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);

  useEffect(() => {
    axios.get('http://localhost:8000/recipe/recipe/')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        console.error('Error getting all recipes: ', error)
      })
  }, [])

  console.log(recipes)
  return (
    <div>
      <RecipeContainer>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id}>
            <RecipeView recipe={recipe}/>
          </RecipeCard>
        ))}
      </RecipeContainer>
      <Link to="/recipes/create">Create Recipe</Link>
    </div>
  )
};

export default RecipeList;
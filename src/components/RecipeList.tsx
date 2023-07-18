import { useEffect, useState } from "react";
import { Link } from "react-router-dom"
import { IRecipe } from "../models/IRecipe";
import { RecipeContainer, RecipeCard, RecipeName } from "./CommonStyles";
import Recipe from "./RecipeEdit";
import RecipeDetail from "./RecipeDetail";
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

  return (
    <div>
      <RecipeContainer>
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id}>
            <RecipeDetail recipe={recipe}/>
          </RecipeCard>
        ))}
      </RecipeContainer>
      <Link to="/create">Create Recipe</Link>
    </div>
  )
};

export default RecipeList;
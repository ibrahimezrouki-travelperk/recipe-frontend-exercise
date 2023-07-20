import { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom"
import { IRecipe } from "../models/IRecipe";
import { RecipeContainer, RecipeCard } from "./CommonStyles";
import RecipeView from "../views/RecipeView";
import axios from "axios";

const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  const history = useHistory()
  useEffect(() => {
    axios.get('http://localhost:8000/recipe/recipe/')
      .then(response => {
        setRecipes(response.data);
      })
      .catch(error => {
        // console.log('Error getting all recipes: ', error);
        history.push('/disaster');
      })
  }, [])

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
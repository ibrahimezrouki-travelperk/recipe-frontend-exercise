import { useParams } from "react-router-dom"
import { IRecipe } from "../models/IRecipe";
import { IngredientItem, IngredientList, IngredientTitle, RecipeDescription, RecipeName } from "./CommonStyles";

interface IProps {
  recipe: IRecipe
}

const RecipeDetail: React.FC<IProps> = ({recipe}) => {
  return (
      <>
        <RecipeName>{recipe.name}</RecipeName>
        <RecipeDescription>{recipe.description}</RecipeDescription>
        <IngredientList>
          <IngredientTitle>Ingredients: </IngredientTitle>
          {recipe.ingredients.map((ingredient, index) => (
            <IngredientItem key={index}>{ingredient.name}</IngredientItem>
          ))}
        </IngredientList>
      </>
  )  
}

export default RecipeDetail;
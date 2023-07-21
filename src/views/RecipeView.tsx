import { useParams } from "react-router-dom"
import { IRecipe } from "../models/IRecipe";
import { IngredientItem, IngredientList, IngredientTitle, RecipeDescription, RecipeDescriptionTitle, RecipeName, RecipeNameTitle } from "../components/CommonStyles";

interface IProps {
  recipe: IRecipe
}

const RecipeView: React.FC<IProps> = ({recipe}) => {
  return (
      <>
        <RecipeName>{recipe.name}</RecipeName>
        <RecipeDescriptionTitle>Description:</RecipeDescriptionTitle>
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

export default RecipeView;
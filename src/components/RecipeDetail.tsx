import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IRecipe } from "../models/IRecipe";
import axios from "axios";
import { NegativeButton, NeutralButton, ErrorContainer, Form, FormContainer, FormGroup, Input, Label, RecipeCard, PositiveButton, TextArea } from "./CommonStyles";
import RecipeView from "../views/RecipeView";
import RecipeForm from "./RecipeForm";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [recipe, setRecipe] = useState<IRecipe>({
    name: '',
    description: '',
    ingredients: []
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    axios.get(`http://localhost:8000/recipe/recipe/${id}`)
      .then(response => {
        setRecipe(response.data);
      })
      .catch(error => {
        console.error('Error getting all recipes: ', error);
        history.push('/notfound');
      })
  }, [])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors: string[] = []
    if (recipe.name.trim() === '') {
      validationErrors.push('Recipe name is required')
    }
    if (recipe.ingredients.length === 0) {
      validationErrors.push('Recipe has to have at least one ingredient')
    }
    if (recipe.description.trim() === '') {
      validationErrors.push('Recipe description is required')
    }

    if (validationErrors.length > 0) {
      setFormErrors(validationErrors);
      return;
    }

    axios.put(`http://localhost:8000/recipe/recipe/${id}/`, recipe)
      .then(response => {
        // if successful, set form back to empty state and go back to recipe list
        setRecipe({
          name: '',
          description: '',
          ingredients: []
        })
        setFormErrors([]);
        history.push('/recipes');
      })
      .catch(error => {
        console.log('Error updating recipe: ', error)
        console.log(error.message)
        history.push('/notfound')
      })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {name, value} = e.target;
    setRecipe((previousRecipeValues) => ({
      ...previousRecipeValues,
      [name]: value
    }));
  }

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientNames = e.target.value.split(',');
    const ingredients = ingredientNames.map((name) => ({
      name: name.trim()
    }))

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients
    }))
  }

  const handleOnDelete = () => {
    axios.delete(`http://localhost:8000/recipe/recipe/${id}`)
    .then(response => {
      console.log('recipe successfully deleted');
      history.push('/recipes');
    })
    .catch(error => {
      console.error('Error deleting recipe: ', error);
      history.push('/notfound');
    })
  }

  const toggleEdit = () => {
    setEditMode(!editMode);
  }

  return (
    <>
      {!editMode ? (
      <>
        <RecipeCard>
          <RecipeView recipe={recipe} />
        </RecipeCard>
        <NeutralButton onClick={() => toggleEdit()}>Edit</NeutralButton>
        <NegativeButton onClick={() => handleOnDelete()}>Delete</NegativeButton>
      </>
      ): (
        <RecipeForm 
          handleSubmit={handleSubmit}
          handleInputChange={handleInputChange}
          handleIngredientChange={handleIngredientChange}
          formErrors={formErrors}
          submitButtonText="Edit Recipe"
          cancelButtonText="Cancel"
          onCancel={toggleEdit}
          recipe={recipe}
        />
      )}
    </>
  );
}

export default RecipeDetail
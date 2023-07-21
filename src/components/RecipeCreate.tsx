import React, { useState } from "react"
import { IRecipe } from "../models/IRecipe"
import { useHistory } from "react-router-dom";
import axios from "axios";
import RecipeForm from "./RecipeForm";
import useRecipeForm from "../customHooks/useRecipeForm";

const RecipeCreate: React.FC = () => {
  const history = useHistory();
  const {recipe, formErrors, setFormErrors, handleInputChange, handleIngredientChange, resetForm } = useRecipeForm({
    name: '',
    description: '',
    ingredients: []
  })

  const onCancel = () => {
    history.push('/recipes')
  }

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

    axios.post('http://localhost:8000/recipe/recipe/', recipe)
      .then(response => {
        // if successful, set form back to empty state and go back to recipe list
        resetForm()
        history.push('/recipes');
      })
      .catch(error => {
        console.error('Error posting to endpoint: ', error)
        history.push('/disaster')
      })
  }

  return (
    <RecipeForm 
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
      handleIngredientChange={handleIngredientChange}
      formErrors={formErrors}
      submitButtonText="Create Recipe"
      cancelButtonText="Cancel"
      onCancel={onCancel}
      recipe={recipe}
    />
  )
}

export default RecipeCreate;
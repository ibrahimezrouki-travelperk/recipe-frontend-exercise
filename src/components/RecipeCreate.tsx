import React, { useState } from "react"
import { IRecipe } from "../models/IRecipe"
import { useHistory } from "react-router-dom";
import { IIngredient } from "../models/IIngredient";
import { ErrorContainer, Form, FormContainer, FormGroup, Input, Label, SubmitButton, TextArea } from "./CommonStyles";
import axios from "axios";

const RecipeCreate: React.FC = () => {
  const [recipe, setRecipe] = useState<IRecipe>({
    name: '',
    description: '',
    ingredients: []
  })
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const history = useHistory();

  // name and description follow same approach
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
        setRecipe({
          name: '',
          description: '',
          ingredients: []
        })
        setFormErrors([]);
        history.push('/recipes');
      })
      .catch(error => {
        console.log('Error posting to endpoing: ', error)
      })
  }

  return (
    <FormContainer>
      {formErrors.length > 0 && (
        <ErrorContainer>
          <ul>
            {formErrors.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </ErrorContainer>
      )}
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="name">Name:</Label>
          <Input type="text" id="name" name="name" value={recipe.name} onChange={handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="description">Description:</Label>
          <TextArea id="description" name="description" value={recipe.description} onChange={handleInputChange}/>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="ingredients">Ingredients:</Label>
          <Input type="text" id="ingredients" name="ingredients" value={recipe.ingredients.map((ingredient) => ingredient.name).join(',')} onChange={handleIngredientChange}
          />
        </FormGroup>

        <SubmitButton type='submit'>Create Recipe</SubmitButton>
      </Form>
    </FormContainer>
  )
}

export default RecipeCreate
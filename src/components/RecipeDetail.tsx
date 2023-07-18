import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IRecipe } from "../models/IRecipe";
import axios from "axios";
import { DeleteButton, EditButton, ErrorContainer, Form, FormContainer, FormGroup, Input, Label, RecipeCard, SubmitButton, TextArea } from "./CommonStyles";
import RecipeView from "../views/RecipeView";

const RecipeDetail: React.FC = () => {
  const { id } = useParams<{id: string}>();
  const [recipe, setRecipe] = useState<IRecipe>({
    name: '',
    description: '',
    ingredients: []
  });
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
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

  // if (loading) {
  //   return <div>Loading...</div>
  // }

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
        <EditButton onClick={() => toggleEdit()}>Edit</EditButton>
        <DeleteButton onClick={() => handleOnDelete()}>Delete</DeleteButton>
      </>
      ): (
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
            <Label htmlFor="ingredients">Ingredients - comma separated list:</Label>
            <Input type="text" id="ingredients" name="ingredients" value={recipe.ingredients.map((ingredient) => ingredient.name).join(',')} onChange={handleIngredientChange}
            />
          </FormGroup>

          <SubmitButton type='submit'>Edit Recipe</SubmitButton>
          <EditButton type="button" onClick={() => toggleEdit()}>Cancel Edit</EditButton>
        </Form>
      </FormContainer>
      )}
    </>


    // if edit mode 


  );
}

export default RecipeDetail
import { useState } from "react"
import { FormContainer, ErrorContainer, Form, FormGroup, Label, Input, TextArea, PositiveButton, NeutralButton } from "./CommonStyles"
import { IRecipe } from "../models/IRecipe";

interface IProps {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleIngredientChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formErrors: string[];
  submitButtonText: string;
  cancelButtonText: string;
  onCancel: () => void;
  recipe: IRecipe;

}

const RecipeForm: React.FC<IProps> = ({
  handleSubmit,
  handleInputChange,
  handleIngredientChange,
  formErrors,
  submitButtonText,
  cancelButtonText,
  onCancel,
  recipe
}) => {

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
          <Label htmlFor="ingredients">Ingredients - comma separated list:</Label>
          <Input type="text" id="ingredients" name="ingredients" value={recipe.ingredients.map((ingredient) => ingredient.name).join(',')} onChange={handleIngredientChange}
          />
        </FormGroup>

        <PositiveButton type='submit'>{submitButtonText}</PositiveButton>
        <NeutralButton type="button" onClick={() => onCancel()}>{cancelButtonText}</NeutralButton>
      </Form>
    </FormContainer>
  )
}

export default RecipeForm;
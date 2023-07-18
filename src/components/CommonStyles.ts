import { styled } from "styled-components";

export const RecipeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const RecipeCard = styled.div`
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 16px;
  margin: 8px;
  flex-basics: calc(33.33% - 16px * 2);
`;

export const RecipeName = styled.h3`
  color: blue;
  font-size: 24px;
  margin-bottom: 8px;
`;

export const RecipeNameTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const RecipeDescription = styled.p`
  margin-bottom: 8px;
`;

export const RecipeDescriptionTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const IngredientList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

export const IngredientTitle = styled.h4`
  font-size: 16px;
  margin-bottom: 8px;
`;

export const IngredientItem = styled.li`
  font-size: 14px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

export const FormGroup = styled.div`
  margin-botton: 16px;
`;

export const FormContainer = styled.div`
  width: 400px;
  margin: 0 auto;
`;

export const ErrorContainer = styled.div`
  margin-bottom: 16px;
  color: red;
`;

export const Label = styled.label`
  font-weight: bold;
`;

export const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const TextArea = styled.textarea`
  width: 100%;
  height: 120px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

export const Button = styled.button`
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
`;

export const SubmitButton = styled(Button)`
  background-color: lightgreen;
  &:hover {
    background-color: green;
  }
`;

export const EditButton = styled(Button)`
  background-color: blue;
  margin-right: 8px;
`;

export const DeleteButton = styled(Button)`
  background-color: red;
`



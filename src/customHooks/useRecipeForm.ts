import { useState } from 'react';
import { IRecipe } from '../models/IRecipe';

const useRecipeForm = (initialRecipe: IRecipe) => {
  const [recipe, setRecipe] = useState<IRecipe>(initialRecipe);
  const [formErrors, setFormErrors] = useState<string[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setRecipe((prevRecipeValues) => ({
      ...prevRecipeValues,
      [name]: value,
    }));
  };

  const handleIngredientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const ingredientNames = e.target.value.split(',');
    const ingredients = ingredientNames.map((name) => ({
      name: name.trim(),
    }));

    setRecipe((prevRecipe) => ({
      ...prevRecipe,
      ingredients,
    }));
  };

  const resetForm = () => {
    setRecipe({
      name: '',
      description: '',
      ingredients: [],
    });
    setFormErrors([]);
  };

  return {
    recipe,
    formErrors,
    handleInputChange,
    handleIngredientChange,
    resetForm,
    setFormErrors,
    setRecipe
  };
};

export default useRecipeForm;

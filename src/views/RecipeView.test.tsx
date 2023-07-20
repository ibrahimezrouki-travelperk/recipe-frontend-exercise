import { render, screen } from "@testing-library/react";
import RecipeView from "./RecipeView";
import { IRecipe } from "../models/IRecipe";
import { IIngredient } from "../models/IIngredient";

describe('RecipeView', () => {
  test('renders recipe properties', () => {
    const mockIngredients: IIngredient[] = [
      {name: 'cheese'}, {name: 'dough'}
    ]
    const mockRecipe: IRecipe = {
      name: "Pizza",
      description: "put it in the oven",
      ingredients: mockIngredients
    }
    render(<RecipeView recipe={mockRecipe} />);
    expect(screen.getByText(mockRecipe.name)).toBeInTheDocument();
    expect(screen.getByText('Ingredients:')).toBeInTheDocument();
    expect(screen.getByText(mockIngredients[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockIngredients[1].name)).toBeInTheDocument();
    expect(screen.getByText('Description:')).toBeInTheDocument();
    expect(screen.getByText(mockRecipe.description)).toBeInTheDocument();
  });
})


import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { IRecipe } from "../models/IRecipe";
import { IIngredient } from "../models/IIngredient";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import RecipeList from "./RecipeList";
import {MemoryRouter, Router } from "react-router-dom";
import {createBrowserHistory} from 'history'

describe('RecipeList', () => {

  const mockAxios = new MockAdapter(axios);
  const mockPizzaIngredients: IIngredient[] = [
    {name: 'cheese'}, {name: 'dough'}
  ]
  const mockCakeIngredients: IIngredient[] = [
    {name: 'flour'}, {name: 'icing'}
  ]
  const mockRecipes: IRecipe[] = [
    {
      id: '1',
      name: "Pizza",
      description: "put it in the oven",
      ingredients: mockPizzaIngredients
    },
    {
      id: '2',
      name: "Cake",
      description: "is a lie",
      ingredients: mockCakeIngredients
    }
  ]
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('gets all recipes from server and renders them in RecipeViews', async () =>{
    mockAxios.onGet('http://localhost:8000/recipe/recipe/').reply(200, mockRecipes);
    render(
      <MemoryRouter>
        <RecipeList />
      </MemoryRouter>
    );
    await waitFor(() => screen.getByText('Pizza'));
    const pizzaRecipe = screen.getByText('Pizza');
    const cakeRecipe = screen.getByText('Cake');
    expect(pizzaRecipe).toBeInTheDocument();
    expect(cakeRecipe).toBeInTheDocument();
  })

  it('redirects to disaster page list of recipes not retrieved', async () =>{
    const history = createBrowserHistory()
    const pushSpy = jest.spyOn(history, 'push');
    mockAxios.onGet('http://localhost:8000/recipe/recipe/').reply(500);
    render(
      <Router history={history}>
        <RecipeList />
      </Router>
    ); 
    await waitFor(() => expect(pushSpy).toHaveBeenCalledWith('/disaster'));
  })

  it('redirects to RecipeCreate when link is clicked', async () => {
    const history = createBrowserHistory();
    const pushSpy = jest.spyOn(history, 'push');
    mockAxios.onGet('http://localhost:8000/recipe/recipe/').reply(200, mockRecipes);
    render(
      <Router history={history}>
        <RecipeList />
      </Router>
    );
    
    expect(screen.getByRole('link', {name: 'Create a recipe'})).toHaveAttribute('href', '/recipes/create');
    const createRecipeLink = screen.getByRole('link', {name: 'Create a recipe'});
    fireEvent.click(createRecipeLink, {button: 0});
    expect(pushSpy).toHaveBeenCalledWith('/recipes/create');
  })
})
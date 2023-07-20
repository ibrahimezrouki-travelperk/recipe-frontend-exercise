import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { IRecipe } from "../models/IRecipe";
import { IIngredient } from "../models/IIngredient";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, Router } from "react-router-dom";
import RecipeCreate from "./RecipeCreate";
import { createBrowserHistory } from "history";

describe('RecipeCreate', () => {
  const mockAxios = new MockAdapter(axios);
  const mockIngredients: IIngredient[] = [
    {name: 'cheese'}, {name: 'dough'}
  ]
  const mockRecipe: IRecipe = {
    name: "Pizza",
    description: "put it in the oven",
    ingredients: mockIngredients
  }

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('it renders the form correctly', () => {
    render(
      <MemoryRouter>
        <RecipeCreate />
      </MemoryRouter>
    );
    // TODO: check for all the elements in the form not just the buttons
    const createButton = screen.getByRole('button', { name: 'Create Recipe' });
    expect(createButton).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: 'Cancel' });
    expect(cancelButton).toBeInTheDocument();
  })

  test('it redirects after submitting form with valid data', async () => {
    mockAxios.onPost('http://localhost:8000/recipe/recipe/', mockRecipe).reply(200);
    const history = createBrowserHistory()
    const pushSpy = jest.spyOn(history, 'push');
    render(
      <Router history={history}>
        <RecipeCreate />
      </Router>
    );
    
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: mockRecipe.name } });

    const descriptionInput = screen.getByLabelText('Description:');
    fireEvent.change(descriptionInput, { target: { value: mockRecipe.description } });

    const ingredientInput = screen.getByLabelText('Ingredients - comma separated list:');
    fireEvent.change(ingredientInput, {target: {value: `${mockRecipe.ingredients[0].name},${mockRecipe.ingredients[1].name}`}});

    const createButton = screen.getByRole('button', { name: 'Create Recipe' });
    fireEvent.click(createButton);

    // Wait for the form submission to complete
    await waitFor(() => expect(pushSpy).toHaveBeenCalledWith('/recipes'));
  })

  test('it redirects to disaster page if error occurs', async () => {
    mockAxios.onPost('http://localhost:8000/recipe/recipe/', mockRecipe).networkError();
    const history = createBrowserHistory()
    const pushSpy = jest.spyOn(history, 'push');
    render(
      <Router history={history}>
        <RecipeCreate />
      </Router>
    );
    
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: mockRecipe.name } });

    const descriptionInput = screen.getByLabelText('Description:');
    fireEvent.change(descriptionInput, { target: { value: mockRecipe.description } });

    const ingredientInput = screen.getByLabelText('Ingredients - comma separated list:');
    fireEvent.change(ingredientInput, {target: {value: `${mockRecipe.ingredients[0].name},${mockRecipe.ingredients[1].name}`}});

    const createButton = screen.getByRole('button', { name: 'Create Recipe' });
    fireEvent.click(createButton);

    // Wait for the form submission to complete
    await waitFor(() => expect(pushSpy).toHaveBeenCalledWith('/disaster'));
  })

  test('it shows error if form validation fails', async () => {
    mockAxios.onPost('http://localhost:8000/recipe/recipe/', mockRecipe).networkError();
    const history = createBrowserHistory()
    const pushSpy = jest.spyOn(history, 'push');
    render(
      <Router history={history}>
        <RecipeCreate />
      </Router>
    );
    
    const nameInput = screen.getByLabelText('Name:');
    fireEvent.change(nameInput, { target: { value: mockRecipe.name } });

    const descriptionInput = screen.getByLabelText('Description:');
    fireEvent.change(descriptionInput, { target: { value: mockRecipe.description } });

    const ingredientInput = screen.getByLabelText('Ingredients - comma separated list:');
    fireEvent.change(ingredientInput, {target: {value: ''}});

    const createButton = screen.getByRole('button', { name: 'Create Recipe' });
    fireEvent.click(createButton);

    const errorMessage = screen.getByText('Recipe has to have at least one ingredient');

    // Wait for the form submission to complete
    await waitFor(() => expect(pushSpy).toHaveBeenCalledTimes(0));
    expect(errorMessage).toBeInTheDocument();
  })
  
})
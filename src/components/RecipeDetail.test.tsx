import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { IRecipe } from "../models/IRecipe";
import { IIngredient } from "../models/IIngredient";
import axios from "axios";
import MockAdapter from 'axios-mock-adapter';
import { MemoryRouter, Route, Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import RecipeDetail from "./RecipeDetail";

describe('RecipeDetail', () => {
  const mockAxios = new MockAdapter(axios);
  const mockIngredients: IIngredient[] = [
    {name: 'cheese'}, {name: 'dough'}
  ]
  const mockRecipe: IRecipe = {
    id: '1',
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
        <RecipeDetail />
      </MemoryRouter>
    );
    const createButton = screen.getByRole('button', { name: 'Edit' });
    expect(createButton).toBeInTheDocument();

    const cancelButton = screen.getByRole('button', { name: 'Delete' });
    expect(cancelButton).toBeInTheDocument();
  })

  it('gets a recipe by id from server and renders them in RecipeView', async () =>{
    const history = createBrowserHistory()
    const route = `/recipes/${mockRecipe.id}`;
    history.push(route);
    mockAxios.onGet(`http://localhost:8000/recipe/recipe/${mockRecipe.id}`).reply(200, mockRecipe);
    render(
      <Router history={history}>
        <Route path='/recipes/:id'>
          <RecipeDetail />
        </Route>
      </Router>
    );
    await waitFor(() => screen.getByText('Pizza'));
    const pizzaRecipe = screen.getByText('Pizza');
    expect(pizzaRecipe).toBeInTheDocument();
  })

  it('redirects to all recipes on delete', async () =>{
    const history = createBrowserHistory()
    const route = `/recipes/${mockRecipe.id}`;
    history.push(route);
    const pushSpy = jest.spyOn(history, 'push');
    mockAxios.onDelete(`http://localhost:8000/recipe/recipe/${mockRecipe.id}`).reply(204);
    render(
      <Router history={history}>
        <Route path='/recipes/:id'>
          <RecipeDetail />
        </Route>
      </Router>
    );
    const deleteButton = screen.getByRole('button', {name: 'Delete'});
    fireEvent.click(deleteButton);

    await waitFor(() => expect(pushSpy).toHaveBeenCalledWith('/recipes'));
    const pizzaRecipe = screen.queryByText('Pizza');
    expect(pizzaRecipe).toBeNull();
  })

  it('redirects to notFound page list of recipes not retrieved', async () =>{
    const history = createBrowserHistory();
    const route = `/recipes/${mockRecipe.id}`;
    history.push(route);
    const pushSpy = jest.spyOn(history, 'push');
    mockAxios.onGet(`http://localhost:8000/recipe/recipe/${mockRecipe.id}`).reply(500);
    render(
      <Router history={history}>
        <RecipeDetail />
      </Router>
    ); 
    await waitFor(() => expect(pushSpy).toHaveBeenCalledWith('/notfound'));
  })

})
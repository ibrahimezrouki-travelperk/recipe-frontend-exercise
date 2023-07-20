import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList';
import RecipeView from './views/RecipeView';
import RecipeCreate from './components/RecipeCreate';
import NotFoundView from './views/NotFoundView';
import RecipeDetail from './components/RecipeDetail';
import SomethingWentWrongView from './views/SomethingWentWrongView';

const App : React.FC = () => {
  return (
      <Switch>
        <Route exact path='/recipes' component={RecipeList} />
        <Route path='/recipes/create' component={RecipeCreate}/>
        <Route path='/recipes/:id' component={RecipeDetail} />
        <Route path='/notfound' component={NotFoundView} />
        <Route path='/disaster' component={SomethingWentWrongView} />
        <Route component={NotFoundView} />
      </Switch>
  )
}

export default App;

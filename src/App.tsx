import React from 'react';
import logo from './logo.svg';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import RecipeList from './components/RecipeList';
import RecipeDetail from './components/RecipeDetail';
import RecipeCreate from './components/RecipeCreate';

const App : React.FC = () => {
  return (
      <Switch>
        <Route exact path='/' component={RecipeList} />
        <Route path='/create' component={RecipeCreate}/>
        <Route path='/recipes/:id' component={RecipeDetail} />
      </Switch>
  )
}

export default App;

import React, { Component } from 'react';
import './App.css';

import Form from './components/Form';
import { regExpLiteral } from '@babel/types';

const key = 'e06bca86484f04cca8f2f433e02eeb73'; 




class App extends Component {

  state = {
    recipes: []
  }

  getRecipe = async (e) => {
    const recipeName = e.target.elements.recipeName.value;
    e.preventDefault();
    const API = await fetch(`https://www.food2fork.com/api/search?key=${key}&q=${recipeName}&page=2`);
    const data = await API.json();
    
    this.setState({
      recipes: data.recipes
    });
    console.log(this.state.recipes);
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recipe Search</h1>
        </header>
        <Form getRecipe={this.getRecipe}/>
        {this.state.recipes.map((recipe) => {
          return (
              <div key={recipe.recipe_id}>
                <img src={recipe.image_url} alt={recipe.title}></img>
                <p>{recipe.title}</p>
              </div>
          )
        })}
      </div>
    );
  }
}

export default App;
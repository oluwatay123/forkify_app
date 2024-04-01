import * as model from '../js/model.js';
import newRecipe from '../js/views/recipeView.js';
import serchView from './views/serchView.js';
import { async } from 'regenerator-runtime/runtime.js';
import viewResult from './views/result.js';
import paginationView from './views/paginationView.js';
import recipeView from '../js/views/recipeView.js';
import result from './views/result.js';
import bookMarkView from './views/bookMarkView.js';
import addRecipeView from './views/addRecipeView.js';
// const recipeContainer = document.querySelector('.recipe');
//

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    // showSpinner(recipeContainer);
    newRecipe.showSpinner();

    //fetching the recipe api from the recipe
    await model.loadRecipe(id);
    const { recipe } = model.state;

    //render recipe
    newRecipe.rendering(model.state.recipe);

    result.update(model.getSearchedResult());

    bookMarkView.update(model.state.bookmark)

    // console.log(model.state.serch.Result)
  } catch (error) {
    newRecipe.renderError();
  }
};

// showRecipe();

const controlSerchResult = async function () {
  try {
    viewResult.showSpinner();
    const query = serchView.getQuery();
    if (!query) return;
    await model.loadSerchRecipe(query);

    viewResult.rendering(model.getSearchedResult(4));

    paginationView.rendering(model.state.serch);
    // console.log(paginationView)
  } catch (error) {}
};

// controlSerchResult();

const controlPagination = function (Goto) {
  viewResult.rendering(model.getSearchedResult(Goto));
  paginationView.rendering(model.state.serch);
};

const controlServings = function (newServings) {
  model.updateServings(newServings);

  recipeView.update(model.state.recipe);
};

const controlBookMark = function () {
bookMarkView.rendering(model.state.bookmark)

}


const controlAddBokkmark = function () {
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  recipeView.update(model.state.recipe);

  bookMarkView.rendering(model.state.bookmark)
};


const controlAddRecipe = async  function(newRecipe){
  try {
  // console.log(newRecipe)
 await model.uploadRecipe(newRecipe)

} catch (error) {
  addRecipeView.renderError(error.message)
}
}






//listen to hash and load events  to show recipe by creating an init functioin to load the recipe form thr viewjs
const init = function () {
  bookMarkView.addHandlerRender(controlBookMark)
  newRecipe.addRecipeHandler(controlRecipe);
  recipeView.addHandlerUpdateServing(controlServings);
  recipeView.addHandlerBookmark(controlAddBokkmark);
  serchView.handleSearchResult(controlSerchResult);
  paginationView.handleCLickEvents(controlPagination);
  addRecipeView.addHandlerAddNewRecipe(controlAddRecipe)

};

init();



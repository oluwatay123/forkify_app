import { API_URL } from './config';
import { getJson ,sendJson} from './helper';
import { async } from 'regenerator-runtime';
//export the state

export const state = {
  recipe: {},
  serch: {
    query: {},
    Result: [],
    resultPerPage: 10,
    page: 1,
  },

  bookmark: [],
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJson(`${API_URL}${id}`);

    // destructing the object to rename the variable in a nicer way
    let { recipe } = data.data;

    state.recipe = {
      id: recipe.id,
      cookingTime: recipe.cooking_time,
      imageUrl: recipe.image_url,
      ingredients: recipe.ingredients,
      publisher: recipe.publisher,
      servings: recipe.servings,
      sourceUrl: recipe.source_url,
      title: recipe.title,
    };
    if (state.bookmark.some(bookmark => bookmark.id === id))
      state.recipe.bookmarked = true;
    else state.recipe.bookmarked = false;
  } catch (error) {
    console.error(`error: ${error} 💥💥💥`);
    throw error;
  }
};

export const loadSerchRecipe = async function (query) {
  try {
    state.serch.query = query;
    const data = await getJson(`${API_URL}?search=${query}`);

    state.serch.Result = data.data.recipes.map(rec => {
      return {
        id: rec.id,
        imageUrl: rec.image_url,
        publisher: rec.publisher,
        title: rec.title,
      };
    });
    // console.log(state.serch.Result)
    // console.log(state.serch.query)
  } catch (error) {
    console.error(`error: ${error} 💥💥💥`);
    throw error;
  }
};

export const getSearchedResult = function (page = state.serch.page) {
  state.serch.page = page;
  const start = (page - 1) * state.serch.resultPerPage;
  const end = page * state.serch.resultPerPage;
  console.log(start, end);
  return state.serch.Result.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;

    state.recipe.servings = newServings;
  });
};

const storeBookMark = function () {
  localStorage.setItem('bookmark', JSON.stringify(state.bookmark));
};

export const addBookmark = function (recipe) {
  state.bookmark.push(recipe);
  // creatiign a new method in the object
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  console.log(state.recipe);
  storeBookMark();
};

export const deleteBookmark = function (id) {
  index = state.bookmark.indexOf(el => el.id === id);
  state.bookmark.splice(index, 1);
  if (id === state.recipe.id) state.recipe.bookmarked = false;

  storeBookMark();
};
/**
 * 
 * @param {*} newRecipe uploads the recipe to the API server
 */
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3) throw new Error('invalid ingredient format');
        const [quantity, unit, description] = ingArr;
        return { quantity: quantity ? +quantity : null, unit, description };
      });
    // console.log(ingredient);

    const recipe = {
      id: newRecipe.id,
      cooking_time: newRecipe.cooking_time,
      image_url: newRecipe.image_url,
      publisher: newRecipe.publisher,
      servings: newRecipe.servings,
      source_url: newRecipe.source_url,
      title: newRecipe.title,
      ingredients,
    };

   const data = await  sendJson(`${API_URL}`, recipe)
   console.log(data)
  } catch (error) {
    console.error(error)
    throw error;
  }
};

const init = function () {
  const storage = localStorage.getItem('bookmark');

  if (storage) state.bookmark = JSON.parse(storage);
};

init();

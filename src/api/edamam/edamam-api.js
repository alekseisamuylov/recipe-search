import axios from "axios";

const URL_BASE = "https://api.edamam.com";
const APP_ID = process.env.VUE_APP_ID;
const APP_KEY = process.env.VUE_APP_KEY;
const TYPE = "type=public";

const RECIPES_URI = "/api/recipes/v2";

async function getRecipes(searchString) {
  const request = `${URL_BASE}${RECIPES_URI}?${TYPE}&app_id=${APP_ID}&app_key=${APP_KEY}&q=${searchString}`;
  console.log(request);
  const response = await axios.get(request);

  return convertRecipesData(response.data);
}

async function getRecipe(id) {
  const request = `${URL_BASE}${RECIPES_URI}/${id}?${TYPE}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  console.log(request);
  const response = await axios.get(request);

  return convertRecipeData(response.data);
}

function convertRecipesData(recipesData) {
  const recipes = [];
  recipesData.hits.forEach((r) => {
    const id = getRecipeIdFromHref(r._links.self.href);
    const label = r.recipe.label;
    const img = r.recipe.image;

    recipes.push({
      id,
      label,
      img,
    });
  });

  return recipes;
}

function getRecipeIdFromHref(href) {
  const ID_POSITION = 16;
  return new URL(href).pathname.slice(ID_POSITION);
}

function convertRecipeData(recipeData) {
  return {
    label: recipeData.recipe.label,
    img: recipeData.recipe.image,
    ingredients: recipeData.recipe.ingredientLines,
    totalDaily: recipeData.recipe.totalDaily,
    totalNutrients: recipeData.recipe.totalNutrients,
  };
}

export { getRecipes, getRecipe };

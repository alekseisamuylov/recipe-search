import {
  sendGetRequestRecipesSearch,
  sendGetRequestRecipeDetails,
} from "@/api/edamam/edamam-api.js";
import { getRecipeId, getSearchParam } from "@/helpers/urlParser.js";

export const LOAD_SEARCH_RESULT = "LOAD_SEARCH_RESULT";
export const LOAD_RECIPE_DETAILS = "LOAD_RECIPE_DETAILS";

export const UPDATE_SEARCH_STRING = "UPDATE_SEARCH_STRING";
export const UPDATE_SEARCH_RECIPES_RESULT = "UPDATE_SEARCH_RECIPES_RESULT";
export const UPDATE_SELECTED_RECIPE = "UPDATE_SELECTED_RECIPE";

export default {
  state: {
    searchString: "",
    searchRecipeResult: [],
    selectedRecipe: null,
  },

  actions: {
    async [LOAD_SEARCH_RESULT]({ commit }) {
      const searchString = getSearchParam(window.location.href);
      commit(UPDATE_SEARCH_STRING, searchString)

      const searchResult = await sendGetRequestRecipesSearch(searchString);

      commit(UPDATE_SEARCH_RECIPES_RESULT, searchResult);
    },

    async [LOAD_RECIPE_DETAILS]({ commit }) {
      const recipeId = getRecipeId(window.location.href);
      const newSelectedRecipe = await sendGetRequestRecipeDetails(recipeId);

      commit(UPDATE_SELECTED_RECIPE, newSelectedRecipe);
    },
  },

  mutations: {
    [UPDATE_SEARCH_STRING](state, newSearchString) {
      state.searchString = newSearchString;
    },

    [UPDATE_SEARCH_RECIPES_RESULT](state, newSearchRecipeResult) {
      state.searchRecipeResult = newSearchRecipeResult;
    },

    [UPDATE_SELECTED_RECIPE](state, newRecipe) {
      state.selectedRecipe = newRecipe;
    },
  },
};

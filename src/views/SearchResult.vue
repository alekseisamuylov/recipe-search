<template>
  <div class="main">
    <div
      v-for="recipe in recipes"
      :key="recipe.id"
      class="recipe"
      @click="onRecipeClick(recipe.id)"
    >
      <img class="img" :src="recipe.img" />
      <p class="label">{{ recipe.label }}</p>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOAD_SEARCH_RESULT, UPDATE_SELECTED_RECIPE } from "@/store/search.js";

export default {
  created() {
    this.loadSearchResult();
  },

  methods: {
    async loadSearchResult() {
      this.$store.dispatch(LOAD_SEARCH_RESULT);
    },

    onRecipeClick(recipeId) {
      this.$store.commit(
        UPDATE_SELECTED_RECIPE,
        this.recipes.find((r) => r.id === recipeId)
      );

      this.$router.push({
        name: "RecipeDetails",
        params: { id: recipeId },
      });
    },
  },

  computed: {
    ...mapState({
      recipes: (state) => state.search.searchRecipeResult,
    }),
  },

  watch: {
    $route(to) {
      const searchString = to.params.q;
      if (searchString) {
        this.loadSearchResult();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  flex-wrap: wrap;

  .recipe {
    align-items: center;
    justify-content: center;
    width: 40%;
    margin: 30px;
    cursor: pointer;
  }
}
</style>

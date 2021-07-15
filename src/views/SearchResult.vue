<template>
  <div class="main">
    <div v-for="recipe in recipes" :key="recipe.id" class="recipe" @click="onRecipeClick(recipe.id)">
      <img class="img" :src="recipe.img" />
      <p class="label">{{ recipe.label }}</p>
    </div>
  </div>
</template>

<script>
import { getRecipes } from "@/api/edamam/edamam-api.js";

export default {
  data() {
    return {
      recipes: [],
    };
  },

  created() {
    this.sendRequest(this.$route.params.q);
  },

  methods: {
    async sendRequest(searchString) {
      this.recipes = await getRecipes(searchString);
    },

    onRecipeClick(recipeId) {
        this.$router.push({
          name: "RecipeDetails",
          params: { id: recipeId },
        });
    }
  },

  watch: {
    $route(to) {
      const searchString = to.params.q;
      if (searchString) {
        this.sendRequest(searchString);
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

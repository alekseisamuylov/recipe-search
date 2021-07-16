<template>
  <div v-if="recipe" class="recipe-details">
    <img class="img" :src="recipe.img" />

    <div class="ingredients">
      <h3>Ingredients</h3>
      <ul>
        <li
          v-for="ingredient in recipe.ingredients"
          :key="ingredient"
          class="list-item"
        >
          {{ ingredient }}
        </li>
      </ul>
    </div>

    <div class="total-daily">
      <h3>Total daily</h3>
      <ul>
        <li
          v-for="totalDaily in recipe.totalDaily"
          :key="totalDaily"
          class="list-item"
        >
          {{ convertListItem(totalDaily) }}
        </li>
      </ul>
    </div>

    <div class="total-nutrients">
      <h3>Total nutries</h3>
      <ul>
        <li
          v-for="totalNutrient in recipe.totalNutrients"
          :key="totalNutrient"
          class="list-item"
        >
          {{ convertListItem(totalNutrient) }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { LOAD_RECIPE_DETAILS } from "@/store/search.js";

export default {
  created() {
    this.loadRecipeDetails();
  },

  methods: {
    async loadRecipeDetails() {
      this.$store.dispatch(LOAD_RECIPE_DETAILS);
    },

    convertListItem(item) {
      const result = `${item.label}: ${Math.ceil(item.quantity)}${item.unit}`;
      return result;
    },
  },

  computed: {
    ...mapState({
      recipe: (state) => state.search.selectedRecipe,
    }),
  },

  watch: {
    $route(to) {
      const id = to.params.id;
      if (id) {
        this.loadRecipeDetails();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.recipe-details {
  display: flex;
  flex-wrap: wrap;
  font-size: 24px;

  .img {
    width: 30%;
  }

  .ingredients {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding-left: 50px;
    width: 60%;
  }

  .total-daily {
    padding: 20px 50px;
  }

  .total-nutrients {
    padding: 20px 50px;
  }

  .list-item {
    padding: 10px 0;
    text-align: start;
  }
}
</style>

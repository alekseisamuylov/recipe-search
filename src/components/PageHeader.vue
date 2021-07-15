<template>
  <header class="header">
    <router-link class="logo" to="/">Recipe Searcher</router-link>
    <div class="search">
      <input
        class="input"
        v-model="searchString"
        @keydown.enter="onSearchClick"
        type="text"
        placeholder="Enter any food..."
      />
      <button class="search-button" type="button" @click="onSearchClick">
        Find
      </button>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      searchString: "",
    };
  },

  methods: {
    onSearchClick() {
      if (this.searchString) {
        this.$router.push({
          name: "SearchResult",
          params: { q: this.searchString },
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  padding: 20px;
  align-items: center;

  .logo {
    width: 150px;
    font-size: 20px;
    text-decoration: none;
    color: #2c3e50;
  }

  .search {
    margin-left: calc(50% - 200px);

    .input {
      height: 40px;
      border-radius: 4px;
      padding: 0 10px;
      margin-right: 10px;
      border: none;
      outline: none;
      font-size: 16px;
      background-color: rgb(233, 233, 233);
    }

    .search-button {
      padding: 10px;
      border-radius: 4px;
      border: none;
      font-size: 18px;
      cursor: pointer;

      &:active {
        background-color: rgb(95, 95, 95);
      }
    }
  }
}
</style>

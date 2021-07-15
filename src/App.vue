<template>
  <div class="page">
    <page-header />
    <router-view class="main" />
    <footer class="footer"></footer>
  </div>
</template>

<script>
import PageHeader from "@/components/PageHeader.vue";

export default {
  components: {
    PageHeader,
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

* {
  margin: 0px;
  padding: 0px;
}
</style>

<style lang="scss" scoped>
.page {
  display: grid;
  grid-template-columns: 1fr 8fr 1fr;
  grid-template-rows: 80px auto 100px;
  grid-template-areas:
    "header header header"
    ". main ."
    "footer footer footer";

  .header {
    grid-area: header;
  }

  .main {
    grid-area: main;
    padding: 20px;
    background-color: rgb(233, 233, 233);
    border-radius: 4px;
  }

  .footer {
    grid-area: footer;
  }
}
</style>

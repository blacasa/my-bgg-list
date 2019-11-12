<template>
  <div id="app">
    <menuApp />
    <router-view></router-view>
  </div>
</template>

<script>
import menuApp from "./components/Menu.vue";

export default {
  name: "app",
  components: {
    menuApp
  }
};
</script>

<style scoped>
#app {
  margin: auto 5px auto 5px;
}
</style>
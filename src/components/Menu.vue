<template>
  <div>
    <b-button-group class="button-group">
      <router-link to="/games" tag="b-button">Mes jeux</router-link>
      <router-link to="/lists" tag="b-button">Mes listes</router-link>
      <router-link to="/sync" tag="b-button">Synchro</router-link>
    </b-button-group>
  </div>
</template>

<script>
export default {
  name: "menuApp"
};
</script>

<style scoped>
.button-group {
  margin: auto 5px auto 5px;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
</style>
<template>
  <div id="app">
    <UserCard />
  </div>
</template>

<script lang="ts">
import UserCard from "./components/UserCard.vue";

export default {
  name: "App",
  components: {
    UserCard,
  },
};
</script>

<style>
#app {
  text-align: center;
  margin-top: 50px;
}
</style>

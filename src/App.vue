<template>
  <div id="app">
    <Navigation></Navigation>
    <router-view />
  </div>
</template>

<script>
import Navigation from "./components/Navigation";
export default {
  components: {
    Navigation,
  },
};
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Material+Icons|Material+Icons+Outlined|Material+Icons+Two+Tone|Material+Icons+Round|Material+Icons+Sharp);
</style>


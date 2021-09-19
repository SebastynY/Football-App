<template>
  <div class="container">
    <app-header></app-header>

    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import AppHeader from "./component/AppHeader.vue";

export default {
  name: "App",
  components: { AppHeader },
};
</script>

<style scoped>
.container {
  background: rgb(189, 189, 155);
  width: 100%;
  height: 100%;
}
</style>

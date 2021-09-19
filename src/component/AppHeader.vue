<template>
  <div class="header">
    <router-link to="/LeagueList"
      ><button id="1" class="link">Список лиг</button></router-link
    >
    <router-link to="/TeamList"
      ><button id="2" class="link">Список команд</button></router-link
    >
    <router-link to="/LeagueCalendar"
      ><button id="3" class="link">Календарь лиги</button></router-link
    >
    <router-link to="/TeamCalendar"
      ><button id="4" class="link">Календарь одной команды</button></router-link
    >
  </div>
</template>

<script>
export default {
  name: "AppHeader",
};
</script>

<style scoped>
.header {
  display: flex;
  width: 100%;
  height: 150px;
  justify-content: space-around;
  align-items: center;
}

button {
  color: #000000;
  width: 200px;
  height: 75px;
  border: 4px solid rgba(1, 177, 24, 0.404);
  border-radius: 99px;
  background-color: rgba(245, 245, 245, 0.959);
  font-size: 18px;
  transition: 1s;
  cursor: pointer;
}
button:hover {
  background-color: rgba(124, 221, 137, 0.404);;
  transition: 1s;
}
.router-link-active {
  width: 200px;
  height: 75px;
  border: 4px solid rgba(1, 177, 24, 0.404);
  border-radius: 99px;


}
</style>

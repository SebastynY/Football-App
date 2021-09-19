<template>
  <input type="text" name="input" placeholder="Поиск" v-model="searchText" />

  <div class="legue__chapter">
    <p>Название лиги</p>
    <p>Страна проведения</p>
    <p>Дата начала</p>
    <p>Дата окончания</p>
  </div>

  <div
    class="league__content"
    v-for="competition in filteredLeague"
    :key="competition.id"
  >
    <div class="league__content__name">{{ competition.name }}</div>
    <div class="league__content__area">{{ competition.area.name }}</div>
    <div class="league__content__start">{{ competition.currentSeason?.startDate }}</div>
    <div class="league__content__end">{{ competition.currentSeason?.endDate }}</div>
  </div>
</template>
<script>
export default {
  name: "LegueList",
  data() {
    return {
      searchText: "",
      competitions: [],
    };
  },
  watch: {
    competitions(newCompetitions) {
      localStorage.competitions = JSON.stringify(newCompetitions);
    },
  },
  // Выводим страницу по инпуту
  computed: {
    filteredLeague() {
      return this.competitions.filter((competition) => {
        const name = competition.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const area = competition.area.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const startDate = competition.currentSeason?.startDate.includes(
          this.searchText
        );
        const endDate = competition.currentSeason?.endDate.includes(
          this.searchText
        );
        return name || area || startDate || endDate;
      });
    },
  },

  //Делаем запрос только в том случае, если в LS ничего нет
  mounted() {
    if (localStorage.competitions) {
      this.competitions = JSON.parse(localStorage.competitions);
    } else {
      fetch("http://api.football-data.org/v2/competitions/", {
        headers: { "X-Auth-Token": "46b583d809b94961910c01c9d09adfbc" },
        dataType: "json",
        type: "GET",
      })
        .then((r) => r.json())
        .then((r) => (this.competitions = r.competitions));
    }
  },
};
</script>

<style scoped>

.league__content {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: space-between;
  text-align: center;
  border: 2px solid black;
  font-size: 22px;
  padding: 10px 0 10px 0;
}
.legue__chapter {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: space-between;
  font-size: 22px;
  text-align: center;
  background-color: rgba(1, 177, 24, 0.404);
}
input {
  margin-left: 10px;
  width: 200px;
  height: 25px;
  border: 3px solid black;
  outline: none;
  font-size: 20px;
  border-radius: 20px;
}
</style>

<template>
  <input type="text" name="input" placeholder="Поиск" v-model="searchText" />

  <select
    v-model="idCompetition"
    @change="getCompetitionMatchId(idCompetition)"
  >
    <option disabled value="">Выберите лигу</option>
    <option
      v-for="competition in competitions"
      :key="competition.id"
      :value="competition.id"
    >
      {{ competition.name }}
    </option>
  </select>



  <div class="competition__chapter">
    <p>Домашняя команда</p>
    <p>Гостевая команда</p>
    <p>Дата проведения</p>
    <p>Статус матча</p>
  </div>

  <div v-if="matches">
    <div
      class="competition__content"
      v-for="match in filteredLeague"
      :key="match.id"
    >
      <div class="competition__content__home">
        {{ match.homeTeam.name }}
      </div>
      <div class="competition__content__away">
        {{ match.awayTeam.name }}
      </div>
      <div class="competition__content__date">{{ match.utcDate }}</div>

      <div class="competition__content__status">{{ match.status }}</div>
    </div>
  </div>
  <p v-else>Выберите доступную лигу</p>
</template>
<script>
import { getCompetitionMatch } from "../API";
import { getCompetition } from "../API";

export default {
  name: "LeagueCalendar",

  data() {
    return {
      searchText: "",
      idCompetition: "",
      matches: [],
      competitions: [],
    };
  },
  watch: {
    matches(newMatches) {
      localStorage.setItem("MatchesListThree", JSON.stringify(newMatches));
    },
    competitions(newCompetitions) {
      localStorage.setItem("CompetitionListThree", JSON.stringify(newCompetitions));
    },
    idCompetition(newId) {
      localStorage.setItem("IdCompetitionListThree", JSON.stringify(newId));
    },
  },
  methods: {
    getCompetitionMatchId(idCompetition) {
      getCompetitionMatch(idCompetition).then((r) => {
        this.matches = r.matches;
      });
    },
  },
  computed: {
    filteredLeague() {
      return this.matches.filter((match) => {
        const home = match.homeTeam.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const away = match.awayTeam.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const date = match.utcDate
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const status = match.status
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        return home || away || date || status;
      });
    },
  },

  //Передаю данные из LS, если они там есть
  mounted() {
    if (
      localStorage.CompetitionListThree &&
      localStorage.MatchesListThree !== "undefined" &&
      localStorage.IdCompetitionListThree
    ) {
      this.matches = JSON.parse(localStorage.MatchesListThree);
      this.competitions = JSON.parse(localStorage.CompetitionListThree);
      this.idCompetition = JSON.parse(localStorage.IdCompetitionListThree);
    } else {
      this.matches = null;
    }
    if (!localStorage.CompetitionListThree) {
      getCompetition().then((r) => {
        this.competitions = r.competitions;
      });
    }
  },
};
</script>

<style scoped>
.competition__content {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: space-between;
  text-align: center;
  border: 2px solid black;
  font-size: 22px;
  padding: 10px 0 10px 0;
}
.competition__chapter {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: space-between;
  font-size: 22px;
  text-align: center;
  background-color: rgba(1, 177, 24, 0.404);
}

input {
  margin-left: 8px;
  width: 200px;
  height: 25px;
  border: 3px solid black;
  outline: none;
  font-size: 20px;
  border-radius: 20px;
}
select {
  margin-left: 10px;
  width: 200px;
  height: 32px;
  border: 3px solid black;
  outline: none;
  font-size: 20px;
  border-radius: 20px;
}
</style>

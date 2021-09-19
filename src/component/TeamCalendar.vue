<template>
  <input type="text" name="input" placeholder="Поиск" v-model="searchText" />

  <!-- Селект для выбора лиги -->
  <select v-model="idTeam" @change="getIdForTeams(idTeam)">
    <option disabled value="">Выберите лигу</option>
    <option
      v-for="competition in competitions"
      :key="competition.id"
      :value="competition.id"
    >
      {{ competition.name }}
    </option>
  </select>

  <!-- Селект для выбора команды -->
  <select v-model="idTeamMatch" @change="getTeamMatch(idTeamMatch)">
    <option disabled value="">Выберите лигу</option>
    <option v-for="team in teams" :key="team.id" :value="team.id">
      {{ team.name }}
    </option>
  </select>

  <div class="team__chapter">
    <p>Название команды</p>
    <p>Страна проведения</p>
    <p>Дата проведения</p>
    <p>Статус матча</p>
  </div>

  <div v-if="teams">
    <div class="team__content" v-for="match in filteredLeague" :key="match.id">
      <div class="team__content__home">{{ match.homeTeam.name }}</div>
      <div class="team__content__away">{{ match.awayTeam.name }}</div>
      <div class="team__content__date">{{ match.utcDate }}</div>
      <div class="team__content__status">{{ match.status }}</div>
    </div>
  </div>
  <p v-else>Команды данной лиги не найдены</p>
</template>
<script>
import { getCompetition } from "../API";
import { getTeam } from "../API";
import { getTeamMatch } from "../API";

export default {
  name: "TeamCalendar",

  data() {
    return {
      searchText: "",
      idTeam: null,
      competitions: [],
      teams: [],
      idTeamMatch: null,
      matches: [],
    };
  },
  watch: {
    competitions(newCompetition) {
      localStorage.setItem(
        "CompetitionListFour",
        JSON.stringify(newCompetition)
      );
    },
    idTeam(newId) {
      localStorage.setItem("IdTeamListFour", JSON.stringify(newId));
    },
    teams(newTeam) {
      localStorage.setItem("TeamsListFour", JSON.stringify(newTeam));
    },
    idTeamMatch(newIdMatch) {
      localStorage.setItem("IdMatchListFour", JSON.stringify(newIdMatch));
    },
    matches(newMatches) {
      localStorage.setItem("MatchesListFour", JSON.stringify(newMatches));
    },
  },

  methods: {
    getIdForTeams(idTeam) {
      getTeam(idTeam).then((r) => {
        this.teams = r.teams;
      });
    },
    getTeamMatch(idTeamMatch) {
      getTeamMatch(idTeamMatch).then((r) => {
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

  mounted() {
    if (localStorage.IdTeamListFour && localStorage.IdMatchListFour) {
      this.idTeam = JSON.parse(localStorage.IdTeamListFour);
      this.idTeamMatch = JSON.parse(localStorage.IdMatchListFour);
    }

    if (!localStorage.CompetitionListFour) {
      getCompetition().then((r) => {
        this.competitions = r.competitions;
      });
    } else {
      this.competitions = JSON.parse(localStorage.CompetitionListFour);
    }

    if (localStorage.TeamsListFour) {
      this.teams = JSON.parse(localStorage.TeamsListFour);
    } else {
      getTeam(this.idTeam).then((r) => {
        this.teams = r.teams;
      });
    }

    if (!localStorage.MatchesListFour) {
      getTeamMatch(this.idTeamMatch).then((r) => {
        this.matches = r.matches;
      });
    } else {
      this.matches = JSON.parse(localStorage.MatchesListFour);
    }
  },
};
</script>

<style scoped>
.team__content {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: space-between;
  text-align: center;
  border: 2px solid black;
  font-size: 22px;
  padding: 10px 0 10px 0;
}
.team__chapter {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  justify-content: space-between;
  font-size: 22px;
  text-align: center;
  background-color: rgba(1, 177, 24, 0.404);
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
input {
  margin-left: 8px;
  width: 200px;
  height: 25px;
  border: 3px solid black;
  outline: none;
  font-size: 20px;
  border-radius: 20px;
}
</style>

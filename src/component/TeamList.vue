<template>
  <input type="text" name="input" placeholder="Поиск" v-model="searchText" />

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

  <div class="teams__chapter">
    <p>Название команды</p>
    <p>Страна проведения</p>
    <p>Дата начала</p>
    <p>Дата окончания</p>
  </div>

  <div v-if="teams">
    <div class="teams__content" v-for="team in filteredLeague" :key="team.id">
      <div class="teams__content__name">{{ team.name }}</div>
      <div class="teams__content__area">{{ team.area.name }}</div>
      <div class="teams__content__start">{{ team.address }}</div>
      <div class="teams__content__end">{{ team.website }}</div>
    </div>
  </div>
  <p v-else>Команды данной лиги не найдены</p>
</template>
<script>
import { getCompetition } from "../API";
import { getTeam } from "../API";

export default {
  name: "TeamList",

  data() {
    return {
      searchText: "",
      idTeam: "",
      competitions: [],
      teams: [],
    };
  },
  watch: {
    idTeam(newTeam) {
      localStorage.setItem("IdTeamListTwo", JSON.stringify(newTeam));
    },
    competitions(newCompetition) {
      localStorage.setItem("CompetitionListTwo",JSON.stringify(newCompetition));
    },
    teams(newTeam) {
      localStorage.setItem("TeamsListTwo",JSON.stringify(newTeam));
    }
  },

  methods: {
    getIdForTeams(idTeam) {
      getTeam(idTeam).then((r) => {
        this.teams = r.teams;
      });
    },
  },
  computed: {
    filteredLeague() {
      return this.teams.filter((team) => {
        const name = team.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const area = team.area.name
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const address = team.address
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        const website = team.website
          .toLowerCase()
          .includes(this.searchText.toLowerCase());
        return name || area || address || website;
      });
    },
  },
  mounted() {
    if (localStorage.IdTeamListTwo) {
      this.idTeam = JSON.parse(localStorage.IdTeamListTwo);
      this.competitions = JSON.parse(localStorage.CompetitionListTwo);
      //Делаем запрос по сохранённому idTeam
      getTeam(localStorage.IdTeamListTwo).then((r) => {
        this.teams = r.teams;
      });
    }
    if (localStorage.CompetitionListTwo) {
      this.competitions = JSON.parse(localStorage.CompetitionListTwo);
    } else {
      getCompetition().then((r) => {
        this.competitions = r.competitions;
      });
    }
    if(localStorage.TeamsListTwo) {
      this.teams = JSON.parse(localStorage.TeamsListTwo);
    } else {
      getTeam(this.idTeam).then((r) => {
        this.teams = r.teams;
      });
    }
  },
};
</script>

<style scoped>
.teams__content {
  display: grid;
  grid-template-columns: repeat(4, 300px);
  grid-template-rows: minmax(60px, auto);
  justify-content: space-between;
  text-align: center;
  border: 2px solid black;
  font-size: 22px;
  padding: 10px 0 10px 0;
  align-items: center;
}
.teams__chapter {
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



const KEY = "";

const init = {
  headers: { "X-Auth-Token": KEY },
  dataType: "json",
  type: "GET",
};

export async function getTeam(idTeam) {
  return await fetch(
    `http://api.football-data.org/v2/competitions/${idTeam}/teams`,
    init
  ).then((r) => r.json());
}

export async function getCompetition() {
  return await fetch(
    "https://api.football-data.org/v2/competitions?areas=2077",
    init
  ).then((r) => r.json());
}

export async function getCompetitionMatch(idCompetition) {
  return await fetch(
    `http://api.football-data.org/v2/competitions/${idCompetition}/matches`,
    init
  ).then((r) => r.json());
}

export async function getTeamMatch(idTeam) {
  return await fetch(
    `https://api.football-data.org/v2/teams/${idTeam}/matches`,
    init
  ).then((r) => r.json());
}
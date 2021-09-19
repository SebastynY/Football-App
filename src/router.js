import {createRouter, createWebHistory} from 'vue-router'
import LeagueList from './component/LeagueList'
import TeamList from './component/TeamList'
import LeagueCalendar from './component/LeagueCalendar'
import TeamCalendar from './component/TeamCalendar'


export default createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/LeagueList', component: LeagueList, alias: '/'},
        {path: '/TeamList', component: TeamList},
        {path: '/LeagueCalendar', component: LeagueCalendar},
        {path: '/TeamCalendar', component: TeamCalendar},
    ],

})
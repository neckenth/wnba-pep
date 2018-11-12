'use strict';

const axios = require('axios');
const fs = require('fs');
const rosterWriteStream = fs.createWriteStream('./roster.js');
const statsWriteStream = fs.createWriteStream('./stats.js');

const rosterUrl = 'http://data.wnba.com/data/5s/v2015/json/mobile_teams/wnba/2018/teams/sun_roster.json';
const statsUrl = 'http://data.wnba.com/data/5s/v2015/json/mobile_teams/wnba/2018/teams/sun/player_averages_02.json';

//get roster data

const getRosterData = (() => {
    return axios.get(rosterUrl)
        .then(response => {
            const players = response.data['t']['pl'];
            rosterWriteStream.write(JSON.stringify(players));
            console.log('scraping and writing roster complete');
        })
        .catch(error => console.log(error));
});

getRosterData();

//get stats data

const getStatsData = (() => {
    return axios.get(statsUrl)
        .then(response => {
            const stats = response.data['tpsts']['pl'];
            statsWriteStream.write(JSON.stringify(stats))
            console.log('scraping and writing stats complete');

        })
        .catch(error => console.log(error))
});

getStatsData();
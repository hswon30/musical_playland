const express = require('express');
const mysql = require('mysql');
var cors = require('cors')

const routes = require('./routes')
const config = require('./config.json')

const app = express();

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }));

/////////// PLAYLIST ////////// 
// app.get('/playlist/
app.get('/playlist/allsongs', routes.playlist_getAllSongs)
app.get('/playlist/playlist', routes.playlist_getPlaylist)
app.get('/playlist/search', routes.playlist_search)
app.get('/playlist/onesong', routes.playlist_getSong)
app.get('/playlist/insert', routes.playlist_insertSong)
 

/////////// WORD CLOUD //////////
// app.get('/wordcloud/...

/////////// WHO SANG IT BETTER //////////
// app.get('/popularity/...




  


app.listen(config.server_port, () => {
    console.log(`Server running at http://${config.server_host}:${config.server_port}/`);
});

module.exports = app;

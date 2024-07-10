const express = require('express')
const mysql = require('mysql')
var cors = require('cors')

const routes = require('./routes')
const config = require('./config.json')

const app = express()

// whitelist localhost 3000
app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))

/*app.get('/popularity/allsongs', routes.popularity_getAllSongs)
app.get(
  '/popularity/searchsongandartist',
  routes.popularity_songAndArtistResults
)
app.get('/popularity/onesong', routes.popularity_getSong)
*/

app.get('/wordcloud/artists', routes.wordcloud_artists)
app.get('/popularity/whoisbetter', routes.popularity_getCompResults)
app.get('/popularity/searchsong', routes.popularity_getsong)

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  )
})

module.exports = app

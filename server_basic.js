const express = require('express')
const mysql = require('mysql')
var cors = require('cors')

const routes = require('./routes')
const config = require('./config.json')

const app = express()

// whitelist localhost 3000
//app.use(cors({ credentials: true, origin: ['http://localhost:3000'] }))

// Route 1 - register as GET
//app.get('/hello', routes.hello)

// Route 2 - register as GET
//app.get('/jersey/:choice', routes.jersey)

// Route 3 - register as GET
app.get('/albums', routes.all_albums)

// Route 4 - register as GET

// Route 5 - register as GET
//app.get('/album', routes.album)

// Route 6 - register as GET

// Route 7 - register as GET
//app.get('/search/albums', routes.search_albums)

// Route 8 - register as GET
//app.get('/search/players', routes.search_players)

app.listen(config.server_port, () => {
  console.log(
    `Server running at http://${config.server_host}:${config.server_port}/`
  )
})

module.exports = app

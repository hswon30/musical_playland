const config = require('./config.json')
const mysql = require('mysql')
const e = require('express')

// TODO: fill in your connection details here
const connection = mysql.createConnection({
  host: config.rds_host,
  user: config.rds_user,
  password: config.rds_password,
  port: config.rds_port,
  database: config.rds_db
})
connection.connect()

// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// ********************************************
//                  WARM UP
// ********************************************

// ********************************************
//               GENERAL ROUTES
// ********************************************

// Route 3 (handler)
async function all_albums (req, res) {
  // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
  // We have partially implemented this function for you to
  // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
  // we didn't specify this default value for league, and you could change it if you want!
  // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here...
  //const league = req.params.league ? req.params.league : 'D1'
  // use this league encoding in your query to furnish the correct results

  if (req.query.page && !isNaN(req.query.page)) {
    // This is the case where page is defined.
    // The SQL schema has the attribute OverallRating, but modify it to match spec!
    // TODO: query and return results here:
    const pagesize = req.params.pagesize ? req.params.pagesize : 10

    const offset = pagesize * (req.query.page - 1)

    var query = `SELECT album_type, artist_id, external_urls,
        id,name, images, total_tracks
        FROM Albums
        LIMIT 10 OFFSET 10`

    connection.query(query, function (error, results, fields) {
      if (error) {
        console.log(error)
        res.json({ error: error })
      } else if (results) {
        res.json({ results: results })
      }
    })
  } else {
    // we have implemented this for you to see how to return results by querying the database
    connection.query(
      `SELECT album_type, artist_id, external_urls,
      id,name, images
      FROM Albums 
      LIMIT 10 OFFSET 10 `,
      function (error, results, fields) {
        if (error) {
          console.log(error)
          res.json({ error: error })
        } else if (results) {
          console.log('helo route 3')
          res.json({ results: results })
        }
      }
    )
  }
}

module.exports = {
  all_albums
}

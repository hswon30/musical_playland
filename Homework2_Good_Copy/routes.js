
const config = require('./config.json')
const mysql = require('mysql');
const e = require('express');

// fill in your connection details:
const connection = mysql.createConnection({
    host: config.rds_host,
    user: config.rds_user,
    password: config.rds_password,
    port: config.rds_port,
    database: config.rds_db
});
connection.connect();


// ********************************************
//            SIMPLE ROUTE EXAMPLE
// ********************************************

// Route 1 (handler)
async function hello(req, res) {
    // a GET request to /hello?name=Steve
    if (req.query.name) {
        res.send(`Hello, ${req.query.name}! Welcome to the FIFA server!`)
    } else {
        res.send(`Hello! Welcome to the FIFA server!`)
    }
}


// ********************************************
//                  WARM UP 
// ********************************************

// Route 2 (handler)
async function jersey(req, res) {
    const colors = ['red', 'blue', 'white']
    const jersey_number = Math.floor(Math.random() * 20) + 1
    const name = req.query.name ? req.query.name : "player"

    if (req.params.choice === 'number') {
        // TODO: TASK 1: inspect for issues and correct 
        res.json({ message: `Hello, ${name}!`, jersey_number: jersey_number })
    } else if (req.params.choice === 'color') {
        var lucky_color_index = Math.floor(Math.random() * 2);
        // TODO: TASK 2: change this or any variables above to return only 'red' or 'blue' at random (go Quakers!)
        res.json({ message: `Hello, ${name}!`, jersey_color: colors[lucky_color_index] })
    } else {
        // TODO: TASK 3: inspect for issues and correct
        res.json({ message: `Hello, ${name}, we like your jersey!` })
    }
}

// ********************************************
//               GENERAL ROUTES
// ********************************************


// Route 3 (handler)
async function all_matches(req, res) {
    // TODO: TASK 4: implement and test, potentially writing your own (ungraded) tests
    // We have partially implemented this function for you to 
    // parse in the league encoding - this is how you would use the ternary operator to set a variable to a default value
    // we didn't specify this default value for league, and you could change it if you want! 
    // in reality, league will never be undefined since URLs will need to match matches/:league for the request to be routed here... 
    const league = req.params.league ? req.params.league : 'D1'

    // When page is defined:
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, 
                                 FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
                          FROM Matches 
                          WHERE Division = '${league}'
                          ORDER BY HomeTeam, AwayTeam
                          LIMIT ${(page * pagesize) - (pagesize - 1)}, ${pagesize}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    // When page is not defined:
    } else {
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, 
                                 FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
                          FROM Matches 
                          WHERE Division = '${league}'
                          ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    }
}

// Route 4 (handler)
async function all_players(req, res) {
    // When page is defined:
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        // console.log(pagesize + " " + page)
        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
                          FROM Players
                          ORDER BY Name
                          LIMIT ${(page * pagesize) - (pagesize - 1)}, ${pagesize}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    // When page is not defined:
    } else {
        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
                          FROM Players
                          ORDER BY Name`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    }
}


// *******************************************3
//             MATCH-SPECIFIC ROUTES
// ********************************************

// Route 5 (handler)
async function match(req, res) {
    // When id is defined:
    if (req.query.id && !isNaN(req.query.id)) {
        const id = req.query.id
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away,
                                 FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals,
                                 HalfTimeGoalsH AS HTHomeGoals, HalfTimeGoalsA AS HTAwayGoals,
                                 ShotsH AS ShotsHome, ShotsA AS ShotsAway,
                                 ShotsOnTargetH AS ShotsOnTargetHome, ShotsOnTargetA AS ShotsOnTargetAway,
                                 FoulsH AS FoulsHome, FoulsA AS FoulsAway,
                                 CornersH AS CornersHome, CornersA AS CornersAway,
                                 YellowCardsH AS YCHome, YellowCardsA AS YCAway,
                                 RedCardsH AS RCHome, RedCardsA AS RCAway
                          FROM Matches
                          WHERE MatchId = ${id}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    // When id is not defined:
    } else {
        res.json({ results: [] })
    }
}

// ********************************************
//            PLAYER-SPECIFIC ROUTES
// ********************************************

// Route 6 (handler)
async function player(req, res) {
    // When id is defined:
    if (req.query.id && !isNaN(req.query.id)) {
        const id = req.query.id
        connection.query(`SELECT BestPosition
                          FROM Players 
                          WHERE PlayerId = ${id}`, function (error, results, fields) {        
            if (error) {
                console.log(error)
                res.json({ error: error })
            // if query returns something, i.e the id exists:
            } else if (results[0]) {
                if (results[0].BestPosition === 'GK') {
                    connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating,
                                             Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill,
                                             JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, BestOverallRating,
                                             ReleaseClause, GKPenalties, GKDiving, GKHandling, GKKicking, GKPositioning, GKReflexes
                                      FROM Players
                                      WHERE PlayerId = ${id}`, function (error, results, fields) {
                        if (error) {
                            console.log(error)
                            res.json({ error: error })
                        } else if (results) {
                            res.json({ results: results })      
                        }
                    });
                } else {
                    connection.query(`SELECT PlayerId, Name, Age, Photo, Nationality, Flag, OverallRating AS Rating,
                                             Potential, Club, ClubLogo, Value, Wage, InternationalReputation, Skill,
                                             JerseyNumber, ContractValidUntil, Height, Weight, BestPosition, BestOverallRating,
                                             ReleaseClause, NPassing, NBallControl, NAdjustedAgility, NStamina, NStrength, NPositioning
                                      FROM Players
                                      WHERE PlayerId = ${id}`, function (error, results, fields) {
                        if (error) {
                            console.log(error)
                            res.json({ error: error })
                        } else if (results) {
                            res.json({ results: results })  
                        }
                    });  
                }
            // if id is defined but does not exist:
            } else {
                res.json({ results: [] })
            }
        });
    // When id is not defined:
    } else {
        res.json({ results: [] })
    }
}
        
                

// ********************************************
//             SEARCH ROUTES
// ********************************************

// Route 7 (handler)
async function search_matches(req, res) {
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    const home = req.query.Home ? req.query.Home : ''
    const away = req.query.Away ? req.query.Away : ''
    // When page is defined:
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, 
                                 FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
                          FROM Matches 
                          WHERE HomeTeam LIKE '%${home}%' AND AwayTeam LIKE '%${away}%'
                          ORDER BY HomeTeam, AwayTeam
                          LIMIT ${(page * pagesize) - (pagesize - 1)}, ${pagesize}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    // When page is not defined:
    } else {
        connection.query(`SELECT MatchId, Date, Time, HomeTeam AS Home, AwayTeam AS Away, 
                                 FullTimeGoalsH AS HomeGoals, FullTimeGoalsA AS AwayGoals  
                          FROM Matches 
                          WHERE HomeTeam LIKE '%${home}%' AND AwayTeam LIKE '%${away}%'
                          ORDER BY HomeTeam, AwayTeam`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    }
}

// Route 8 (handler)
async function search_players(req, res) {
    // IMPORTANT: in your SQL LIKE matching, use the %query% format to match the search query to substrings, not just the entire string
    const name = req.query.Name ? req.query.Name : ''
    const nationality = req.query.Nationality ? req.query.Nationality : ''
    const club = req.query.Club ? req.query.Club : ''
    const ratingLow = req.query.RatingLow ? req.query.RatingLow : 0
    const ratingHigh = req.query.RatingHigh ? req.query.RatingHigh : 100
    const potentialLow = req.query.PotentialLow ? req.query.PotentialLow : 0
    const potentialHigh = req.query.PotentialHigh ? req.query.PotentialHigh : 100

    // When page is defined:
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
                          FROM Players
                          WHERE Name LIKE '%${name}%' 
                          AND Nationality LIKE '%${nationality}%' 
                          AND Club LIKE '%${club}%' 
                          AND OverallRating BETWEEN ${ratingLow} AND ${ratingHigh}
                          AND Potential BETWEEN ${potentialLow} AND ${potentialHigh}
                          ORDER BY name
                          LIMIT ${(page * pagesize) - (pagesize - 1)}, ${pagesize}`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    // When page is not defined:
    } else {
        connection.query(`SELECT PlayerId, Name, Nationality, OverallRating AS Rating, Potential, Club, Value
                          FROM Players
                          WHERE Name LIKE '%${name}%' 
                          AND Nationality LIKE '%${nationality}%' 
                          AND Club LIKE '%${club}%' 
                          AND OverallRating BETWEEN ${ratingLow} AND ${ratingHigh}
                          AND Potential BETWEEN ${potentialLow} AND ${potentialHigh}
                          ORDER BY name`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    }
}

module.exports = {
    hello,
    jersey,
    all_matches,
    all_players,
    match,
    player,
    search_matches,
    search_players
}
 
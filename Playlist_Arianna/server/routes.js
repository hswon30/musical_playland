
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


/////////// PLAYLIST ////////////

async function playlist_getAllSongs(req, res) {
    // When page is defined:
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        // console.log(pagesize + " " + page)
        connection.query(`SELECT T.id AS TrackId, T.name AS TrackName, T.preview_url AS Preview, AL.name AS AlbumName, AL.images AS Cover, A.name AS ArtistName, A.genres AS Genre
                          FROM Albums AL
                          JOIN Artists A ON AL.artist_id = A.id
                          JOIN Tracks T ON AL.id = T.album_id
                          ORDER BY T.name
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
        connection.query(`SELECT T.id AS TrackId, T.name AS TrackName, T.preview_url AS Preview, AL.name AS AlbumName, AL.images AS Cover, A.name AS ArtistName, A.genres AS Genre
                          FROM Albums AL
                          JOIN Artists A ON AL.artist_id = A.id
                          JOIN Tracks T ON AL.id = T.album_id
                          ORDER BY T.name
                          LIMIT 3000, 10`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    }
}


async function playlist_getPlaylist(req, res) {
    // When page is defined:
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        // console.log(pagesize + " " + page)
        connection.query(`SELECT * FROM Playlist
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
        connection.query(`SELECT * FROM Playlist`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    }
}


async function playlist_search(req, res) {
    const ArtistName = req.query.ArtistName ? req.query.ArtistName : 'ab'
    const TrackName = req.query.TrackName ? req.query.TrackName : 'de'
    // When page is defined:
    if (req.query.page && !isNaN(req.query.page)) {
        const page = req.query.page
        const pagesize = req.query.pagesize ? req.query.pagesize : 10
        connection.query(`SELECT T.id AS TrackId, T.name AS TrackName, T.preview_url AS Preview, AL.name AS AlbumName, AL.images AS Cover, A.name AS ArtistName, A.genres AS Genre
                          FROM Albums AL
                          JOIN Artists A ON AL.artist_id = A.id
                          JOIN Tracks T ON AL.id = T.album_id
                          WHERE LOWER(A.name) LIKE '%${ArtistName}%' 
                          AND LOWER(T.name) LIKE '%${TrackName}%'
                          ORDER BY A.name, T.name
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
        connection.query(`SELECT T.id AS TrackId, T.name AS TrackName, T.preview_url AS Preview, AL.name AS AlbumName, AL.images AS Cover, A.name AS ArtistName, A.genres AS Genre
                          FROM Albums AL
                          JOIN Artists A ON AL.artist_id = A.id
                          JOIN Tracks T ON AL.id = T.album_id
                          WHERE LOWER(A.name) LIKE '%${ArtistName}%' 
                          AND LOWER(T.name) LIKE '%${TrackName}%'
                          ORDER BY A.name, T.name`, function (error, results, fields) {
            if (error) {
                console.log(error)
                res.json({ error: error })
            } else if (results) {
                res.json({ results: results })      
            }
        });
    }
}

 
async function playlist_getSong(req, res) {
    const id = req.query.id ? req.query.id : ''
    connection.query(`SELECT T.id AS TrackId, T.name AS TrackName, T.preview_url AS Preview, 
                                AL.name AS AlbumName, AL.images AS Cover, A.name AS ArtistName, 
                                A.genres AS Genre
                        FROM Albums AL
                        JOIN Artists A ON AL.artist_id = A.id
                        JOIN Tracks T ON AL.id = T.album_id
                        WHERE T.id = '${id}'`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: results })      
        }
    });
}


async function playlist_insertSong(req, res) {
    const id = req.query.id ? req.query.id : ''
    connection.query(`INSERT INTO Playlist(TrackId, TrackName, Preview, AlbumName, Cover, ArtistName, Genre)
                        SELECT T.id, T.name, T.preview_url, AL.name, AL.images, A.name, A.genres
                        FROM Albums AL 
                        JOIN Artists A ON AL.artist_id = A.id 
                        JOIN music_app.Tracks T ON AL.id = T.album_id
                        WHERE T.id = '${id}'`, function (error, results, fields) {
        if (error) {
            console.log(error)
            res.json({ error: error })
        } else if (results) {
            res.json({ results: 'insert' })      
        }
    });
}  





/////////// WORD CLOUD ////////////
 

/////////// WHO SANG IT BETTER ////////////
 





module.exports = {
    playlist_getAllSongs,
    playlist_getPlaylist,
    playlist_search,
    playlist_getSong,
    playlist_insertSong
}
 
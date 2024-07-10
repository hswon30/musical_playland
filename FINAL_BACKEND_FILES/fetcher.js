import config from './config.json'

// Hasun: get all tracks [not used in build. Use playlist_search() instead.]
const playlist_getAllSongs = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/allsongs?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

// Hasun: get the playlist  
const playlist_getPlaylist = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/playlist?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

// Hasun: search the database by artist name and/or track name
const playlist_search = async (artistName, trackName, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/search?ArtistName=${artistName}&TrackName=${trackName}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

// Hasun: get one track record by track id
const playlist_getSong = async (trackid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/onesong?id=${trackid}`, {
        method: 'GET',
    })
    return res.json()
}

// Hasun: insert a track record into the playlist
const playlist_insertSong = async (trackid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/insert?id=${trackid}`, {
        method: 'GET',
    })
    return res.json()
}

// Spencer: get attributes for a specific artist
const wordcloud_artists = async artistname => {
    var res = await fetch(
      `http://${config.server_host}:${config.server_port}/wordcloud/artists?ArtistName=${artistname}`,
      {
        method: 'GET'
      }
    )
    return res.json()
  }
  

  // Chloe: get a random name of a track that has more than one distinct artists 
  const popularity_getCompResults = async () => {
    var res = await fetch(
      `http://${config.server_host}:${config.server_port}/popularity/whoisbetter`,
      {
        method: 'GET'
      }
    )
    return res.json()
  }
  
  // Chloe: get one track by track id
  const popularity_getSong = async trackid => {
    var res = await fetch(
      `http://${config.server_host}:${config.server_port}/popularity/searchsong?id=${trackid}`,
      {
        method: 'GET'
      }
    )
    return res.json()
  }


export {
    playlist_getAllSongs,
    playlist_getPlaylist,
    playlist_search,
    playlist_getSong,
    playlist_insertSong,
    wordcloud_artists, 
    popularity_getCompResults, 
    popularity_getSong
}
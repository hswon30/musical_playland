import config from './config.json'

const playlist_getAllSongs = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/allsongs?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const playlist_getPlaylist = async (page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/playlist?page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const playlist_search = async (artistName, trackName, page, pagesize) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/search?ArtistName=${artistName}&TrackName=${trackName}&page=${page}&pagesize=${pagesize}`, {
        method: 'GET',
    })
    return res.json()
}

const playlist_getSong = async (trackid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/onesong?id=${trackid}`, {
        method: 'GET',
    })
    return res.json()
}

const playlist_insertSong = async (trackid) => {
    var res = await fetch(`http://${config.server_host}:${config.server_port}/playlist/insert?id=${trackid}`, {
        method: 'GET',
    })
    return res.json()
}


const wordcloud_artists = async artistname => {
    var res = await fetch(
      `http://${config.server_host}:${config.server_port}/wordcloud/artists?ArtistName=${artistname}`,
      {
        method: 'GET'
      }
    )
    return res.json()
  }
  
  const popularity_getCompResults = async () => {
    var res = await fetch(
      `http://${config.server_host}:${config.server_port}/popularity/whoisbetter`,
      {
        method: 'GET'
      }
    )
    return res.json()
  }
  
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
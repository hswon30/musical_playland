import config from './config.json'

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

export { wordcloud_artists, popularity_getCompResults, popularity_getSong }

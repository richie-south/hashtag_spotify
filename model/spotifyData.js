const spotify = require('./spotify')
const dbTrack = require('./DAL/track')

const fetchNewData = (hashtags) =>
  new Promise((resolve, reject) => {
    spotify.getNewSpotifyKeys(80, hashtags)
      .then(spotifyKeys => {
        const spotifyApi = spotify.getInstanceOfWebApi()
        return spotifyApi.getTracks(spotifyKeys)
      })
      .then(spotifyData => {
        let data = spotify.getDataToStore(spotifyData.body)
        return Promise.all(data.map(t => dbTrack.newOrUpdate(t)))
      })
      .then(result => resolve(result))
      .catch(e => {
        console.error('error in fetchNewData', e)
        reject(e)
      })
  })

module.exports = {
  fetchNewData,
}

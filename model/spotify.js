const SpotifyWebApi = require('spotify-web-api-node')

const twitter = require('./twitter')
const requestModel = require('./request')
const keys = require('../config/config').keys

const getInstanceOfWebApi = (url = null) =>
  new SpotifyWebApi({
    clientId: keys.spotify.clientId,
    clientSecret: keys.spotify.clientSecret,
    redirectUri: url,
  })

/**
 * [returns only whats needed from spotify track data]
 * @return {[object]}
 */
const getFormatedData = (track) => {
  return {
    songName: track.name,
    artistName: track.artists[0].name,
    albumName: track.album.name,
    albumArt: track.album.images[1],
    externalUrl: track.external_urls.spotify,
    previewUrl: track.preview_url,
    id: track.uri,
  }
}

/**
 * [getDataToStore singels out data form large dump of spotify track data]
 * @return {[array]}      [sorted spotifydata]
 */
const getDataToStore = (data) =>
  data.tracks
    .filter(t => t.preview_url)
    .map(t => getFormatedData(t))

/**
 * [removes all non spotify urls]
 * @param  {[Array]} urlArray [array of urls]
 */
const removeNonSpotifyUrls = (urlArray) => 
  urlArray.map(url => {
    try {
      const regEx = new RegExp('(https|http):\/\/spoti.fi(.[^\ |\)|\,|(\\n)|(…)]+)')
      const urlData = regEx.exec(url)
      return Array.isArray(urlData) ? urlData[0] : null
    } catch (e) {
      console.log('RegEx error twitter.js')
    }
  })
  .filter(url => url)

/**
 * [gets multible spotify track keys]
 * @callback {[array]}            [spotify track keys]
 */
const getNewSpotifyKeys = (nrOfTweets, hashtags) =>
  new Promise((resolve, reject) => {
    Promise.all(hashtags.map(ht =>
      twitter.makeSearchRequest(nrOfTweets, ht)
    ))
    .then(tweetsDumpArray => 
      tweetsDumpArray
        .map(t => t.statuses)
        .reduce((a, b) => a.concat(b)))
    .then(tweetsDump =>
      Promise.all(
        removeNonSpotifyUrls(
          twitter.getUrls(tweetsDump))
            .map(url => requestModel.doRequest(url))))
    .then(keys => {
      console.log('done')
      resolve(keys.filter(v => v !== null))
    })
    .catch(e => reject(e))
  })


module.exports = {
  getInstanceOfWebApi,
  getDataToStore,
  getFormatedData,
  getNewSpotifyKeys,
}

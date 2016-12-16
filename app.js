let env = process.env.NODE_ENV || 'development'
if (env === 'development') {
  const clear = require('clear') 
  clear() 
  clear()
}

const bodyParser = require('body-parser')
const express = require('express')
const router = require('express').Router()
const session = require('client-sessions')
const every = require('schedule').every

require('./model/DAL/dbHelper.js')()

const config = require('./config/config')
require('cron').CronJob

const spotifyData = require('./model/spotifyData')
const app = express()

app.use(session({
  cookieName: 'session',
  secret: config.secret,
  duration: 30 * 60 * 1000,
  activeDuration: 5 * 60 * 1000,
}))

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(__dirname + '/public'))

app.use('/', router)
app.use('/', require('./routes/index.js'))

app.all('/', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

const server = app.listen(4444, function() {
  console.log('Listening on port %d', server.address().port)
})
/*
spotifyData.fetchNewData(['spotify'])
    .then(result => console.log('new data added'))
    .catch(e => console.log(e))

every('1 hour').do(() => {
  spotifyData.fetchNewData(['spotify'])
      .then(result => console.log('new data added'))
      .catch(e => console.log(e))
}) 
*/

// expanded_url
const router = require('express').Router()
const dbTrack = require('../model/DAL/track')

router.get('/tracks/:page', function(req, res){
  dbTrack.pagination(Number(req.params.page))
  .then(pagination => {
    res
      .json({ tracks: pagination })
  }).catch(e => {
    res
      .status(500)
      .json({ message: e.message })
    console.log('somthing whent wrong! ', e)
  })
})

module.exports = router

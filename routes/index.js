'use strict';

const router = require('express').Router();
const dbTrack = require('../model/DAL/track');

router.get('/tracks/:page', function(req, res){
    dbTrack.pagination(req.params.page)
    .then(pagination => {
        res.send(JSON.stringify({ tracks: pagination }));
    }).catch(e => {
        console.log('somthing whent wrong! ', e);
    });
});

module.exports = router;

'use strict';

const Track = require('./schema/track');
const mongoose = require('mongoose');

/**
 * [crates ne mongodb entry]
 * @param  {[object]} trackObject [object whit track information]
 * @return {[promise]}  [resolves to saved object]
 */
const newTrack = (trackObject) =>
    new Track({
        songName: trackObject.songName,
        artistName: trackObject.artistName,
        albumName: trackObject.albumName,
        albumArt: {
            height: trackObject.albumArt.height,
            url: trackObject.albumArt.url,
            width: trackObject.albumArt.width
        },
        externalUrl: trackObject.externalUrl,
        previewUrl: trackObject.previewUrl,
        trackId: trackObject.id
    }).save();

/**
 * [gets track by trackId]
 * @param  {[string]} trackId [id of a track]
 * @return {[promise]}    [resolves to track object]
 */
const findByTrackId = (trackId) =>
    Track.findOne({ trackId: trackId }).exec();

/**
 * [determins if new data base entrry or update old one]
 * @param  {[object]} trackObject [object of track data]
 * @return {[promise]}    [resolves to track object]
 */
const newOrUpdate = (trackObject) =>
    new Promise((resolve, reject) => {
        findByTrackId(trackObject.id)
            .then(track => {
                if(!track){
                    return newTrack(trackObject);
                }
                track.popularityPoints = track.popularityPoints + 1;
                track.createdAt = new Date();
                return track.save();
            })
            .then(result => resolve(result))
            .catch(e => reject(e));
    });

/**
 * [gets all tracks]
 * @return {[promise]} [resolves to array of tracks]
 */
const getAllTracks = () => Track.find({});

/**
 * [gets certan amount of tracks orderd by updated date]
 * @param  {[number]} skip [number of tracks to skip]
 * @return {[promise]}      [resolves to array of tracks]
 */
const pagination = (skip = 0) =>
    Track.find({}).sort('-updatedAt').skip(skip).limit(100);

// pagination(0)
//     .then(a => console.log(a))
//     .catch(e => console.log('error', e));

module.exports = {
    newTrack,
    newOrUpdate,
    pagination
};

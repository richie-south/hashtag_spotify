'use strict';

const mongoose = require('mongoose');

const trackSchema = mongoose.Schema({
    songName: { type: String, required: true },
    artistName: { type: String, required: true },
    albumName: { type: String, required: true },
    albumArt: {
        height: { type: Number, required: true },
        url: { type: String, required: true },
        width: { type: Number, required: true }
    },
    externalUrl: { type: String, required: true },
    previewUrl: { type: String, required: true },
    trackId: { type: String, required: true },

    popularityPoints: { type: Number, default: 0 }
},
{
    timestamps: true
});

const Track = mongoose.model('Track', trackSchema);
module.exports = Track;

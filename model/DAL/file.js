'use strict';

const fsp = require('fs-promise');

/**
 * [saves file]
 */
const saveFile = (data, filename) =>
    fsp.writeFile(filename, JSON.stringify(data));

/**
 * [reads a file]
 * @return {[object]}   [file contents]
 */
const readFile = (filename) =>
    new Promise(function(resolve, reject) {
        fsp.readFile(filename, 'utf8')
            .then(data => resolve(JSON.parse(data)))
            .catch(e => reject(e));
    });


/**
 * [removes duplicated items in array]
 * @return {[array]}   [clened array]
 */
const removeDuplicates = (array) => {
    var seen = {};
    return array.filter((item) => {
        let k = JSON.stringify(item);
        return seen.hasOwnProperty(k) ? false : (seen[k] = true);
    });
};

/**
 * [update json file]
 */
const updateFileData = (data, filename) =>
    new Promise(function(resolve, reject) {
        readFile(filename)
            .then(spotifydata => {
                data.forEach(item => {
                    spotifydata.push(item);
                });
                return saveFile(this.removeDuplicates(spotifydata), filename);
            })
            .then(result => resolve(result))
            .catch(e => {
                console.log('Error while reading file', e);
                reject(e);
            });
    });

/**
 * [creates pages of stored musicData]
 * @callback {[Object]}     [page with tracks, total nr of pages, next page nr]
 */
const pagination = (page, filename) =>
    new Promise(function(resolve, reject) {
        let pages = [];
        readFile(filename)
            .then(function(tracks){
                let reversed = tracks.reverse();
                let i, j, temparray, chunk = 20;
                for (i = 0, j = reversed.length; i < j; i += chunk) {
                    pages.push(tracks.slice(i, i + chunk));
                }
                // tracks, totalPages nextPage
                return resolve({tracks: (page <= pages.length ? pages[page] : null), totalPages:pages.length, nextPage:(pages[page+1] ? page+1 : null)});
            })
            .catch(e => {
                console.log('Error while reading file ', e);
                reject(e);
            });
    });

const overwriteOrUpdate = (update, data, filename) => {
    if(update){
        return updateFileData(data, filename);
    }else{
        return saveFile(data, filename);
    }
};


module.exports = {
    saveFile,
    readFile,
    removeDuplicates,
    updateFileData,
    pagination,
    overwriteOrUpdate
};

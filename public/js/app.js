'use strict';

function init(){
    var mb = musicBar();
    var lc = loadCards(mb);
    lc.load();

}

window.onload = init;

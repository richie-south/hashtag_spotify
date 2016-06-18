'use strict';


function cardView(CardTemplate, mb){
    return new CardTemplate({
        data: {
        },
        methods: {
            /**
             * [handle play pause button click]
             */
            click: function(){
                var artist = this.$el.dataset.artist;
                var album = this.$el.dataset.album;
                var song = this.$el.dataset.song;
                var previewUrl = this.$el.dataset.previewUrl;
                var externalUrl = this.$el.dataset.externalUrl;

                mb.loadData(artist, album, song, previewUrl, externalUrl);
            }
         },
        attached: function(){

        }
    });
}

function cardTemplate(o) {
     return Vue.extend({
        template: ''+
            '<div class="grid-item grid-image-item" v-on:click="click"'+
            'data-artist="'+o.artistName+'"'+
            'data-album="'+o.albumName+'"'+
            'data-song="'+o.songName+'"'+
            'data-preview-url="'+o.previewUrl+'"'+
            'data-external-url="'+o.externalUrl+'">'+
                '<img src="'+o.albumArt.url+'">'+
            '</div>'
     });
}


function mountCard(cardView) {
    cardView.$mount().$appendTo('#images');
}

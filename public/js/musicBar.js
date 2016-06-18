'use strict';

function musicBar(){
    return new Vue({
        el: '#musicBar',
        data: {
            loaded: false,
            playMusic: true,
            songName: '',
            albumName: '',
            externalUrl: ''
        },
        methods: {

            loadData: function(artist, album, song, previewUrl, externalUrl){
                this.$data.loaded = true;
                this.$data.songName = song;
                this.$data.albumName = album;
                this.$data.externalUrl = externalUrl;
                this.$els.audioPlayer.src = previewUrl;

                this.playAudio();
                this.$data.playMusic = true;
                var that = this;
                this.$els.audioPlayer.addEventListener('timeupdate', function(){
                    that.$els.progress.setAttribute('value', this.currentTime / this.duration);
                });
            },

            /**
             * [handle play pause button click]
             */
            pausePlayClick: function(){
                if(!this.$data.loaded){
                    return;
                }
                if(this.$data.playMusic){
                    this.pauseAudio();
                    this.$data.playMusic = false;
                }else{
                    this.playAudio();
                    this.$data.playMusic = true;
                }
            },

            pauseAudio: function(){
                this.$els.pausePlayIconHolder.textContent = 'play_circle_filled';
                this.$els.audioPlayer.pause();
            },

            playAudio: function(){
                this.$els.pausePlayIconHolder.textContent = 'pause_circle_filled';
                this.$els.audioPlayer.play();
            }
         },
        attached: function(){

        }
    });
}

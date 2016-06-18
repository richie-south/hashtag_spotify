'use strict';

function getData(page) {
    return new Promise(function(resolve, reject) {
        fetch('/tracks/'+page)
            .then(response => response.json())
            .then(result => {
                resolve(result);
            })
            .catch(e => reject(e));
    });
}

function loadCards(mb){
    return new Vue({
        el: '#loadMore',
        data: {
            page: 0
        },
        methods: {
            /**
             * [handle play pause button click]
             */
            load: function(){
                var elem = document.querySelector('.grid');
                getData(this.$data.page)
                    .then(result => {
                        this.$data.page = this.$data.page + 100;
                        var cardTemplates = result.tracks.map(cardTemplate);
                        var cardViews = cardTemplates.map(c => cardView(c, mb));
                        cardViews.forEach(mountCard);

                        imagesLoaded(document.querySelector('#images'), function(instance) {
                            var msnry = new Masonry( elem, {
                                itemSelector: '.grid-item',
                            });
                        });
                    })
                    .catch(e => {
                        console.log('errror', e);
                    });
            }
         },
        attached: function(){

        }
    });
}

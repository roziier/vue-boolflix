// BOOLFIX

var app = new Vue({
  el: '#app',
  data: {
    // userSearch will be an empty strings, we'll replace it at the end of API's call
    userSearch: '',
    // empty array that I will fill it with API's push
    myFilms: [],
    myTVseries: [],
    imgNull: 'black.jpeg',
    showSearched: false
  },
  methods: {
    callAPI: function () {
      // API to get Films
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d',
      // params added to personalize the research
      {
        params: {
          language: 'it-IT',
          query: this.userSearch
        }
      })
      .then(response => {
        this.myFilms = response.data.results;
        for (var i = 0; i < this.myFilms.length; i++) {
          this.myFilms[i].vote_average = Math.round(this.myFilms[i].vote_average / 2);
        }
        this.showSearched = true;
        console.log('array films: ', this.myFilms);
      }),

      // API to get TV series
      axios.get('https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d',
      // params added to personalize the research
      {
        params: {
          language: 'it-IT',
          query: this.userSearch
        }
      })
      .then(response => {
        this.myTVseries = response.data.results;
        for (var i = 0; i < this.myTVseries.length; i++) {
          this.myTVseries[i].vote_average = Math.round(this.myTVseries[i].vote_average / 2);
        }
        console.log('array tv series: ', response);
      })
    }
    ,

    // API to add genres and cast
    moreDetails: function (indexFilm) {
      axios.get('https://api.themoviedb.org/3/movie/' + indexFilm + '?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT')
      .then(response => {
        console.log(response);
      })
    }


  }
})

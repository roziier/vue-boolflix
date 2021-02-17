// BOOLFIX

var app = new Vue({
  el: "#app",
  data: {
    // userSearch will be an empty strings, we'll replace it at the end of API's call
    userSearch: "",
    // empty array that I will fill it with API's push
    myFilms: [],
    myTVseries: [],
    imgNull: "black.jpeg",
    showSearched: false,
    myGenres: [],
    myCast: [],
    showModal: false,
    selTit: "",
    selOver: "",
    imgBck: "",
  },
  methods: {
    callAPI: function () {
      // API to get Films
      axios
        .get(
          "https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d",
          // params added to personalize the research
          {
            params: {
              language: "it-IT",
              query: this.userSearch,
            },
          }
        )
        .then((response) => {
          this.myFilms = response.data.results;
          for (var i = 0; i < this.myFilms.length; i++) {
            this.myFilms[i].vote_average = Math.round(
              this.myFilms[i].vote_average / 2
            );
          }
          this.myFilms.forEach((item) => {
            item.indiceFilmAttivo = true;
          });

          this.showSearched = true;
          console.log("array films: ", this.myFilms);
        }),
        // API to get TV series
        axios
          .get(
            "https://api.themoviedb.org/3/search/tv?api_key=e99307154c6dfb0b4750f6603256716d",
            // params added to personalize the research
            {
              params: {
                language: "it-IT",
                query: this.userSearch,
              },
            }
          )
          .then((response) => {
            this.myTVseries = response.data.results;
            for (var i = 0; i < this.myTVseries.length; i++) {
              this.myTVseries[i].vote_average = Math.round(
                this.myTVseries[i].vote_average / 2
              );
            }
            this.myTVseries.forEach((item) => {
              item.indiceTVAttivo = true;
            });
            console.log("array tv series: ", response);
          });
    },

    // function to activate index film
    attivoFilm: function (indiceFilm) {
      this.myGenres = [];
      this.myCast = [];
      for (var i = 0; i < this.myFilms.length; i++) {
        this.myFilms[i].indiceFilmAttivo = true;
      }
      this.myFilms[indiceFilm].indiceFilmAttivo = false;
    },

    // function to activate index tv series
    attivoTV: function (indiceTV) {
      this.myGenres = [];
      this.myCast = [];
      for (var i = 0; i < this.myTVseries.length; i++) {
        this.myTVseries[i].indiceTVAttivo = true;
      }
      this.myTVseries[indiceTV].indiceTVAttivo = false;
    },

    // chiamata more details film
    FilmMoreDetails: function (iDFilm, indiceFilm) {
      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            iDFilm +
            "?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT"
        )
        .then((response) => {
          this.selTit = response.data.original_title;
          this.selOver = response.data.overview;
          this.imgBck = response.data.backdrop_path;
          let road = response.data.genres;
          for (var i = 0; i < road.length; i++) {
            this.myGenres.push(road[i].name);
          }
        });

      axios
        .get(
          "https://api.themoviedb.org/3/movie/" +
            iDFilm +
            "/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT"
        )
        .then((response) => {
          let road = response.data.cast;

          for (var i = 0; i < 5; i++) {
            this.myCast.push(road[i].name);
          }
        });

      this.showModal = true;
      this.attivoFilm(indiceFilm);
    },

    // chiamata more details tv series
    TVMoreDetails: function (iDTV, indiceTV) {
      axios
        .get(
          "https://api.themoviedb.org/3/tv/" +
            iDTV +
            "?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT"
        )
        .then((response) => {
          console.log(response);
          this.selTit = response.data.original_name;
          this.selOver = response.data.overview;
          this.imgBck = response.data.backdrop_path;
          let road = response.data.genres;
          for (var i = 0; i < road.length; i++) {
            this.myGenres.push(road[i].name);
          }
        });

      axios
        .get(
          "https://api.themoviedb.org/3/tv/" +
            iDTV +
            "/credits?api_key=e99307154c6dfb0b4750f6603256716d&language=it-IT"
        )
        .then((response) => {
          let road = response.data.cast;

          for (var i = 0; i < 5; i++) {
            this.myCast.push(road[i].name);
          }
        });

      this.showModal = true;
      this.attivoTV(indiceTV);
    },
  },
});

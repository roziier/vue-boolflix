// BOOLFIX
// Milestone 1:
// Creare un layout base con una searchbar (una input e un button) in cui possiamo scrivere completamente o parzialmente il nome di un film. Possiamo, cliccando il  bottone, cercare sull’API tutti i film che contengono ciò che ha scritto l’utente.
// Vogliamo dopo la risposta dell’API visualizzare a schermo i seguenti valori per ogni film trovato:
// titolo, titolo originale, lingua, voto


var app = new Vue({
  el: '#app',
  data: {
    // userSearch will be an empty strings, we'll replace it at the end of API's call
    userSearch: '',
    // empty array that I will fill it with API's push
    myFilms: []
  },
  methods: {
    callAPI: function () {
      axios.get('https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d',
      // params added to personalize the research
      {
        params: {
          query: this.userSearch
        }
      })
      .then(response => {
        this.myFilms = response.data.results;
        for (var i = 0; i < this.myFilms.length; i++) {
          this.myFilms[i].vote_average = Math.round(this.myFilms[i].vote_average / 2);
        }
        console.log(this.myFilms);


      })
    }

  }
})

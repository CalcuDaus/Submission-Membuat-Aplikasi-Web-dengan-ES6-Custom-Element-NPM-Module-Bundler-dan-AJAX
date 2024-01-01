class FilmSource {
  static searchFilm(axios, option,keyword) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.BASE_URL}/search/movie?query=${keyword}&include_adult=false&language=en-US`,
          option
        )
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });

    });
  }

  static trendingFilm(axios, option) {
    return new Promise((resolve, reject) => {
      axios
        .get(
          `${process.env.BASE_URL}/trending/movie/week?language=en-US`,
          option
        )
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });

    });
  }

  static popularFilm(axios,option){
    return new Promise((resolve,reject)=>{
      axios
        .get(
          `${process.env.BASE_URL}/movie/popular?language=en-US&page=1`,
          option
        )
        .then(function(response) {
          resolve(response);
        })
        .catch(function(error) {
          reject(error);
        });
    })
  }
}

export default FilmSource;
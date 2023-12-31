class FilmSource {
  static searchFilm(keyword) {}

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
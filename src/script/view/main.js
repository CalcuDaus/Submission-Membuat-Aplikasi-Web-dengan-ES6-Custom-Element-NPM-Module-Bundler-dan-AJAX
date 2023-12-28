const axios = require("axios");

const option = {
    headers: {
        accept: "application/json",
        Authorization:
        process.env.BEARER_TOKEN
      }
}
const main = () => {
    axios.get(`${process.env.BASE_URL}/search/movie?query=tes&include_adult=true&language=en-US&page=2`,option)
    .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })

};

export default main;

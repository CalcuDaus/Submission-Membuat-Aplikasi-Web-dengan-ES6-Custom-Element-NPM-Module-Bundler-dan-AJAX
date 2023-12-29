import Swiper from "swiper/bundle";
import 'swiper/css/bundle';

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

      // swiper
      var swiper = new Swiper(".mySwiper", {
        slidesPerView: 2,
        spaceBetween: 30,
        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
      });
};

export default main;

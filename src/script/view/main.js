import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css";

const axios = require("axios");
const option = {
  headers: {
    accept: "application/json",
    Authorization: process.env.BEARER_TOKEN,
  },
};

const main = () => {
  // swiper
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const imgTrenEl = document.querySelector("#img-poster-tren");
  const imgPopEl = document.querySelector("#img-poster-pop");
  setInterval(() => {
    imgTrenEl.src = document.querySelectorAll(
      ".swiper-slide-active"
    )[0].children[0].src;
    imgPopEl.src = document.querySelectorAll(
      ".swiper-slide-active"
    )[1].children[0].src;
  }, 100);
  // axios.get(`${process.env.BASE_URL}/search/movie?query=tes&include_adult=true&language=en-US&page=2`,option)
  // .then(function (response) {
  //     console.log(response);
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   })

  // Button Toggle
  const btnToggle = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");
  btnToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  // AOS
  AOS.init();
};

export default main;

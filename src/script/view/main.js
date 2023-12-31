import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css";
import FilmSource from "../data/film-api";

// loadash init
const _ = require("lodash");

// axios init
const axios = require("axios");
const option = {
  headers: {
    accept: "application/json",
    Authorization: process.env.BEARER_TOKEN,
  },
};

const main = () => {
  // element
  const appBarElement = document.querySelector('app-bar');
  const trenEl = document.querySelector("#trending");
  const popEl = document.querySelector("#popular");
  const heroEl = document.querySelector("#hero");


  // swiper
  let swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  // handle trending swiper
  const swiperWrapper = document.querySelectorAll(".swiper-wrapper");
  const handleTrendingSwiper = () => {
    const film = FilmSource.trendingFilm(axios, option);
    film.then((response) => {
      const dataResults = response.data.results;
      const sixData = _.take(dataResults, 6);
      renderSwiperTrending(sixData);
    })
    .catch(err => alert(err));
  };
  handleTrendingSwiper();

  const renderSwiperTrending = (films) => {
    let srcImg = [];
    let title = [];
    const swipers = swiperWrapper[0].children;
    films.forEach((film,index) => {
      srcImg.push(`
      <img
        id="swiper-img"
        src="https://image.tmdb.org/t/p/w500${film.poster_path}"
        alt=""
      />`);
      title.push(`<h1>${film.original_title}</h1>`);
    });
    Array.from(swipers).forEach((swiper,index) => {
      swiper.innerHTML = srcImg[index] || './img/dummy-poster-1.jpg';
    });
  };

  // handle popular swiper
  const handlePopularSwiper = () => {
    const film = FilmSource.popularFilm(axios, option);
    film.then((response) => {
      const dataResults = response.data.results;
      const sixData = _.take(dataResults, 6);
      renderSwiperPopular(sixData);
    })
    .catch(err => alert(err));
  };
  const renderSwiperPopular= (films) => {
    let srcImg = [];
    const swipers = swiperWrapper[1].children;
    films.forEach((film) => {
      srcImg.push(`
      <img
        id="swiper-img"
        src="https://image.tmdb.org/t/p/w500${film.poster_path}"
        alt=""
      />`);
    });
    Array.from(swipers).forEach((swiper,index) => {
      swiper.innerHTML = srcImg[index] || './img/dummy-poster-1.jpg';
    });
  };

  handlePopularSwiper();


 // swiper control
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

  //search control
  const onClickSeacrhButton = () => {
    hideElement();
  };

  const hideElement = () => {
    trenEl.style.display = "none";
    popEl.style.display = "none";
    heroEl.style.display = "none";
  };

  const showEl = () => showElement();
  const showElement = () => {
    trenEl.style.display = "block";
    popEl.style.display = "block";
    heroEl.style.display = "block";
  };

  appBarElement.clickNav = showEl;
  appBarElement.clickSearch = onClickSeacrhButton;
  // AOS
  AOS.init();
};

export default main;

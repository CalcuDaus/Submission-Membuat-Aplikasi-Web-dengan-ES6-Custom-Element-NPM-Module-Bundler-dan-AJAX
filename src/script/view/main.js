import Swiper from "swiper/bundle";
import "swiper/css/bundle";
import AOS from "aos";
import "aos/dist/aos.css";
import FilmSource from "../data/film-api";
import "../components/film-list.js";
import _ from "lodash";
import axios from "axios";

const option = {
  headers: {
    accept: "application/json",
    Authorization: process.env.BEARER_TOKEN,
  },
};

const main = () => {
  const appBarElement = document.querySelector("app-bar");
  const filmListElement = document.querySelector("film-list");
  const containerFilm = document.querySelector(".container-film");
  const trenEl = document.querySelector("#trending");
  const popEl = document.querySelector("#popular");
  const heroEl = document.querySelector("#hero");

  const swiper = new Swiper(".mySwiper", {
    slidesPerView: 2,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  const swiperWrapper = document.querySelectorAll(".swiper-wrapper");

  const renderSwiper = (films, index) => {
    const srcImg = films.map(film => `
      <img
        id="swiper-img"
        src="https://image.tmdb.org/t/p/w500${film.poster_path}"
        alt=""
      />`);
    const swipers = swiperWrapper[index].children;
    Array.from(swipers).forEach((swiper, index) => {
      swiper.innerHTML = srcImg[index] || "./img/dummy-poster-1.jpg";
    });
  };

  const handleSwiper = (sourceFunction, index) => {
    const film = FilmSource.trendingFilm(axios, option);
    film
      .then((response) => {
        const dataResults = response.data.results;
        const sixData = _.take(dataResults, 6);
        renderSwiper(sixData, index);
      })
      .catch((err) => alert(err));
  };

  handleSwiper(FilmSource.trendingFilm, 0);
  handleSwiper(FilmSource.popularFilm, 1);

  if(document.querySelector('.container-film').children.length == 1){
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
  }

  let ulElement = document.createElement("ul");
  ulElement.classList.add("pagination-c");

  const onClickSearchButton = () => {
    const promFilm = FilmSource.searchFilm(axios, option, appBarElement.value);
    let isFirstPage;

    promFilm
      .then((response) => {
        const filmResults = response.data;
        const totalPage = filmResults.total_pages;

        if (filmResults.page === 1) {
          isFirstPage = filmResults.results;
        }

        for (let i = 0; i < totalPage; i++) {
          let liElement = document.createElement("li");
          liElement.classList.add("page-item-c");
          liElement.innerHTML = `<a href="#" class="page-link">${i + 1}</a>`;
          ulElement.appendChild(liElement);
        }

        containerFilm.appendChild(ulElement);
        document.querySelector(".page-item-c").classList.add("active");

        const liPages = document.querySelectorAll(".page-item-c");
        liPages.forEach((li) => {
          li.addEventListener("click", function () {
            const current = document.querySelectorAll(".page-item-c.active");
            current[0].className = current[0].className.replace("active", "");
            this.className += " active";
            const pageNumber = this.innerText;

            function getFilmData() {
              FilmSource.searchFilm(
                axios,
                option,
                appBarElement.value,
                pageNumber
              ).then((filmData) => {
                isFirstPage = filmData.data.results;
                filmListElement.films = isFirstPage;
              }).catch((error) => {
                console.error('Error fetching film data:', error);
              });
            }

            getFilmData();
          });
        });

        filmListElement.films = isFirstPage;
      })
      .catch((err) => console.log(err));

    ulElement.innerHTML = ``;
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
  appBarElement.clickSearch = onClickSearchButton;

  AOS.init();
};

export default main;

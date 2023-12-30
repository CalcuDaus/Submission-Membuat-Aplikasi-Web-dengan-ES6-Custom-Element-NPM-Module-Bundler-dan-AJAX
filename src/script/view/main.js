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
  // element
  const btnToggle = document.querySelector(".hamburger");
  const navList = document.querySelector(".nav-list");
  const btnSearch = document.querySelector('#search-button');
  const trenEl = document.querySelector('#trending');
  const popEl = document.querySelector('#popular');
  const heroEl = document.querySelector('#hero');
  const navsEl = document.querySelectorAll('.app-bar a');



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
  btnToggle.addEventListener("click", () => {
    navList.classList.toggle("active");
  });

  // show elemet
  const showEl = ()=>{
    showElement();
  }


  //search control
 const onClickSeacrhButton = ()=>{
    hideElement();
 }

 const hideElement = ()=>{
  trenEl.style.display = 'none';
  popEl.style.display = 'none';
  heroEl.style.display = 'none';
 }
 const showElement = ()=>{
  trenEl.style.display = 'block';
  popEl.style.display = 'block';
  heroEl.style.display = 'block';
 }

 btnSearch.addEventListener('click',onClickSeacrhButton);

 navsEl.forEach(nav => {
  nav.addEventListener('click',showEl);
 });
  // AOS
  AOS.init();
};

export default main;

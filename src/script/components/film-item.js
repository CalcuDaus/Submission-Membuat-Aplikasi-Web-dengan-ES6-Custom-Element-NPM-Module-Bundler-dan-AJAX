class FilmItem extends HTMLElement{
    constructor(){
        super();
        this.shadowDOM = this.attachShadow({mode:"open"});
    }
    set film(film){
        this._film = film;
        this.render();
    }
    render(){
        this.shadowDOM.innerHTML = `
            <style>
            :host {
                width: 350px;
                height: 670px;
                color: whitesmoke;
                background-color: rgba(255, 255, 255, 0.328);
                border-radius: 20px;
                position: relative;
                cursor: pointer;
              }
               img {
                width: 330px;
                height: 500px;
                border-radius: 28px;
                padding: 10px;
                transition: all .4s;
              }
              :host(:hover) > img{
                  filter: saturate(10%);
              }
              .film-info {
                padding: 0px 15px;
              }
              .film-info h5{
                margin:0;
                max-height:90px;
                overflow:hidden;
                font-size:20px;
              }
              
              :host(:hover) .rate{
                  opacity: 1;
              }
               .rate {
                position: absolute;
                top: 40%;
                left: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-direction: column;
                font-weight: bold;
                transform: translate(-50%,-50%);
                font-size: 30px;
                opacity: 0;
                transition: all .4s;
              }
               .rate p{
                text-shadow: 4px 4px 5px black;
              }
              .star {
                  width: 50px;
                  height: 50px;
                  background: #ffbb00;
                  clip-path: polygon(50% 5%, 61% 40%, 98% 40%, 68% 62%, 79% 96%, 50% 75%, 21% 96%, 32% 62%, 2% 40%, 39% 40%);
              }
            </style>
            <img id="swiper-img" src="${(this._film.poster_path)?"https://image.tmdb.org/t/p/w500"+this._film.poster_path:"./img/logo.png"}">
            <div class="film-info">
                <h5>${this._film.title}</h5>
                <p>Release Date : <i>${this._film.release_date}</i></p>
            </div>
            <div class="rate">
                <div class="star"></div>
                <p>${this._film.vote_average}</p>
            </div>
        `;
    }
}

customElements.define('film-item',FilmItem);
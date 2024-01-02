class FilmItem extends HTMLElement{
    set film(film){
        this._film = film;
        this.render();
    }
    render(){
        this.innerHTML = `
            <img id="swiper-img" src="https://image.tmdb.org/t/p/w500${this._film.poster_path}">
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
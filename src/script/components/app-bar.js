class AppBar extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  set clickSearch(event) {
    this._clickSearch = event;
    this.render();
  }
  set clickNav(event) {
    this._clickNav = event;
    this.render();
  }

  render() {
    this.innerHTML = `
        <div class="logo">
        <a href="#"><img src="./img/logo.png" width="100px" alt="" /></a>
      </div>
      <nav class="nav-list">
        <ul>
          <li><a href="#trending">Trending</a></li>
          <li><a href="#popular">Popular</a></li>
          <li>
            <div class="search-bar">
              <input type="search" name="" id="search-input" />
              <button id="search-button">Search</button>
            </div>
          </li>
        </ul>
      </nav>
      <div class="hamburger">
        <button>se</button>
      </div>
        `;
    this.querySelector(".hamburger").addEventListener("click", () => {
      this.querySelector(".nav-list").classList.toggle("active");
    });
    this.querySelector("#search-button").addEventListener(
      "click",
      this._clickSearch
    );
    const navsEl = this.querySelectorAll("app-bar a");
    navsEl.forEach((nav) => nav.addEventListener("click", this._clickNav));
  }
}

customElements.define("app-bar", AppBar);

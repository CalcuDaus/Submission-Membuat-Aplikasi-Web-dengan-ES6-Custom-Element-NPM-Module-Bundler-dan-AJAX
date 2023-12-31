class AppBar extends HTMLElement {
    constructor(){
        super();
        this.shadowDOM = this.attachShadow({mode:'open'});
    }
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
    this.shadowDOM.innerHTML = `
    <style>
    *{
        scroll-behavior: smooth;
        box-sizing: border-box;
        margin: 0;
        font-family: 'poppins';
        padding: 0;
    }
    :host{
        width: 100%;
        max-width: 1200px;
        display: flex;
        justify-content: space-between;
    }
     nav{
        display: flex;
        align-items: center;
    }
     ul{
        display: flex;
        gap: 20px;
        list-style: none;
    }
     li{
        transition: all .2s;
    }
     li:nth-child(2):hover,
     li:nth-child(1):hover{
        border-bottom: 4px solid #d70a84;
    }
     ul li a{
        color: whitesmoke;
        text-decoration: none;
        font-weight: 600;
        letter-spacing: 1px;
    }
    .search-bar{
        position: relative;
    }
    .search-bar input{
        border: 2px solid #d70a84;
        outline: none;
        border-radius: 7px;
        padding: 2px 10px;
        width: 290px;
        margin-left: 20px;
        background-color: rgb(221, 221, 221);
        box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.35);
    }
    .search-bar button{
        position: absolute;
        right: 1px;
        top: 1px;
        border: none;
        border-radius: 0 5px 5px 0;
        padding: 1px 14px 4px 14px;
        background: linear-gradient(-30deg,#d70a84,#51127f);
        color: whitesmoke;
        cursor:pointer;
    }
     .hamburger{
        display: none;
        cursor:pointer;
     }
      nav.active{
        height: 200px;
     }
     .button-ham {
        display: inline-block;
        cursor: pointer;
      }
      
      .bar1, .bar2, .bar3 {
        width: 35px;
        height: 5px;
        background-color: #d70a84;
        margin: 6px 0;
        transition: 0.4s;
      }
      .change .bar1 {
        transform: translate(0, 11px) rotate(-45deg);
      }
      
      .change .bar2 {opacity: 0;}
      
      .change .bar3 {
        transform: translate(0, -11px) rotate(45deg);
      }
    @media screen and (max-width: 675px) {
         nav{
            height: 0;
            overflow: hidden;
            transition: all .5s;
            margin-left: -200px;
        }
      nav ul {
        margin-top: 70px;
        display: flex;
        flex-direction: column;
     }  
      .hamburger{
        display: block;
     } 
     .search-bar input {
        margin-left: 0;
     }
    }
    </style>
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
        <div class="button-ham">
            <div class="bar1"></div>
            <div class="bar2"></div>
            <div class="bar3"></div>
        </div>
      </div>
        `;
        this.shadowDOM.querySelector('.button-ham').addEventListener('click',function(){
            this.classList.toggle('change');
        })
    this.shadowDOM.querySelector(".hamburger").addEventListener("click", () => {
      this.shadowDOM.querySelector(".nav-list").classList.toggle("active");
    });
    this.shadowDOM.querySelector("#search-button").addEventListener(
      "click",
      this._clickSearch
    );
    const navsEl = this.shadowDOM.querySelectorAll("a");
    navsEl.forEach((nav) => nav.addEventListener("click", this._clickNav));
  }
}

customElements.define("app-bar", AppBar);

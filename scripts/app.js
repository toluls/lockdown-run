const startForm = document.querySelector('#start');
const nameInput = document.querySelector('#input');
const nav = document.querySelector('#nav');
const navButton = document.querySelector('#nav_button_text');
const navButtonBar = document.querySelector('#nav_button_bar');
const welcomeSection = document.querySelector('#welcome_section');
const dashboardSection = document.querySelector('#dashboard_section');
const menuSection = document.querySelector('#menu_section');

let player;

// functions and class 

class Player {
  constructor(name) {
    this.name = name;
    this.score = localStorage.getItem('engagiix-playerScore') || 0;
    this.diamonds = localStorage.getItem('engagiix-playerDiamond') || 0;
    this.policeFine = localStorage.getItem('engagiix-playerFine') || 0;
  } 

  saveName() {
    localStorage.setItem('engagiix-player', this.name);
  }

  welcome() {
    const welcome = document.querySelector('#user_welcome');
    welcome.textContent = `Hey! ${this.name} ✌🏼`;
  }
}

function clearInput() {
  nameInput.value = "";
}

const showDashboard = () => {
  welcomeSection.classList.add('hide');
  dashboardSection.classList.remove('hide');
  nav.classList.remove('hide');
}

const menuHandler = () => {
  nav.addEventListener('click', () => {
    menuSection.classList.toggle('hide');
    const menuWelcome = document.querySelector('#menu_welcome');
    menuWelcome.textContent = `Hey! ${player.name} ✌🏼`;
    navButton.textContent = navButton.textContent === "Game Menu" ? "Close Menu" : "Game Menu";
    navButtonBar.classList.toggle('nav__button__bar--close');
  });
}

const authenticate = name => {
  player = new Player(name);
  player.saveName();
  showDashboard();
  player.welcome();
  menuHandler();
}

const checkPlayer = () => {
  const name = localStorage.getItem('engagiix-player');
  if (name) {
    authenticate(name);
  }
  else {
    welcomeSection.classList.remove('hide');
    startForm.addEventListener('submit', event => {
      event.preventDefault();
      const name = nameInput.value.trim();
      if (name.length === 0) {
        alert('Input must not be empty! Kindly enter a valid name.');
      }
      else {
        clearInput();
        authenticate(name); 
      }
    });
  }
}

// execution

checkPlayer();
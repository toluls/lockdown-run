const startForm = document.querySelector('#start');
const nameInput = document.querySelector('#input');
const nav = document.querySelector('#nav');
const welcomeSection = document.querySelector('#welcome_section');
const dashboardSection = document.querySelector('#dashboard_section');
const gameMenu = document.querySelector('#game_menu');

let player;

// functions and class 

class Player {
  constructor(name) {
    this.name = name;
    this.score = localStorage.getItem('engagiix-playerScore') || 0;
    this.diamonds = localStorage.getItem('engagiix-playerDiamond') || 0;
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

const authenticate = name => {
  player = new Player(name);
  player.saveName();
  showDashboard();
  player.welcome();
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
      const name = nameInput.value;
      clearInput();
      authenticate(name); 
    });
  }
}




// execution 

checkPlayer();
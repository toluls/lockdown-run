class Game {
  constructor(name = 'newPlayer') {
    this.player = name;
    this.score = localStorage.getItem('engagiix-playerScore') || 0;
    this.diamonds = localStorage.getItem('engagiix-playerDiamond') || 0;
    this.policeFine = localStorage.getItem('engagiix-playerFine') || 0;
    this.inputForm = document.querySelector('#start');
    this.nameInput = document.querySelector('#input');
    this.nav = document.querySelector('#nav');
    this.navButton = document.querySelector('#nav_button_text');
    this.navButtonBar = document.querySelector('#nav_button_bar');
    this.welcomeSection = document.querySelector('#welcome_section');
    this.dashboardSection = document.querySelector('#dashboard_section');
    this.menuSection = document.querySelector('#menu_section');
    this.welcomeText = document.querySelector('#user_welcome');
    this.menuWelcome = document.querySelector('#menu_welcome');
    this.updateName = document.querySelector('#update_info');
  }

  savePlayer(name) {
    this.nameInput.value = "";
    localStorage.setItem('engagiix-player', name);
    this.player = name;
  }

  authenticate() {
    this.showDashboard();
    this.menuHandler();
  }

  newPlayer() {
    this.welcomeSection.classList.remove('hide');
    this.inputForm.addEventListener('submit', event => {
      event.preventDefault();
      const player = this.nameInput.value.trim();
      if (player.length === 0) {
        alert('Input must not be empty! Kindly enter a valid name.');
      }
      else {
        this.savePlayer(player);
        this.authenticate(); 
      }
    });
  }

  changeName() {
    localStorage.clear();
    location.reload();
  }

  nameUpdateListener() {
    this.updateName.addEventListener('click', () => {
      const proceed = confirm('Your game progress including scores and diamonds will be cleared. Are you sure you want to proceed?');
      if (proceed) {
        this.changeName();
      }
      else {
        alert('Action cancelled!');
      }
    });
  }

  showDashboard() {
    this.welcomeSection.classList.add('hide');
    this.dashboardSection.classList.remove('hide');
    this.nav.classList.remove('hide');
    this.welcomeText.textContent = `Hey! ${this.player} ✌🏼`;
  }

  menuHandler() {
    this.nav.addEventListener('click', () => {
      this.menuSection.classList.toggle('hide');
      this.menuWelcome.textContent = `Hey! ${this.player} ✌🏼`;
      this.navButton.textContent = this.navButton.textContent === "Game Menu" ? "Close Menu" : "Game Menu";
      this.navButtonBar.classList.toggle('nav__button__bar--close');
    });
    this.nameUpdateListener();
  }
}

const startGame = () => {
  const player = localStorage.getItem('engagiix-player');
  if (player) {
    const game = new Game(player);
    game.authenticate();
  }
  else {
    const game = new Game();
    game.newPlayer();
  }
}


startGame();
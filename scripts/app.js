class Game {
  constructor(name) {
    this.player = name;
    this.score = localStorage.getItem('engagiix-playerScore') || 0;
    this.diamonds = localStorage.getItem('engagiix-playerDiamond') || 0;
    this.policeFine = localStorage.getItem('engagiix-playerFine') || 0;
    this.appElement = document.querySelector('#app');
    this.nav = document.querySelector('#nav');
    this.navButton = document.querySelector('#nav_button_text');
    this.navButtonBar = document.querySelector('#nav_button_bar');
    this.welcomeSection = document.querySelector('#welcome_section');
    this.welcomeContent = document.importNode(this.welcomeSection.content, true);
    this.dashboardSection = document.querySelector('#dashboard_section');
    this.dashboardContent = document.importNode(this.dashboardSection.content, true);
    this.menuSection = document.querySelector('#menu_section');
    this.menuWelcome = document.querySelector('#menu_welcome');
    this.updateName = document.querySelector('#update_info');
    this.showScore = document.querySelector('#player_score');
    this.showDiamonds = document.querySelector('#player_diamonds');
    this.showDiamondsValue = document.querySelector('#player_diamonds_value');
    this.showFine = document.querySelector('#player_fine');
    this.showWallet = document.querySelector('#player_wallet');
  }

  savePlayer(name) {
    localStorage.setItem('engagiix-player', name);
    this.player = name;
  }

  displayGameDetails() {
    const balance = (this.diamonds * 100) - this.policeFine;
    this.showScore.textContent = this.score;
    this.showDiamonds.textContent = this.diamonds;
    this.showDiamondsValue.textContent = `₦${this.diamonds * 100}`;
    this.showFine.textContent = `- ₦${this.policeFine}`;
    this.showWallet.textContent = `₦${balance > 0 ? balance : 0}`;

  }

  gameHandler() {
    // This loads the '/play' url which contains the game index file and game play logic. The rest of the game code was written in JavaScript files within the construct 3 game software.
       
    this.gameButton.addEventListener('click', () => {
      location.assign('./play');
    });
  }

  authenticate() {
    if (this.player) {
      this.displayContent(true);
      this.menuHandler();
      this.gameHandler();
    }
    else {
      this.displayContent(false);
    }
  }

  newPlayer() {
    this.inputForm.addEventListener('submit', event => {
      event.preventDefault();
      const player = this.nameInput.value.trim();
      this.nameInput.value = "";
      if (player.length === 0) {
        alert('Input must not be empty! Kindly enter a valid name.');
      }
      else {
        this.savePlayer(player);
        this.authenticate(); 
      }
    });
  }

  restartApp() {
    localStorage.clear();
    location.reload();
  }

  nameUpdateListener() {
    this.updateName.addEventListener('click', () => {
      const proceed = confirm('Your game progress including scores and diamonds will be cleared. Are you sure you want to proceed?');
      if (proceed) {
        this.restartApp();
      }
      else {
        alert('Action cancelled!');
      }
    });
  }

  clearContent() {
    this.appElement.innerHTML = "";
  }

  displayContent(player) {
    this.clearContent();
    if (player) {
      this.appElement.appendChild(this.dashboardContent);
      this.nav.classList.remove('hide');
      this.welcomeText = document.querySelector('#user_welcome');
      this.welcomeText.textContent = `Hey! ${this.player} ✌🏼`;
      this.gameButton = document.querySelector('#play_game');
    }
    else {
      this.appElement.appendChild(this.welcomeContent);
      this.inputForm = document.querySelector('#start');
      this.nameInput = document.querySelector('#input');
      this.newPlayer();
    }
  }

  menuHandler() {
    this.menuWelcome.textContent = `Hey! ${this.player} ✌🏼`;
    this.nav.addEventListener('click', () => {
      this.menuSection.classList.toggle('app__dashboard--menu-open');
      this.navButton.textContent = this.navButton.textContent === "Game Menu" ? "Close Menu" : "Game Menu";
      this.navButtonBar.classList.toggle('nav__button__bar--close');
    });
    this.displayGameDetails();
    this.nameUpdateListener();
  }
}

const startGame = () => {
  const player = localStorage.getItem('engagiix-player');
  const game = new Game(player);
  game.authenticate();
}

startGame();

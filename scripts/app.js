class Game {
  constructor(name) {
    this.player = name;
    this.score = parseInt(localStorage.getItem('engagiix-playerScore')) || 0;
    this.diamonds = parseInt(localStorage.getItem('engagiix-playerDiamond')) || 0;
    this.policeFine = parseInt(localStorage.getItem('engagiix-playerFine')) || 0;
    this.bonusActivated = localStorage.getItem('bonusActivated');
    this.bonus = 4000;
    this.initialChallenge = 2000;
    this.noBonusText = 'None for now! Play the game to get a bonus code.';
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
    this.showBalance = document.querySelector('#player_balance');
    this.showBonusAmount = document.querySelector('#bonus_amount');
    this.showWallet = document.querySelector('#player_wallet');
  }

  savePlayer(name) {
    localStorage.setItem('engagiix-player', name);
    this.player = name;
  }

  getGameBalance() {
    const balance = (this.diamonds * 100) - this.policeFine;
    if (balance > 0) {
      return balance;
    } 
    return 0;
  }

  displayGameDetails(bonus = 0) {
    if (this.bonusActivated) {
      bonus = this.bonus;
    }
    const balance = this.getGameBalance();
    this.showScore.textContent = this.score;
    this.showDiamonds.textContent = this.diamonds;
    this.showDiamondsValue.textContent = `₦${this.diamonds * 100}`;
    this.showFine.textContent = `- ₦${this.policeFine}`;
    this.showBalance.textContent = `₦${balance}`;
    this.showWallet.textContent = `₦${balance + bonus}`;
    if (bonus > 0) {
      this.showBonusAmount.textContent = ` + ₦${bonus} bonus!`;
    }
  }

  gameHandler() {
    // This loads the '/play' url which contains the game index file and game play logic. The rest of the game code was written in JavaScript files within the construct 3 game software.
       
    this.gameButton.addEventListener('click', () => {
      // remove the current bonus
      localStorage.removeItem('engagiix-gameBonus');
      localStorage.removeItem('bonusActivated');
      // load the game url
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

  // controls how the 'how to play' and 'get bonus' content and button are shown in the view.
  manageDashboardNotice() {
    this.bonusControl.addEventListener('click', event => {
      event.currentTarget.classList.add('hide');
      this.playNotice.classList.add('hide');
      this.bonusNotice.classList.remove('hide');
      this.playControl.classList.remove('hide');
    });

    this.playControl.addEventListener('click', event => {
      event.currentTarget.classList.add('hide');
      this.bonusNotice.classList.add('hide');
      this.playNotice.classList.remove('hide');
      this.bonusControl.classList.remove('hide');
    });
  }

  // checks scores and sets an appropriate challenge for the next game
  gameChallenge() {
    if (this.score < this.initialChallenge) {
      this.bonusChallenge = this.initialChallenge;
      localStorage.setItem('engagiix-bonusChallenge', this.bonusChallenge );
    }
    else {
      this.bonusChallenge = this.score + 900;
      localStorage.setItem('engagiix-bonusChallenge', this.bonusChallenge);
    }
  }

  getBonusCode() {
    const a = Math.random().toString().slice(2,6);
    const b = Math.random().toString().slice(2,5);
    const bonusCode = a + b;
    const gameBonus = { bonusCode, ok: true };
    localStorage.setItem('engagiix-gameBonus', JSON.stringify(gameBonus));
  }

  checkBonusCode() {
    const bonusCode = JSON.parse(localStorage.getItem('engagiix-gameBonus'));
    if (!bonusCode) {
      this.bonusCode = this.noBonusText;
      return;
    }
    if (!bonusCode.ok) {
      this.bonusCode = this.noBonusText;
      return;
    }
    if (bonusCode.ok) {
      this.bonusCode = bonusCode.bonusCode;
    }
  }

  applyBonusCode() {
    const score = localStorage.getItem('engagiix-playerScore');
    const challenge = parseInt(localStorage.getItem('engagiix-bonusChallenge'));
    if (score >= challenge) {
      this.getBonusCode();
    }
    this.checkBonusCode();
  }

  displayContent(player) {
    this.clearContent();
    if (player) {
      this.appElement.appendChild(this.dashboardContent);
      this.applyBonusCode();
      this.gameChallenge();
      this.nav.classList.remove('hide');
      this.welcomeText = document.querySelector('#user_welcome');
      this.gameButton = document.querySelector('#play_game');
      this.playControl = document.querySelector('#play_control');
      this.playNotice = document.querySelector('#play_notice');
      this.bonusControl = document.querySelector('#bonus_control');
      this.bonusNotice = document.querySelector('#bonus_notice');
      this.showChallenge = document.querySelector('#bonus_challenge');
      this.showCode = document.querySelector('#bonus_code');
      this.welcomeText.textContent = `Hey! ${this.player} ✌🏼`;
      this.showChallenge.textContent = this.bonusChallenge;
      this.showCode.textContent = this.bonusCode;
      this.manageDashboardNotice();
      this.bonusHandler();
    }
    else {
      this.appElement.appendChild(this.welcomeContent);
      this.inputForm = document.querySelector('#start');
      this.nameInput = document.querySelector('#input');
      this.newPlayer();
    }
  }

  applyBonusToGame() {
    localStorage.setItem('bonusActivated', true);
    this.bonusActivated = true;
    this.displayGameDetails();
  }

  authenticateBonus(bonusCode) {
    const savedBonus = JSON.parse(localStorage.getItem('engagiix-gameBonus'));
    if (!savedBonus) {
      alert(`You haven't achieved the target score. There's no bonus code for now. Close the menu and tap the "Get Game Bonus" button.`);
      return;
    }
    if (bonusCode.length === 0) {
      alert(`Empty! Enter a valid bonus code. Don't have one? Close the menu and tap the "Get Game Bonus" button.`);
      return;
    }
    if (bonusCode !== savedBonus.bonusCode) {
      alert(`Invalid bonus code entered! Don't have one? Close the menu and tap the "Get Game Bonus" button.`);
      return;
    }
    if (bonusCode === savedBonus.bonusCode) {
      if (savedBonus.ok) {
        this.applyBonusToGame();
        localStorage.setItem('engagiix-gameBonus', JSON.stringify({ bonusCode: savedBonus.bonusCode, ok: false }));
      }
      else {
        alert(`You have already used this bonus code! Keep playing to get another.`);        
      }
    }
  }

  bonusHandler() {
    this.bonusInput = document.querySelector('#bonus_input');
    this.applyButton = document.querySelector('#bonus_button');
    this.applyButton.addEventListener('click', () => {
      const bonusCode = this.bonusInput.value.trim();      
      this.bonusInput.value = "";
      this.authenticateBonus(bonusCode);
    });
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

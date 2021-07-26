const startButton = document.querySelector('#start');

startButton.addEventListener('click', () => {
  console.log('start game')
});

class Player {
  constructor(name) {
    this.name = name;
  }

  getScore() {}
}
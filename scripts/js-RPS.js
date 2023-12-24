let score = JSON.parse(localStorage.getItem('score')) || {
  Wins: 0,
  Losses: 0,
  Ties: 0
};    /*Store the previous data or the default values when the page reloads*/

upadateScoreElement();

let isAutoPlaying = false;
let intervalID;

function autoPlay() {
  if (!isAutoPlaying) {
    document.querySelector('.js-autoplay-button').innerText = "Stop Play";
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
  } else {
    document.querySelector('.js-autoplay-button').innerText = "Auto Play";
    clearInterval(intervalID);
    isAutoPlaying = false;
  }
}

document.querySelector('.js-stone-button').addEventListener('click', () => {
  playGame('Stone');
});

document.querySelector('.js-paper-button').addEventListener('click', () => {
  playGame('Paper');
});

document.querySelector('.js-scissors-button').addEventListener('click', () => {
  playGame('Scissors');
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Stone');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissors');
  }
});

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === 'Stone') {
    if (computerMove === 'Stone') {
      result = 'Tie';
    } else if (computerMove === 'Paper') {
      result = 'You Lost';
    } else if (computerMove === 'Scissors') {
      result = 'You Won';
    }
  }

  else if (playerMove === 'Paper') {
    if (computerMove === 'Stone') {
      result = 'You Won';
    } else if (computerMove === 'Paper') {
      result = 'Tie';
    } else if (computerMove === 'Scissors') {
      result = 'You Lost';
    }
  }

  else if (playerMove === 'Scissors') {
    if (computerMove === 'Stone') {
      result = 'You Lost';
    } else if (computerMove === 'Paper') {
      result = 'You Won';
    } else if (computerMove === 'Scissors') {
      result = 'Tie';
    }
  }

  document.querySelector('.js-result')
    .innerHTML = `${result}`;

  document.querySelector('.js-move')
    .innerHTML = `You
<img src="icons/${playerMove}-emoji.png" class="move-emoji">
<img src="icons/${computerMove}-emoji.png" class="move-emoji">
Computer`;


  if (result === 'You Won') {
    score.Wins += 1;
  } else if (result === 'Tie') {
    score.Ties += 1;
  } else if (result === 'You Lost') {
    score.Losses += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));     /*This storoes the data into the local storage which will prevent the data from getting deleted after reloding the page */

  upadateScoreElement();

}
function upadateScoreElement() {
  document.querySelector('.js-score')
    .innerHTML = `Wins : ${score.Wins}, Losses : ${score.Losses}, Ties : ${score.Ties}`;
}
function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = '';
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Stone';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'Scissors';
  }
  return computerMove;
}

document.querySelector('.js-reset-button').addEventListener('click', () => {
  score.Losses = 0;
  score.Wins = 0;
  score.Ties = 0;
  localStorage.removeItem('score');
  upadateScoreElement();
});

document.querySelector('.js-autoplay-button').addEventListener('click', () => {
  autoPlay();
});


const refreshButton = document.getElementById('refresh-btn');
const roundOutput = document.getElementById('round-output');
const gameUpdates = document.getElementById('output');
const choices = document.querySelectorAll('.choice-button');
const playerScoreOutput = document.getElementById('player-score');
const computerScoreOutput = document.getElementById('computer-score');
const scores = document.querySelectorAll('.score-num');
const choiceSound = document.getElementById('choice-sound');
const atmosphereSound = document.getElementById('atmosphere-sound');
const playerWinSound = document.getElementById('player-win-sound');
const computerWinSound = document.getElementById('computer-win-sound');
const gameRestartSound = document.getElementById('game-restart-sound');
const roundElem = document.getElementById('round-elem');
const niHonGoGaHaNaSeMaSu = document.getElementById('result-text-jp');
const instructions = document.getElementById('instructions');

let round = 1;
let playerScore = 0;
let computerScore = 0;
let computerChoices = [{ choice: 'Rock', value: 0 }, { choice: 'Paper', value: 1 }, { choice: 'scissors', value: 2 }];

window.onload = gameRestartSound.play();

const choicesParent = document.getElementById('choices');
choicesParent.addEventListener('mousemove', (e) => {
  let iLoveJapan = document.getElementsByClassName('i-love-japan');

  for (let i = 0; i < iLoveJapan.length; ++i) {
    iLoveJapan[i].style.color = `rgb(${e.offsetX}, ${e.offsetY}, 155)`;
    iLoveJapan[i].style.textShadow = `0 0 10px rgb(${e.offsetX}, ${e.offsetY}, 155)`;
  }  
});

function getComputerChoice() {
  return computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

let updateWinner = () => {
  if (playerScore === 5) {
    playerWinSound.play();
    niHonGoGaHaNaSeMaSu.textContent = 'あなたは勝つのだ ٩(｡•́‿•̀｡)۶';
    gameUpdates.textContent = 'YOU WIN! 🏆'
    gameUpdates.classList.add('game-over');
    gameUpdates.style.color = 'chartreuse';
    playerScoreOutput.classList.add('winner');
  } else {
    computerWinSound.play();
    niHonGoGaHaNaSeMaSu.textContent = 'お前の負けだ (っ˘̩╭╮˘̩)っ';
    gameUpdates.textContent = 'YOU LOSE! 😤';
    gameUpdates.classList.add('game-over');
    gameUpdates.style.color = '#E91113';
    computerScoreOutput.classList.add('winner');
  }
}
  
function checkWinner() {
  if (playerScore === 5 || computerScore === 5) {
    updateWinner();

    let labels = document.querySelectorAll('label');

    roundElem.textContent = 'GAME OVER';
    roundElem.classList.add('game-over');
    roundElem.classList.add('no-select');
    choices.forEach(choice => {
      choice.classList.add('no-select');
      choice.style.pointerEvents = 'none';
      choice.style.opacity = 0.33;
      choice.removeEventListener('click', playRound);
    });

    instructions.style.visibility = "hidden";

    for (let i = 0; i < labels.length; ++i) {
      labels[i].style.visibility = 'hidden';
    }
  }
} 

function updateScoreColor() {
  for (let i = 0; i < scores.length; ++i) {
    switch (true) {
      case scores[i].textContent === '1':
        scores[i].style.color = '#e73c10';
        break;
      case scores[i].textContent === '2':
        scores[i].style.color = '#e5630d';
        break;
      case scores[i].textContent === '3':
        scores[i].style.color = '#e39a08';
        break;
      case scores[i].textContent === '4':
        scores[i].style.color = '#e1cd04';
        break;
      case scores[i].textContent === '5':
        scores[i].style.color = '#7fff00';
        break;
      default:
        scores[i].style.color = '#e91113';
    }
  }
}

function playRound(e) {
  let computerChoice = getComputerChoice(e);
  let playerValue = e.target.id;
  let playerChoice = e.target.getAttribute('value');
  
  let roundWinCombo = `${playerValue}-${computerChoice.value}`;
  let playerWinCombo = ['0-2', '1-0', '2-1'];

  choiceSound.currentTime = 0;
  choiceSound.play();

  if (+playerValue === computerChoice.value) {
    gameUpdates.textContent = `You both chose ${playerChoice.toLowerCase()}!`;
  } else if (playerWinCombo.includes(roundWinCombo)) {
    scores[0].textContent = `${++playerScore}`;
    scores[0].classList.add('hvr-pop');
    scores[0].addEventListener('animationend', (e) => e.target.classList.remove('hvr-pop'));
    gameUpdates.textContent = ` You win, ${playerChoice.toLowerCase()} beats ${computerChoice.choice.toLowerCase()}!`;
  } else {
    scores[1].textContent = `${++computerScore}`;
    scores[1].classList.add('hvr-pop');
    scores[1].addEventListener('animationend', (e) => e.target.classList.remove('hvr-pop'));
    gameUpdates.textContent = ` You lose, ${computerChoice.choice.toLowerCase()} beats ${playerChoice.toLowerCase()}!`;
  }

  updateScoreColor();
  roundOutput.textContent = ++round;
  roundElem.style.animation = 'blink 380ms ease-in-out';
  roundElem.addEventListener('animationend', () => roundElem.style.removeProperty('animation'));

  checkWinner();
}

choices.forEach(choice => choice.addEventListener('click', playRound));
refreshButton.addEventListener('click', () => window.location.reload());
roundOutput.textContent = 1;
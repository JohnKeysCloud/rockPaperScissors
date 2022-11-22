const choices = document.querySelectorAll('.choice-button');
const choicesImages = document.querySelectorAll(".choice-images");
const choicesParent = document.getElementById('choices');
const computerScoreOutput = document.getElementById('computer-score');
const computerPointSound = document.getElementById('computer-point');
const computerWinSound = document.getElementById('computer-win-sound');
const gameRestartSound = document.getElementById('game-restart-sound');
const gameUpdates = document.getElementById('output');
const instructions = document.getElementById('instructions');
const niHonGoGaHaNaSeMaSu = document.getElementById('result-text-jp');
const playerPointSound = document.getElementById('player-point');
const playerScoreOutput = document.getElementById('player-score');
const playerWinSound = document.getElementById('player-win-sound');
const refreshButton = document.getElementById('refresh-btn');
const root = document.documentElement;
const roundElem = document.getElementById('round-elem');
const roundOutput = document.getElementById('round-output');
const scores = document.querySelectorAll('.score-num');
const tieSound = document.getElementById('tie-sound');

let round = 1;
let playerScore = 0;
let computerScore = 0;
let computerChoices = [{ choice: 'Rock', value: 0 }, { choice: 'Paper', value: 1 }, { choice: 'scissors', value: 2 }];

window.onload = gameRestartSound.play();  

function updateWinner() {
  if (playerScore === 5) {
    playerWinSound.play();
    niHonGoGaHaNaSeMaSu.textContent = 'あなたは勝つのだ ٩(｡•́‿•̀｡)۶';
    gameUpdates.textContent = 'YOU WIN! 🏆'
    gameUpdates.classList.add('game-over');
    gameUpdates.style.color = 'var(--color-funky)';
    playerScoreOutput.classList.add('winner');
  } else {
    computerWinSound.play();
    niHonGoGaHaNaSeMaSu.textContent = 'お前の負けだ (っ˘̩╭╮˘̩)っ';
    gameUpdates.textContent = 'YOU LOSE! 😤';
    gameUpdates.classList.add('game-over');
    gameUpdates.style.color = 'var(--color-blinky)';
    computerScoreOutput.classList.add('winner');
  }
}
  
function checkWinner() {
  if (playerScore === 5 || computerScore === 5) {
    
    let labels = document.querySelectorAll('label');
    for (let i = 0; i < labels.length; ++i) {
      labels[i].style.visibility = 'hidden';
    }

    roundElem.textContent = 'GAME OVER';
    roundElem.classList.add('game-over');
    roundElem.classList.add('no-select');
    choices.forEach(choice => {
      choice.classList.add('no-select');
      choice.style.pointerEvents = 'none';
      choice.style.opacity = 0.33;
      choice.removeEventListener('click', playRound);
    });

    instructions.style.visibility = 'hidden';
    
    updateWinner();
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

function getComputerChoice() {
  return computerChoices[Math.floor(Math.random() * computerChoices.length)];
}

function playRound(e) {
  let computerChoice = getComputerChoice(e);
  let playerChoice = e.target.getAttribute('value');
  let playerValue = e.target.id;
  let playerChoiceElem = e.target;
  
  let roundWinCombo = `${playerValue}-${computerChoice.value}`;
  let playerWinCombo = ['0-2', '1-0', '2-1'];

  choices.forEach(choice => {
    if (computerChoice.value !== +choice.id) return;
      
    if (computerChoice.choice.toLowerCase() === playerChoice.toLowerCase()) {
      choice.firstElementChild.classList.add('cpu-vis-feedback-tie');
      choice.firstElementChild.addEventListener('animationend', () =>
        choice.firstElementChild.classList.remove('cpu-vis-feedback-tie')
      );
    } else {
      choice.firstElementChild.classList.add('cpu-vis-feedback-dif');
      choice.firstElementChild.addEventListener('animationend', () =>
        choice.firstElementChild.classList.remove('cpu-vis-feedback-dif')
      );
    }
  });

  if (+playerValue === computerChoice.value) {
    gameUpdates.textContent = `You both chose ${playerChoice.toLowerCase()}!`;

    root.style.setProperty("--color-cpu-vis-feedback", "var(--color-filter-default)");

    choices.forEach(choice => {
      if (choice.id === playerValue) {
        choice.classList.add('tie-pseudo-filter');
        choice.addEventListener('animationend', () => choice.classList.remove('tie-pseudo-filter'));
      }
    });

    tieSound.currentTime = 0;
    tieSound.play();

  } else if (playerWinCombo.includes(roundWinCombo)) {
    scores[0].textContent = `${++playerScore}`;
    scores[0].classList.add('hvr-pop');
    scores[0].addEventListener('animationend', (e) => e.target.classList.remove('hvr-pop'));
    gameUpdates.textContent = ` You win, ${playerChoice.toLowerCase()} beats ${computerChoice.choice.toLowerCase()}!`;
    
    root.style.setProperty("--color-cpu-vis-feedback", "var(--color-blinky)");

    playerChoiceElem.firstElementChild.classList.add('player-win');
    playerChoiceElem.firstElementChild.addEventListener('animationend', () => playerChoiceElem.firstElementChild.classList.remove('player-win'));

    choices.forEach(choice => {
      if (choice.id === playerValue) {
        choice.classList.add('win-scale-animation');
        choice.addEventListener('animationend', () => choice.classList.remove('win-scale-animation'));
      }
    });
  
    playerPointSound.currentTime = 0;
    playerPointSound.play();
    
  } else {
    scores[1].textContent = `${++computerScore}`;
    scores[1].classList.add('hvr-pop');
    scores[1].addEventListener('animationend', (e) => e.target.classList.remove('hvr-pop'));
    gameUpdates.textContent = ` You lose, ${computerChoice.choice.toLowerCase()} beats ${playerChoice.toLowerCase()}!`;
    
    root.style.setProperty("--color-cpu-vis-feedback", "var(--color-funky)");

    playerChoiceElem.firstElementChild.classList.add('player-lose');
    playerChoiceElem.firstElementChild.addEventListener('animationend', () => playerChoiceElem.firstElementChild.classList.remove('player-lose'));

    choices.forEach(choice => {
      if (+choice.id === computerChoice.value) {
        console.log(+choice.id, computerChoice.value)
        choice.classList.add('win-scale-animation');
        choice.addEventListener('animationend', () => choice.classList.remove('win-scale-animation'));
      }
    });

    computerPointSound.currentTime = 0;
    computerPointSound.play();
  }

  roundOutput.textContent = ++round;
  gameUpdates.classList.add('updateAnimation');
  gameUpdates.addEventListener('animationend', () => gameUpdates.classList.remove('updateAnimation'));
  roundElem.style.animation = 'blink 380ms ease-in-out';
  roundElem.addEventListener('animationend', () => roundElem.style.removeProperty('animation'));
  
  updateScoreColor();
  checkWinner();
}

function jpTextColorChange(e) {
  let iLoveJapan = document.getElementsByClassName('i-love-japan');

  for (let i = 0; i < iLoveJapan.length; ++i) {
    iLoveJapan[i].style.color = `rgb(${e.offsetX}, ${e.offsetY}, 155)`;
    iLoveJapan[
      i
    ].style.textShadow = `0 0 10px rgb(${e.offsetX}, ${e.offsetY}, 155)`;
  }
}

choicesParent.addEventListener('mousemove', jpTextColorChange);
choices.forEach(choice => choice.addEventListener('click', playRound));
refreshButton.addEventListener('click', () => window.location.reload());
roundOutput.textContent = 1;
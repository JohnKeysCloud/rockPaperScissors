let playerScore = 0;
let compScore = 0;
let roundNum = 0;

const getComputerChoice = () => {
  const arrOfChoices = ['rock', 'paper', 'scissors'];
  const randomNum = Math.floor(Math.random() * arrOfChoices.length); // returns 0, 1 , or 2

  return arrOfChoices[randomNum];
};

const playRound = (playerChoice, computerChoice) => {
  console.log(
    `playerChoice: ${playerChoice} | computerChoice: ${computerChoice}`
  );

  switch (true) {
    case playerChoice === computerChoice:
      roundNum++
      return `Round ${roundNum}: You tied! You both picked ${computerChoice}!`;
    case playerChoice === 'rock' && computerChoice === 'paper':
    case playerChoice === 'paper' && computerChoice === 'scissors':
    case playerChoice === 'scissors' && computerChoice === 'rock':
      roundNum++;
      compScore++;
      return `Round ${roundNum}: You lost! ${computerChoice} beats ${playerChoice}!`;

    case computerChoice === 'rock' && playerChoice === 'paper':
    case computerChoice === 'paper' && playerChoice === 'scissors':
    case computerChoice === 'scissors' && playerChoice === 'rock':
      roundNum++;
      playerScore++;
      return `Round ${roundNum}: You won! ${playerChoice} beats ${computerChoice}!`;
    default:
      roundNum++;
      compScore++;
      return `Round ${roundNum}:  Error Code 1: You failed to enter one of the choices available, computer gets one point 😤`;
  }
};

const game = () => {
  for (let i = 0; i < 5; i++) {

    let playerChoice = prompt('Rock, Paper, or Scissors?', '')
    if (playerChoice === null || playerChoice === '') {
      playerChoice = 'CANCELED';
    }

    const computerChoice = getComputerChoice();

    console.log(playRound(playerChoice, computerChoice));
  }

  if (playerScore === compScore) {
    return `FINAL SCORE: You tied ${playerScore}-${compScore}!`;
  } else if (playerScore > compScore) {
    return `FINAL SCORE:You won ${playerScore}-${compScore}!`;
  } else if (playerScore < compScore) {
    return `FINAL SCORE: You lost ${playerScore}-${compScore}!`;
  } else {
    return 'Error Code 2: Something went terribly wrong';
  }
};

console.log(game());
let playerSelection;
let computerSelection;
let computerScore = 0;
let playerScore = 0;

function getPlayerSelection(playerSelection) {
  playerSelection = prompt("Enter Rock, Paper, or Scissors");
  playerSelection = (playerSelection || "").toLowerCase();

  return playerSelection;
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getComputerSelection(computerSelection) {
  
  computerSelection = getRandomInt(3);
  
  if (computerSelection === 0) {
    computerSelection = "rock";
  } else if (computerSelection === 1) {
    computerSelection = "paper";
  } else if (computerSelection === 2) {
    computerSelection = "scissors";
  }
  
  return computerSelection;
}

function playRound(playerSelection, computerSelection) {
  playerSelection = getPlayerSelection();
  computerSelection = getComputerSelection();
  
  switch (true) {
    case playerSelection !== "rock" &&
      playerSelection !== "paper" &&
      playerSelection !== "scissors":
      console.log("You didn't enter rock, paper or scissors.");
      break;
    
    case computerSelection === playerSelection:
      console.log(
        `You tied! You both chose ${playerSelection}!`
      );
      break;
    
    case computerSelection === "rock" && playerSelection === "scissors":
    case computerSelection === "paper" && playerSelection === "rock":
    case computerSelection === "scissors" && playerSelection === "paper":
      computerScore++;
      console.log(
        `You lose! ${computerSelection} beats ${playerSelection}!`
      );
      break;
    
    default:
      playerScore++;
      console.log(
        `You Win! ${playerSelection} beats ${computerSelection}!`
      );
  }
}

function game() {
  for (let i = 0; i < 5; i++) {
    playRound();
  }

  if (computerScore === playerScore) {
    console.log(`GAME OVER, You tied ${computerScore} to ${playerScore}!`);
  } else if (computerScore > playerScore) {
    console.log(`GAME OVER, You lost ${computerScore} to ${playerScore}!`)
  } else {
    console.log(`GAME OVER, You win ${playerScore} to ${computerScore}!`);
  }
}

// game()
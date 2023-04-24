'use strict';

const assert = require('assert');
const colors = require('colors');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let board = [];
let solution = '';
let letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

const printBoard = () =>  {
  for (let i = 0; i < board.length; i++) {
    console.log(board[i]);
  }
}

const generateSolution = () =>  {
  for (let i = 0; i < 4; i++) {
    const randomIndex = getRandomInt(0, letters.length);
    solution += letters[randomIndex];
  }
}

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
}

const generateHint = (guess) =>  {
  const guessArray = guess.split('');
  const solutionArray = solution.split('');
  let correctLetterLocations = 0;

  for (let i=0; i < solutionArray.length; i++) {
    if (solutionArray[i] === guessArray[i]) {
      correctLetterLocations++; 
      solutionArray[i] = null;
    }
  }

  let correctLetters = 0;
  for (let j=0; j < solutionArray.length; j++) {
    let targetIndex =  solutionArray.indexOf(guessArray[j]);
    if (targetIndex > -1) {
      correctLetters++;
      solutionArray[targetIndex] = null;
    }
  }

  console.log(String(correctLetterLocations).green + '-' + String(correctLetters).yellow);
  return `${correctLetterLocations}-${correctLetters}`;
}

const mastermind = (guess) => {
  console.log(solution)
  if (guess === solution) {
    console.log('You guessed it!');
    return 'You guessed it!';
  }
  else {
    const hint = generateHint(guess);
    board.push(`${guess}: ${hint}`);
    
    if (board.length === 10) {
      console.log('You ran out of turns! Ya Fool!');
      return;
    }
    else {
      console.log('Guess again. Ya Fool!')
    }
  }
}

const getPrompt = () =>  {
  rl.question('guess: ', (guess) => {
    mastermind(guess);
    printBoard();
    getPrompt();
  });
}

// Tests

if (typeof describe === 'function') {
  solution = 'abcd';
  describe('#mastermind()', () => {
    it('should register a guess and generate hints', () => {
      mastermind('aabb');
      assert.equal(board.length, 1);
    });
    it('should be able to detect a win', () => {
      assert.equal(mastermind(solution), 'You guessed it!');
    });
  });

  describe('#generateHint()', () => {
    it('should generate hints', () => {
      assert.equal(generateHint('abdc'), '2-2');
    });
    it('should generate hints if solution has duplicates', () => {
      assert.equal(generateHint('aabb'), '1-1');
    });

  });

} else {

  generateSolution();
  getPrompt();
}
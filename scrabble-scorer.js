// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = 0;
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += Number(pointValue);
		 }
 
	  }
	}
	return letterPoints;
 };

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   let word = input.question("Let's play some scrabble! Please enter a word: ");
   return word
};

let simpleScorer = function(word) {
   word = word.toUpperCase();
   let letterPoints = 0;

for (let i = 0; i < word.length; i++) {
   letterPoints++;
}
return letterPoints;
};

let vowelBonusScorer = function (word) {
   word = word.toUpperCase();
   let letterPoints = 0;

   for (let i = 0; i < word.length; i++) {
      if ('AEIOU'.includes(word[i])) {
         letterPoints += 3;
      } else {
         letterPoints += 1;
      }
      }
      return letterPoints;
   };

   function transform() {
      let newPointStructure = {};
      for (let pointValue in oldPointStructure) {
        let letters = oldPointStructure[pointValue];
        for (let i = 0; i < letters.length; i++) {
          newPointStructure[letters[i].toLowerCase()] = Number(pointValue);
        }
      }
      return newPointStructure;
    }
    
let newPointStructure = transform();
   
function scrabbleScorer(word) {
   word = word.toLowerCase();
   let letterPoints = 0;
 
   for (let i = 0; i < word.length; i++) {
     const letter = word[i];
     if (newPointStructure.hasOwnProperty(letter)) {
       letterPoints += newPointStructure[letter];
     } else {
      console.log(`Letter ${letter} not found in newPointStructure.`);
     }
     }
   return letterPoints;
}
 

const scoringAlgorithms = [
   {
      name: "Simple Score",
      description: "Each letter is worth 1 point.",
      scorerFunction: simpleScorer
   },
   {
      name: "Bonus Vowels",
      description: "Vowels are worth 3 points, consonants are worth 1 point.",
      scorerFunction: vowelBonusScorer
   },
   {
      name: "Scrabble",
      description: "The traditional scoring algorithm.",
      scorerFunction: scrabbleScorer
   }
];

function scorerPrompt() {
   console.log("Scoring Algorithms:");
  for (let i = 0; i < scoringAlgorithms.length; i++) {
    console.log(`${i} - ${scoringAlgorithms[i].name}: ${scoringAlgorithms[i].description}`);
  }

  const selectedAlgorithm = input.question("Enter the number of the scoring algorithm you want to use: ");

  if (selectedAlgorithm >= 0 && selectedAlgorithm < scoringAlgorithms.length) {
    return scoringAlgorithms[selectedAlgorithm];
  } else {
    console.log("Invalid selection. Using the default algorithm.");
    return scoringAlgorithms[0];
  }
}

function runProgram() {
   const word = initialPrompt();
   const selectedAlgorithm = scorerPrompt();
   const score = selectedAlgorithm.scorerFunction(word);
 
   console.log(`Score for '${word}': ${score}`);
 }


// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

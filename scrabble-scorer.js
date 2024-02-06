// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");
const scoringAlg = require("./scoring-algorithm.js")
const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word ='') {
   if(word.length > 0)
   {
	   word = word.toUpperCase();
	   let letterPoints = "";
 
	   for (let i = 0; i < word.length; i++) {
 
	      for (const pointValue in oldPointStructure) {
 
		      if (oldPointStructure[pointValue].includes(word[i])) {
			   letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		      }
 
	      }
	   }
      return letterPoints;
   }
	
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {

   let userWord = input.question("Let's play some scrabble!\n\nEnter a word to score: ");
   while (userWord === '' || isNaN(userWord) === false){
      console.log("!!! Incorrect word, Please enter a valid word !!");
      userWord = input.question("Let's play some scrabble! Enter a word: ");
   }

   return userWord
};

let simpleScorer = scoringAlg.simpleScorer;
let vowelBonusScorer =scoringAlg.vowelBonusScorer;


let scrabbleScorer = (word='') =>{
   let score = 0;
   word = word.toLowerCase();
   for (letter of word){
      // for(point of Object.entries(newPointStructure)){
      //      const [key,value] = point;
      //      key === letter ? score += value : score
      // }
      for(point in newPointStructure)
      {
         point === letter ? score += newPointStructure[point] : score
      }
   }
   
   return score
 }

const scoringAlgorithms = [{

   name:"Simple Score",
   description:"Each letter is worth 1 point.",
   scorerFunction: simpleScorer},{

   name:"Bonus Vowels",
   description:"Vowels are 3 pts, consonants are 1 pt.",
   scorerFunction: vowelBonusScorer},{

   name:"Scrabble",
   description:"The traditional scoring algorithm.",
   scorerFunction: scrabbleScorer

}];

function scorerPrompt() {
   console.log("Which scoring algorithm would you like to use?\n");

   for(algorithm of scoringAlgorithms){
      console.log(`${scoringAlgorithms.indexOf(algorithm)} - ${algorithm.name}: ${algorithm.description}`);
   }

   let selectedAlgByUser = input.question("\nEnter 0, 1, or 2: ");

   while(parseInt(selectedAlgByUser) > scoringAlgorithms.length || isNaN(selectedAlgByUser) === true){
      console.log("\n!!! Invalid input:Please enter 0, 1, or 2 !!!\n");
      selectedAlgByUser = input.question("Enter 0, 1, or 2: ");
   }

   return selectedAlgByUser;

}

function transform(oldPointsTable) {
   const newArrOfObj = {};
   for(pointsLevel in oldPointsTable){
      for(letter of oldPointsTable[pointsLevel]){
         //Object.assign(newArrOfObj,{[letter.toLowerCase()]:parseInt(pointsLevel)})
         let lowerCaseLetter = letter.toLowerCase();
         newArrOfObj[lowerCaseLetter] = parseInt(pointsLevel) 
      }
   };

   //const sortedObj = object => Object.keys(object).sort().reduce((acc, key) => (acc[key] = object[key], acc), {});   
   
   const sortedArr = Object.entries(newArrOfObj).sort();
   const sortedObj = sortedArr.reduce((newObj,el)=>(newObj[el[0]] = el[1],newObj),{})
   console.log(sortedObj,"sorted array")
   return sortedObj
   //return newArrOfObj//sortedObj(newArrOfObj);

};

let newPointStructure = transform(oldPointStructure);

function runProgram() {
   let word = initialPrompt();
   let x = scorerPrompt();
   console.log(`Score for '${word}': ${scoringAlgorithms[x].scorerFunction(word)}`)
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

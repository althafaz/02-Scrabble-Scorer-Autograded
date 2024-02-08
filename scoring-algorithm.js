

//Define a function that takes a word as a parameter and returns a numerical score...
let simpleScorer = (word='')=>{
    return parseInt(word.length);
 };

//Define a function that takes a word as a parameter and returns a score. 
 let vowelBonusScorer = (word='')=>{
    const vowel = ['a', 'e', 'i', 'o', 'u'];
    let score = 0;
    word = word.toLowerCase();
    for (letter of word) {
        vowel.includes(letter) ? score += 3 : score += 1;
    }
    return score;
 }


 //New scrabble scorrer function using new point strucure
//  let scrabbleScorer = (word='',newPointSystem) =>{
//     let score = 0;
//     word = word.toLowerCase();
//     for (letter of word){
//        for(point of Object.entries(newPointSystem)){
//             const [key,value] = point;
//             key === letter ? score += value : score
//        }
//     }
    
//     return score
//   }

//console.log(vowelBonusScorer("foo"))
module.exports = {
    simpleScorer: simpleScorer,
    vowelBonusScorer: vowelBonusScorer,
    //scrabbleScorer: scrabbleScorer
}

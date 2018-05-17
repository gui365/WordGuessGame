var hangman = {
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    // An array of possible secret words
    words: ['COMPUTER', 'FRIEND', 'SUMMER', 'CATAPULT', 'REQUEST', 'ARMADILLO', 'LIGHTHOUSE'],
    // Number of wrong guesses
    lives: 10,
    // Keys pressed by the user
    pickedLetters: [],
    // This function randomly picks a word from the "words" array
    hideWord: function(){
        var secretWord = this.words[Math.floor(Math.random() * this.words.length)];
        for (let i = 0; i < secretWord.length + 1; i++) {
            document.getElementById("secret-word").innerHTML = "_ ".repeat(i);
            console.log(secretWord);
        } 
    },
    selectedLetter: function(event) {
        for (let i = 0; i < hangman.letters.length; i++) {
            if (event.key.toUpperCase() === hangman.letters[i]) {
                hangman.pickedLetters.push(event.key.toUpperCase());
                console.log(hangman.pickedLetters);    
            }
        }
    },
};

document.addEventListener("keyup", hangman.selectedLetter);

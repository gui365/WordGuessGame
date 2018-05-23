var hangman = {
    // I am absolutely sure there is a better way to do this...
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    // An array of possible secret words
    words: ['COMPUTER', 'FRIEND', 'SUMMER', 'CATAPULT', 'REQUEST', 'ARMADILLO', 'LIGHTHOUSE', 'MOTHER', 'BABOON', 'JAZZ', 'CONCERT', 'DETOX', 'STRAWBERRY'],
    secretWord: "",
    // Number of wrong guesses
    lives: 10,
    // All keys pressed by the user
    allLetters: [],
    // Non-repeated keys pressed by the user that are in the secret word
    rightLetters: [],
    // Non-repeated keys pressed by the user that are NOT part of the secret word
    wrongLetters: [],
    
    // This method randomly picks a word from the "words" array and "hides" its characters
    hideWord: function(){
        this.secretWord = this.words[Math.floor(Math.random() * this.words.length)];
        for (var i = 0; i < this.secretWord.length + 1; i++) {
            document.getElementById("secret-word").innerHTML = "_ ".repeat(i);
            console.log(this.secretWord);
        } 
    },

    // This method will validate the key pressed and add it to the corresponding prop (right or wrong)
    validateKey: function(event) {
        var pressedKey = event.key.toUpperCase();
        
        // This loop checks that the key pressed is a letter
        for (var i = 0; i < hangman.letters.length; i++) {
            if (pressedKey === hangman.letters[i] && hangman.allLetters.indexOf(pressedKey) === -1) {
                hangman.allLetters.push(pressedKey);
                rightOrWrong();
            }
        };

        // A nested function will check if the letter is part of the secret word
        function rightOrWrong() {
            for (let j = 0; j < hangman.secretWord.length; j++) {
                if (pressedKey === hangman.secretWord[j] && hangman.rightLetters.indexOf(pressedKey) === -1) {
                    hangman.rightLetters.push(pressedKey);
                    if (true) {
                        break;
                    }
                } else if (pressedKey !== hangman.secretWord[j] && hangman.allLetters.indexOf(pressedKey) === -1) {
                    hangman.wrongLetters.push(pressedKey);
                    document.getElementById("picked-letters").textContent = hangman.wrongLetters.join(" ");
                    // if (true) {
                    //     break;
                    // }
                }
            }
        };
        
        console.log("Wrong: " + hangman.wrongLetters);
        console.log("Right: " + hangman.rightLetters);
        console.log("All: " + hangman.allLetters);
        
    }
};

document.addEventListener("keyup", hangman.validateKey);
hangman.hideWord();

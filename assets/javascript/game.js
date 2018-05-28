var hangman = {
    // Valid entries
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
              'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
              'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    // An array of possible secret words
    words: ['ARGENTINA', 'BRAZIL', 'CHAMPION', 'GOAL', 'REFEREE', 'SOCCER',
    'MATCH BALL', 'FAIR PLAY', 'OFFSIDE', 'SIDELINE', 'SUBSTITUTION', 'INJURY', 'FREE KICK',
    'PENALTY KICK', 'CORNER FLAG', 'GERMANY', 'BELGIUM', 'RED CARD', 'YELLOW CARD', 'FINAL',
    'RUSSIA', 'TROPHY', 'SHINGUARDS', 'CLEATS', 'TOURNAMENT', 'GLORY',
    'STADIUM', 'GROUP STAGE', 'SPAIN', 'ENGLAND', 'FRANCE'],
    secretWord: "",
    hiddenWord: [],
    // Number of wrong guesses
    lives: 10,
    // Number of consecutive wins
    wins: 0,
    // Letters that are part of the secret word
    rightLetters: [],
    // All non-repeated letters pressed by the user
    wrongLetters: [],
    
    // This method randomly picks a word from the "words", "hides" its characters and creates an array of right letters
    hideWord: function(){
        this.secretWord = this.words[Math.floor(Math.random() * this.words.length)];
        for (var i = 0; i < this.secretWord.length; i++) {
            if (this.secretWord[i] === " ") {
                this.hiddenWord.push("&nbsp;");    
            } else {
                this.hiddenWord.push("_");
            }
        };
        // console.log(this.secretWord);
        // console.log(this.hiddenWord);

        for (let j = 0; j < this.secretWord.length; j++) {
            this.rightLetters.push(this.secretWord[j]);
        };
        // console.log(this.rightLetters);
        document.getElementById("secret-word").innerHTML = hangman.hiddenWord.join(" ");
    },

    // This method will check if the key pressed is a valid key and if it is part of the secret word
    validateKey: function(event) {
        var pressedKey = event.key.toUpperCase();
        var letterScore = 0;
        
        // This loop first checks that the key pressed is a letter
        for (var i = 0; i < hangman.letters.length; i++) {
            if (pressedKey === hangman.letters[i] && hangman.wrongLetters.indexOf(pressedKey) === -1) {
                // This loop then checks if the letter pressed by the user is in the secret word
                // console.log(hangman.hiddenWord);
                for (let h = 0; h < hangman.rightLetters.length; h++) {
                    if (pressedKey === hangman.rightLetters[h]) {
                        letterScore += 1;
                        // console.log("I'm in the word!");
                        // PUSH LETTER TO HIDDEN WORD USING h POSITION
                        this.hiddenWord = hangman.hiddenWord.splice(h, 1, hangman.rightLetters[h]);
                        // console.log(h);
                        // console.log(this.hiddenWord);
                    };
                };
                document.getElementById("secret-word").innerHTML = hangman.hiddenWord.join(" ");
                
                // If the letter is not in the word it'll have a score of 0, and will be pushed to the wrongLetters array
                if (letterScore < 1) {
                    hangman.wrongLetters.push(pressedKey);
                    document.getElementById("picked-letters").textContent = hangman.wrongLetters.join(" ");
                    hangman.lives -=1;
                    if (hangman.lives <= 0) {
                        document.getElementById("game-result").textContent = "Game over! The secret word was: " + hangman.secretWord;
                        setTimeout(() => {
                            location.reload();
                        }, 4000);
                        document.removeEventListener("keyup",hangman.validateKey);
                    }
                    document.getElementById("lives-left").textContent = "Lives left: " + hangman.lives;
                }
            };
        };
        // console.log("Right: " + hangman.rightLetters);
        // console.log("Wrong: " + hangman.wrongLetters);
        // console.log("Lives: " + hangman.lives);
        hangman.winnerListener();
    },

    // This function determines if the player has won
    winnerListener: function() {
        if (!this.hiddenWord.includes("_")) {
            document.getElementById("sound").volume = 0.2;
            document.getElementById("sound").play();
            document.getElementById("game-result").textContent = "You win!";
            hangman.wins++;
            document.getElementById("wins").textContent = "Wins: " + hangman.wins;
            setTimeout(hangman.gameReset, 3000);
        };
    },

    // This function resets the game after the player has won
    gameReset: function() {
        document.getElementById("game-result").textContent = "";
        document.getElementById("secret-word").innerHTML = "";
        document.getElementById("picked-letters").innerHTML = "";
        hangman.lives = 10;
        document.getElementById("lives-left").textContent = "Lives left: " + hangman.lives;
        hangman.secretWord = "";
        hangman.hiddenWord = [];
        hangman.rightLetters = [];
        hangman.wrongLetters = [];
        hangman.hideWord();
    }
};

document.addEventListener("keyup", hangman.validateKey);
hangman.hideWord();
document.getElementById("lives-left").textContent = "Lives left: " + hangman.lives;
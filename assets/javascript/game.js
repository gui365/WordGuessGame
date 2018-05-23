// 46, 63, 

var hangman = {
    // I am absolutely sure there is a better way to do this...
    letters: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I',
              'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
              'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    // An array of possible secret words
    words: ['COMPUTER', 'FRIEND', 'SUMMER', 'CATAPULT', 'REQUEST', 'ARMADILLO',
    'LIGHTHOUSE', 'MOTHER', 'BABOON', 'JAZZ', 'CONCERT', 'DETOX', 'STRAWBERRY',
    'TABLE', 'CLOWN', 'EXCELLENT', 'PARAGRAPH', 'INTENTION', 'LAUNDRY', 'TRAFFIC',
    'LOCATION', 'HOSPITAL', 'ENTERTAIN', 'CATERPILLAR', 'BUTTERFLY', 'CROISSANT',
    'ASPARAGUS', 'THOUSAND', 'ISLAND', 'HOLOGRAM', 'PARACHUTE'],
    secretWord: "",
    hiddenWord: [],
    // Number of wrong guesses
    lives: 10,
    // Letters that are part of the secret word
    rightLetters: [],
    // All non-repeated letters pressed by the user
    wrongLetters: [],
    
    // This method randomly picks a word from the "words", "hides" its characters and creates an array of right letters
    hideWord: function(){
        this.secretWord = this.words[Math.floor(Math.random() * this.words.length)];
        for (var i = 1; i < this.secretWord.length + 1; i++) {
            this.hiddenWord.push("_");
        };
        console.log(this.secretWord);
        console.log(this.hiddenWord);

        for (let j = 0; j < this.secretWord.length; j++) {
            this.rightLetters.push(this.secretWord[j]);
        };
        // console.log(this.rightLetters);
    },

    // This method will check if the key pressed is a valid key and if it is part of the secret word
    validateKey: function(event) {
        var pressedKey = event.key.toUpperCase();
        var letterScore = 0;
        
        // This loop first checks that the key pressed is a letter
        for (var i = 0; i < hangman.letters.length; i++) {
            if (pressedKey === hangman.letters[i] && hangman.wrongLetters.indexOf(pressedKey) === -1) {
                // This loop then checks if the letter pressed by the user is in the secret word
                console.log(hangman.hiddenWord);
                for (let h = 0; h < hangman.rightLetters.length; h++) {
                    if (pressedKey === hangman.rightLetters[h]) {
                        letterScore += 1;
                        console.log("I'm in the word!");
                        // PUSH LETTER TO HIDDEN WORD USING h POSITION
                        this.hiddenWord = hangman.hiddenWord.splice(h, 1, hangman.rightLetters[h]);
                        console.log(h);
                        console.log(this.hiddenWord);
                    };
                };
                document.getElementById("secret-word").innerHTML = hangman.hiddenWord.join(" ");
                
                // If the letter is not in the word it'll have a score of 0, and will be pushed to the wrongLetters array
                if (letterScore < 1) {
                    hangman.wrongLetters.push(pressedKey);
                    document.getElementById("picked-letters").textContent = hangman.wrongLetters.join(" ");
                    hangman.lives -=1;
                    if (hangman.lives === 0) {
                        alert("Game over! The secret word was: " + hangman.hiddenWord.join(""));
                        location.reload();
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

     winnerListener: function() {
        if (!this.hiddenWord.includes("_")) {
            alert("You win! The secret word was: " + hangman.hiddenWord.join(""));
            location.reload();
        };
     }
};

document.addEventListener("keyup", hangman.validateKey);
hangman.hideWord();
document.getElementById("lives-left").textContent = "Lives left: " + hangman.lives;
document.getElementById("secret-word").innerHTML = hangman.hiddenWord.join(" ");
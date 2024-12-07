import { createSlice } from "@reduxjs/toolkit";

const initialGameState = {
  wordlist: [],
  word: "",
  guessesLeft: 6,
  currentGuess: 0,
  incorrectLetters: [],
  lettersOnCorrectSpot: [],
  lettersOnIncorrectSpot: [],
  guesses: [
    { id: 0, guess: "", done: false },
    { id: 1, guess: "", done: false },
    { id: 2, guess: "", done: false },
    { id: 3, guess: "", done: false },
    { id: 4, guess: "", done: false },
    { id: 5, guess: "", done: false },
  ],
  incorrectGuess: false,
  gameEnded: false,
  gameStarted: false,
  pause: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    removePause(state, action) {
      state.pause = false;
    },
    setIncorrectGuess(state, action) {
      state.incorrectGuess = action.payload.value;
    },
    setWords(state, action) {
      state.wordlist = action.payload.data;
    },
    inputWord(state, action) {
      if (!state.gameStarted) return;
      if (state.gameEnded) return;
      if (state.pause) return;

      const copyOfGuesses = [...state.guesses];
      const currentWordId = action.payload.data.id;

      if (copyOfGuesses[currentWordId].guess.length === 5) return;

      copyOfGuesses[currentWordId] = {
        id: copyOfGuesses[currentWordId].id,
        guess: action.payload.data.guess,
        done: false,
      };

      state.guesses = copyOfGuesses;
    },
    checkWord(state, action) {
      if (!state.gameStarted) return;
      if (state.gameEnded) return;
      if (state.pause) return;

      const wordToCheck = action.payload.data.guess;
      const wordId = action.payload.data.id;

      const copyOfGuesses = [...state.guesses];

      copyOfGuesses[wordId] = {
        id: wordId,
        guess: wordToCheck,
        done: true,
      };

      if (wordToCheck.length !== 5) {
        // console.log("Nedovoljno slova");
        return;
      }

      // PROVJERITI DA LI RIJEC POSTOJI I AKO NE POSTOJI POPUUP-ATI MSG
      const wordExist = state.wordlist.includes(wordToCheck);

      if (!wordExist) {
        state.incorrectGuess = true;
        state.pause = true;
        return;
      }

      state.guesses = copyOfGuesses;

      for (let i = 0; i < wordToCheck.length; i++) {
        const letter = wordToCheck[i];
        // wordToCheck.forEach((letter, i) => {
        if (state.word.includes(letter)) {
          // CHECK IF LETTER EXIST IN CHOSEN WORD
          if (state.word[i] === letter) {
            // CHECK IF ITS ALREADY IN ARRAY OF CORRECT LETTERS ON CORRECT SPOT AND ADD IT IF NOT
            if (!state.lettersOnCorrectSpot.includes(letter)) {
              const copyOfLettersOnCorrectSpot = [
                ...state.lettersOnCorrectSpot,
              ];
              copyOfLettersOnCorrectSpot.push(letter);
              state.lettersOnCorrectSpot = copyOfLettersOnCorrectSpot;
            }
          } else {
            // CHECK IF ITS ALREADY IN ARRAY OF CORRECT LETTERS ON INCORRECT SPOT AND ADD IT IF NOT
            if (!state.lettersOnIncorrectSpot.includes(letter)) {
              const copyOfLettersOnIncorrectSpot = [
                ...state.lettersOnIncorrectSpot,
              ];
              copyOfLettersOnIncorrectSpot.push(letter);
              state.lettersOnIncorrectSpot = copyOfLettersOnIncorrectSpot;
            }
          }
        } else {
          // CHECK IF ITS ALREADY IN ARRAY OF INCORRECT LETTERS AND ADD IT IF NOT
          if (!state.incorrectLetters.includes(letter)) {
            const copyOfIncorrectLetters = [...state.incorrectLetters];
            copyOfIncorrectLetters.push(letter);
            state.incorrectLetters = copyOfIncorrectLetters;
          }
        }
        // });
      }

      let gameEnded;

      if (state.word === state.guesses[state.currentGuess].guess) {
        gameEnded = true;
        state.gameStarted = false;
      } else if (
        state.word !== state.guesses[state.currentGuess].guess &&
        state.guessesLeft === 1
      ) {
        gameEnded = true;
        state.gameStarted = false;
        state.guessesLeft = 0;
        state.currentGuess = 5;
      } else {
        gameEnded = false;
        state.guessesLeft = state.guessesLeft - 1;
        state.currentGuess = state.currentGuess + 1;
      }

      state.gameEnded = gameEnded;

      // state.gameEnded = gameEnded;
      // state.gameStarted = !gameEnded;
      // state.currentGuess = gameEnded
      //   ? state.currentGuess
      //   : state.currentGuess + 1;
      // state.guessesLeft = gameEnded ? state.guessesLeft : state.guessesLeft - 1;
    },
    removeLetter(state, action) {
      if (!state.gameStarted) return;
      // if (state.pause) return;

      const copyOfGuesses = [...state.guesses];
      const currentGuess = state.currentGuess;
      if (copyOfGuesses[currentGuess].guess.length > 0) {
        const modifiedWord = copyOfGuesses[currentGuess].guess.slice(
          0,
          copyOfGuesses[currentGuess].guess.length - 1
        );

        copyOfGuesses[currentGuess].guess = modifiedWord;

        state.guesses = copyOfGuesses;
      }
    },
    setNewWord(state, action) {
      const rndNumber = Math.floor(Math.random() * state.wordlist.length);
      const newRandomWord = state.wordlist[rndNumber];

      if (newRandomWord) {
        state.word = newRandomWord;
        state.guessesLeft = 6;
        state.currentGuess = 0;
        state.incorrectLetters = [];
        state.lettersOnCorrectSpot = [];
        state.lettersOnIncorrectSpot = [];
        state.guesses = [
          { id: 0, guess: "", done: false },
          { id: 1, guess: "", done: false },
          { id: 2, guess: "", done: false },
          { id: 3, guess: "", done: false },
          { id: 4, guess: "", done: false },
          { id: 5, guess: "", done: false },
        ];
        state.gameEnded = false;
        state.gameStarted = true;
      }
    },
  },
});

export default gameSlice;

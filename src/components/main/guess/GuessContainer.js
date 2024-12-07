import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./GuessContainer.module.scss";

const SingleLetter = (props) => {
  const { guesses, gameStarted } = useSelector((state) => state.game);
  const [flip, setFlip] = useState(false);

  useEffect(() => {
    if (gameStarted) setFlip(false);
  }, [gameStarted]);

  useEffect(() => {
    if (guesses[props.guessId].done && !flip) {
      const timeout = setTimeout(() => {
        setFlip(true);
      }, 1000 * props.delay);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [guesses, props.guessId, flip, props.delay]);

  return (
    <div
      className={`${!props.letter ? "" : classes["anim-popup"]} ${
        flip ? props.letterClass[props.id] : ""
      } ${
        !props.letter ? "letter-border-color" : "letter-border-color-filled"
      } ${classes["letter"]}
       ${flip ? classes["flip-coin"] : ""}`}
    >
      {props.letter}
    </div>
  );
};

const Word = (props) => {
  const {
    guesses,
    word,
    incorrectLetters,
    lettersOnCorrectSpot,
    lettersOnIncorrectSpot,
    currentGuess,
    incorrectGuess,
  } = useSelector((state) => state.game);
  const [letterClass, setLetterClass] = useState({
    0: "",
    1: "",
    2: "",
    3: "",
    4: "",
  });

  useEffect(() => {
    if (
      incorrectLetters.length === 0 &&
      lettersOnCorrectSpot.length === 0 &&
      lettersOnIncorrectSpot.length === 0
    )
      setLetterClass({
        0: "",
        1: "",
        2: "",
        3: "",
        4: "",
      });
  }, [incorrectLetters, lettersOnCorrectSpot, lettersOnIncorrectSpot]);

  useEffect(() => {
    if (!guesses[props.id].done) return;

    const modifiedClasses = {
      0: "",
      1: "",
      2: "",
      3: "",
      4: "",
    };

    const targetWord = word.split("");
    const userGuess = guesses[props.id].guess.split("");

    // Broji pojave svakog slova u riječi i korisničkom unosu
    const targetCounts = {};
    const guessCounts = {};

    targetWord.forEach((letter) => {
      targetCounts[letter] = (targetCounts[letter] || 0) + 1;
    });

    userGuess.forEach((letter) => {
      guessCounts[letter] = (guessCounts[letter] || 0) + 1;
    });

    // Prvo provjeri za "correct" pozicije
    const usedLetters = Array(word.length).fill(false); // Praćenje pozicija u riječi
    const processed = Array(userGuess.length).fill(false); // Praćenje korisničkog unosa

    userGuess.forEach((letter, index) => {
      if (letter === targetWord[index]) {
        modifiedClasses[`${index}`] = "correct";
        usedLetters[index] = true;
        processed[index] = true;
        targetCounts[letter]--;
      }
    });

    // Provjeri za "incorrect-position"
    userGuess.forEach((letter, index) => {
      if (!processed[index] && targetCounts[letter] > 0) {
        const targetIndex = targetWord.findIndex(
          (targetLetter, i) => targetLetter === letter && !usedLetters[i]
        );

        if (targetIndex !== -1) {
          modifiedClasses[`${index}`] = "incorrect-position";
          usedLetters[targetIndex] = true;
          targetCounts[letter]--;
          processed[index] = true;
        }
      }
    });

    // Ostatak slova je "incorrect"
    userGuess.forEach((letter, index) => {
      if (!processed[index]) {
        modifiedClasses[`${index}`] = "incorrect";
      }
    });

    setLetterClass(modifiedClasses);
  }, [guesses, props.guessId, word, props.id]);

  return (
    <div className={classes["word-container"]} id={props.id}>
      {incorrectGuess && currentGuess === props.id && (
        <div className={`key-bg ${classes["error-msg"]}`}>{`${guesses[
          props.id
        ].guess.toUpperCase()} is not a word!`}</div>
      )}
      <SingleLetter
        id={0}
        letter={props.guess[0]}
        letterClass={letterClass}
        guessId={props.id}
        delay={0}
      />
      <SingleLetter
        id={1}
        letter={props.guess[1]}
        letterClass={letterClass}
        guessId={props.id}
        delay={0.2}
      />
      <SingleLetter
        id={2}
        letter={props.guess[2]}
        letterClass={letterClass}
        guessId={props.id}
        delay={0.4}
      />
      <SingleLetter
        id={3}
        letter={props.guess[3]}
        letterClass={letterClass}
        guessId={props.id}
        delay={0.6}
      />
      <SingleLetter
        id={4}
        letter={props.guess[4]}
        letterClass={letterClass}
        guessId={props.id}
        delay={0.8}
      />
    </div>
  );
};

const GuessContainer = (props) => {
  const { word, guesses } = useSelector((state) => state.game);

  const wordInputs = guesses.map((g) => (
    <Word key={g.id} id={g.id} guess={g.guess} word={word} />
  ));

  return <div className={classes.container}>{wordInputs}</div>;
};

export default GuessContainer;

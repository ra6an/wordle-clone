import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import classes from "./KeyboardLayout.module.scss";

import { IoBackspaceOutline } from "react-icons/io5";

const letters = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const LetterKey = (props) => {
  const { incorrectLetters, lettersOnCorrectSpot, lettersOnIncorrectSpot } =
    useSelector((state) => state.game);
  const [keyClass, setKeyClass] = useState("key-bg");

  const handleKeyPresses = (e) => {
    e.preventDefault();

    props.hook.inputWordHandler(props.letter);
  };

  useEffect(() => {
    if (
      incorrectLetters.length === 0 &&
      lettersOnCorrectSpot.length === 0 &&
      lettersOnIncorrectSpot.length === 0
    )
      setKeyClass("key-bg");
    if (incorrectLetters.includes(props.letter)) {
      setKeyClass("incorrect");
    }
    if (lettersOnIncorrectSpot.includes(props.letter)) {
      setKeyClass("incorrect-position");
    }
    if (lettersOnCorrectSpot.includes(props.letter)) {
      setKeyClass("correct");
    }
  }, [
    incorrectLetters,
    lettersOnIncorrectSpot,
    lettersOnCorrectSpot,
    props.letter,
  ]);

  return (
    <div className={`${keyClass} ${classes.key}`} onClick={handleKeyPresses}>
      {props.letter}
    </div>
  );
};

const KeyboardLayout = (props) => {
  const { guesses, currentGuess, pause } = useSelector((state) => state.game);
  const confirmWordHandler = (e) => {
    e.preventDefault();

    props.hook.checkWordHandler();
  };

  const removeLetterHandler = (e) => {
    e.preventDefault();

    props.hook.removeLetterHandler();
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter" && guesses[currentGuess].guess.length === 5) {
        props.hook.checkWordHandler();
      }

      if (letters.includes(event.key.toLowerCase())) {
        props.hook.inputWordHandler(event.key);
      }

      if (event.key === "Backspace" && !pause) {
        props.hook.removeLetterHandler();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [props.hook, guesses, currentGuess, pause]);

  return (
    <div className={classes[`keyboard-container`]}>
      <div className={classes.row}>
        <LetterKey hook={props.hook} letter="q" />
        <LetterKey hook={props.hook} letter="w" />
        <LetterKey hook={props.hook} letter="e" />
        <LetterKey hook={props.hook} letter="r" />
        <LetterKey hook={props.hook} letter="t" />
        <LetterKey hook={props.hook} letter="y" />
        <LetterKey hook={props.hook} letter="u" />
        <LetterKey hook={props.hook} letter="i" />
        <LetterKey hook={props.hook} letter="o" />
        <LetterKey hook={props.hook} letter="p" />
      </div>
      <div className={classes.row}>
        <LetterKey hook={props.hook} letter="a" />
        <LetterKey hook={props.hook} letter="s" />
        <LetterKey hook={props.hook} letter="d" />
        <LetterKey hook={props.hook} letter="f" />
        <LetterKey hook={props.hook} letter="g" />
        <LetterKey hook={props.hook} letter="h" />
        <LetterKey hook={props.hook} letter="j" />
        <LetterKey hook={props.hook} letter="k" />
        <LetterKey hook={props.hook} letter="l" />
      </div>
      <div className={`${classes["last-row"]} ${classes.row}`}>
        <div
          className={`key-bg ${classes.enter} ${classes["stretched-key"]}`}
          onClick={confirmWordHandler}
        >
          enter
        </div>
        <LetterKey hook={props.hook} letter="z" />
        <LetterKey hook={props.hook} letter="x" />
        <LetterKey hook={props.hook} letter="c" />
        <LetterKey hook={props.hook} letter="v" />
        <LetterKey hook={props.hook} letter="b" />
        <LetterKey hook={props.hook} letter="n" />
        <LetterKey hook={props.hook} letter="m" />
        <div
          onClick={removeLetterHandler}
          className={`key-bg ${classes.icon} ${classes["stretched-key"]}`}
        >
          <IoBackspaceOutline />
        </div>
      </div>
    </div>
  );
};

export default KeyboardLayout;

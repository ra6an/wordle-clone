import React from "react";
import { useSelector, useDispatch } from "react-redux";

import classes from "./Modal.module.scss";

// COMPONENTS
import GameInfo from "../game-info/GameInfo";

// STORE
import { gameActions } from "../../store/redux-store";
import Button from "../UI/Button";

const Modal = (props) => {
  const dispatch = useDispatch();
  const { word, gameEnded, guesses, currentGuess } = useSelector(
    (state) => state.game
  );

  const startNewGameHandler = (e) => {
    e.preventDefault();

    dispatch(gameActions.setNewWord());

    document.activeElement.blur();
  };

  const firstTry = !word;

  const title =
    guesses[currentGuess].guess === word ? "You Won! 🎉" : "You Lost...";

  return (
    <div className={classes.container}>
      <div className={`${classes.modal}`}>
        {!firstTry && gameEnded && (
          <div
            className={`background ${classes["late-popup"]} ${classes.card}`}
          >
            <h3>{title}</h3>
            <h4>{`Chosen word was: ${word.toUpperCase()}`}</h4>
            <GameInfo />
            <Button onClick={startNewGameHandler}>New Game</Button>
          </div>
        )}
        {firstTry && (
          <div className={`background ${classes["popup"]} ${classes.card}`}>
            <h3>{`Game Info`}</h3>
            <GameInfo />
            <Button onClick={startNewGameHandler}>New Game</Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;

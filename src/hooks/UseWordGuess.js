import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

//STORE
import { gameActions } from "../store/redux-store";

const UseWordGuess = (props) => {
  const dispatch = useDispatch();

  const { currentGuess, guessesLeft, guesses, incorrectGuess } = useSelector(
    (state) => state.game
  );

  useEffect(() => {
    if (!incorrectGuess) return;

    const timeout = setTimeout(() => {
      dispatch(gameActions.setIncorrectGuess({ value: false }));
      dispatch(gameActions.removePause());
    }, 1000 * 1.2);

    return () => {
      clearTimeout(timeout);
    };
  }, [dispatch, incorrectGuess]);

  const inputWordHandler = (letter) => {
    if (guessesLeft === 0) return;
    dispatch(
      gameActions.inputWord({
        data: {
          id: currentGuess,
          guess: `${guesses[currentGuess].guess}${letter}`,
        },
      })
    );
  };

  const checkWordHandler = () => {
    dispatch(
      gameActions.checkWord({
        data: {
          id: currentGuess,
          guess: guesses[currentGuess].guess,
        },
      })
    );
  };

  const removeLetterHandler = () => {
    dispatch(gameActions.removeLetter());
  };

  return {
    //HANDLERS
    inputWordHandler,
    checkWordHandler,
    removeLetterHandler,
  };
};

export default UseWordGuess;

import { useState } from "react";
import { useDispatch } from "react-redux";

import classes from "./MainContainer.module.scss";

//COMPONENTS
import GuessContainer from "./guess/GuessContainer";
import KeyboardLayout from "./keyboard/KeyboardLayout";
import Button from "../UI/Button";

// STORE
import { gameActions } from "../../store/redux-store";

const MainContainer = (props) => {
  const dispatch = useDispatch();

  // const startNewGameHandler = (e) => {
  //   e.preventDefault();

  //   dispatch(gameActions.setNewWord());

  //   document.activeElement.blur();
  // };

  return (
    <div className={`text ${classes.container}`}>
      <GuessContainer />
      <KeyboardLayout hook={props.hook} />
      {/* <Button onClick={startNewGameHandler}>New Game</Button> */}
    </div>
  );
};

export default MainContainer;

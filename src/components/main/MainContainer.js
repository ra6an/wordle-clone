import React from "react";

import classes from "./MainContainer.module.scss";

//COMPONENTS
import GuessContainer from "./guess/GuessContainer";
import KeyboardLayout from "./keyboard/KeyboardLayout";

const MainContainer = (props) => {
  return (
    <div className={`text ${classes.container}`}>
      <GuessContainer />
      <KeyboardLayout hook={props.hook} />
    </div>
  );
};

export default MainContainer;

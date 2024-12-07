import { useEffect, useState } from "react";

import styles from "./Main.module.scss";

import MainContainer from "../components/main/MainContainer";

//CUSTOM HOOKS
import UseWordGuess from "../hooks/UseWordGuess";

const Main = (props) => {
  const WordGuessHook = UseWordGuess();

  return (
    <div className={styles.container}>
      <MainContainer hook={WordGuessHook} />
    </div>
  );
};

export default Main;

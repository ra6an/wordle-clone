import React from "react";

import classes from "./GameInfo.module.scss";

const GameInfo = (props) => {
  return (
    <div className={classes.container}>
      <div className={classes["single-info"]}>
        <div className={`incorrect ${classes["color"]}`} />
        <p>
          This color indicates that the letter is not present in the target
          word.
        </p>
      </div>
      <div className={classes["single-info"]}>
        <div className={`incorrect-position ${classes["color"]}`} />
        <p>
          This color indicates that the letter is in the word, but not in the
          correct position.
        </p>
      </div>
      <div className={classes["single-info"]}>
        <div className={`correct ${classes["color"]}`} />
        <p>
          This color indicates that the letter is in the word and in the correct
          position.
        </p>
      </div>
    </div>
  );
};

export default GameInfo;

import React from "react";

import classes from "./Button.module.scss";

const Button = (props) => {
  return (
    <button
      onClick={props.onClick}
      className={`text button-border ${classes.button}`}
    >
      {props.children}
    </button>
  );
};

export default Button;

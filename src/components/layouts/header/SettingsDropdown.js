import React from "react";

import classes from "./SettingsDropdown.module.scss";

const SettingsDropdown = (props) => {
  const toggleTheme = (e) => {
    e.stopPropagation();

    const newTheme = props.theme.get === "dark" ? "light" : "dark";

    props.theme.set(newTheme);
    localStorage.setItem("Theme", newTheme);
  };

  return (
    <div className={`border-color ${classes.container}`}>
      <ul className={classes.list}>
        <li className={classes["single-link"]}>
          <p className={"text"}>{`Theme: ${props.theme.get}`}</p>
          <div className={classes.slider} onClick={toggleTheme}>
            <div
              className={classes.circle}
              style={{
                marginLeft: `${props.theme.get === "dark" ? "auto" : "0"}`,
              }}
            />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SettingsDropdown;

import { useState } from "react";

import classes from "./Header.module.scss";

//ICONS
import { FaRegQuestionCircle } from "react-icons/fa";
import { RiSettings3Fill } from "react-icons/ri";

//COMPONENTS
import SettingsDropdown from "./SettingsDropdown";

const Header = (props) => {
  const [showSettings, setShowSettings] = useState(false);

  const toggleSettings = (e) => {
    e.preventDefault();
    setShowSettings(!showSettings);
  };

  return (
    <header className={`border-color ${classes.container}`}>
      <div className={`text ${classes.logo}`}>Wordle EN</div>
      <ul className={`text ${classes.links}`}>
        <li>
          <FaRegQuestionCircle className={classes.icon} />
        </li>
        <li onClick={toggleSettings}>
          <RiSettings3Fill className={classes.icon} />
          {showSettings && <SettingsDropdown theme={props.theme} />}
        </li>
      </ul>
    </header>
  );
};

export default Header;

import React from "react";

import classes from "./Footer.module.scss";

const Footer = (props) => {
  return (
    <footer className={`${classes.footer}`}>
      <div
        className={`key-bg ${classes.rights}`}
      >{`© 2024, ADNAN DACIĆ All rights reserved.`}</div>
    </footer>
  );
};

export default Footer;

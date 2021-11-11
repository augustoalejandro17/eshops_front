import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// core components
import styles from "assets/jss/material-kit-react/components/typographyStyle.js";

import useClasses from "components/UseClasses";

export default function Danger(props) {
  const classes = useClasses(styles);
  const { children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.dangerText}>
      {children}
    </div>
  );
}

Danger.propTypes = {
  children: PropTypes.node,
};

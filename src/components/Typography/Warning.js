import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @mui/material components
import styles from "assets/jss/material-kit-react/components/typographyStyle.js";

import useClasses from "components/UseClasses";

export default function Warning(props) {
  const classes = useClasses(styles);
  const { children } = props;
  return (
    <div className={classes.defaultFontStyle + " " + classes.warningText}>
      {children}
    </div>
  );
}

Warning.propTypes = {
  children: PropTypes.node,
};

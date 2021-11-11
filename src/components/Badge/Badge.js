import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";

// @mui/material components

import styles from "assets/jss/material-kit-react/components/badgeStyle.js";
import useClasses from "components/UseClasses";

export default function Badge(props) {
  const classes = useClasses(styles);
  const { color, children } = props;
  return (
    <span className={classes.badge + " " + classes[color]}>{children}</span>
  );
}

Badge.defaultProps = {
  color: "gray",
};

Badge.propTypes = {
  color: PropTypes.oneOf([
    "primary",
    "warning",
    "danger",
    "success",
    "info",
    "rose",
    "gray",
  ]),
  children: PropTypes.node,
};

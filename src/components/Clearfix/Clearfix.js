import React from "react";

// mterial-ui components
import useClasses from "components/UseClasses";

const styles = {
  clearfix: {
    "&:after,&:before": {
      display: "table",
      content: '" "',
    },
    "&:after": {
      clear: "both",
    },
  },
};

export default function Clearfix() {
  const classes = useClasses(styles);
  return <div className={classes.clearfix} />;
}

Clearfix.propTypes = {};

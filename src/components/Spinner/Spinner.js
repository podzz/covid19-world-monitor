import React from "react";
import { CircularProgress, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff"
  }
}));

const Spinner = () => {
  const classes = useStyles();
  return (
    <Backdrop className={classes.backdrop} open={true} onClick={() => {}}>
      <CircularProgress size={70} />
    </Backdrop>
  );
};

export default Spinner;

import {
  AppBar,
  Avatar,
  Dialog,
  IconButton,
  makeStyles,
  Slide,
  Toolbar,
  Typography
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import React from "react";
import CustomAreaChart from "../CustomAreaChart/CustomAreaChart";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const SelectedCountryDialog = ({ selectedCountry, discardSelectedCountry }) => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const classes = useStyles();

  let dialogContent = <React.Fragment></React.Fragment>;

  if (selectedCountry) {
    dialogContent = (
      <React.Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Avatar>{selectedCountry.emoji}</Avatar>
            <Typography variant="h6" className={classes.title}>
              {selectedCountry.name} evolution chart
            </Typography>
            <IconButton
              edge="start"
              color="inherit"
              onClick={discardSelectedCountry}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <CustomAreaChart dates={selectedCountry.dates} />
      </React.Fragment>
    );
  }
  return (
    <Dialog
      fullScreen
      open={!!selectedCountry}
      onClose={discardSelectedCountry}
      TransitionComponent={Transition}
    >
      {dialogContent}
    </Dialog>
  );
};

export default SelectedCountryDialog;

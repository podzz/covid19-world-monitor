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

const SelectedCountryDialog = ({
  selectedCountry: { country, timeseries },
  discardSelectedCountry
}) => {
  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  const classes = useStyles();

  let dialogContent = <React.Fragment></React.Fragment>;

  if (country) {
    dialogContent = (
      <React.Fragment>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <Avatar>{country.code.emoji}</Avatar>
            <Typography variant="h6" className={classes.title}>
              {country.code.name} evolution chart
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
        <CustomAreaChart timeseries={timeseries} />
      </React.Fragment>
    );
  }
  return (
    <Dialog
      fullScreen
      open={!!country}
      onClose={discardSelectedCountry}
      TransitionComponent={Transition}
    >
      {dialogContent}
    </Dialog>
  );
};

export default SelectedCountryDialog;

import React from "react";
import { Typography } from "@material-ui/core";
import CounterBlockClasses from "./CounterBlock.module.css";

const numberWithCommas = x =>
  x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const CounterBlock = ({ counter, text }) => {
  return (
    <div className={CounterBlockClasses.Block}>
      <Typography variant="h6">{text}</Typography>
      <Typography variant="h5" className={CounterBlockClasses.Counter}>
        {numberWithCommas(counter)}
      </Typography>
    </div>
  );
};

export default CounterBlock;

import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { sumBy } from "lodash";
import React, { useEffect, useState } from "react";
import CounterBlock from "../CounterBlock/CounterBlock";
import SidebarLeftList from "./SidebarLeftList/SidebarLeftList";
import SidebarSearch from "./SidebarSearch/SidebarSearch";

const useStyles = makeStyles(theme => ({
  Header: {
    padding: "15px 0",
    textAlign: "center",
    flex: "0 1",
    backgroundColor: theme.palette.background.default
  },
  List: {
    paddingTop: "8px",
    flexGrow: 1,
    backgroundColor: theme.palette.background.default
  },
  Block: {
    textAlign: "center",
    flex: "0 1 auto",
    backgroundColor: theme.palette.background.default
  }
}));
const SidebarLeft = ({ countries, setCoordinates }) => {
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCases] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setFilteredCases(
      countries.filter(
        filteredCountry =>
          filteredCountry.name &&
          filteredCountry.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [countries, setFilteredCases, search]);

  return (
    <React.Fragment>
      <div className={classes.Block}>
        <CounterBlock
          counter={sumBy(countries, "lastCases")}
          text="Total confirmed"
        ></CounterBlock>
        <Divider />
        <CounterBlock
          counter={sumBy(countries, "lastDeaths")}
          text="Total deaths"
        ></CounterBlock>
        <Divider />
      </div>
      <div className={classes.Header}>
        <SidebarSearch search={search} setSearch={setSearch} />
      </div>
      <div className={classes.List}>
        <SidebarLeftList
          filteredCountries={filteredCountries}
          setCoordinates={setCoordinates}
        />
      </div>
    </React.Fragment>
  );
};

export default SidebarLeft;

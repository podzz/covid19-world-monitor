import { Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useEffect, useState } from "react";
import SidebarList from "./SidebarList/SidebarList";
import SidebarSearch from "./SidebarSearch/SidebarSearch";

const useStyles = makeStyles(theme => ({
  Header: {
    padding: "6px 1px",
    textAlign: "center",
    height: "64px",
    backgroundColor: theme.palette.background.default
  },
  List: {
    paddingTop: "8px",
    height: "100%",
    backgroundColor: theme.palette.background.default
  },
  Footer: {
    textAlign: "center",
    height: "64px",
    backgroundColor: theme.palette.action.hover
  }
}));
const Sidebar = ({ countries, setCoordinates }) => {
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCases] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    setFilteredCases(
      countries.filter(filteredCountry =>
        filteredCountry.name.toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [countries, setFilteredCases, search]);

  return (
    <React.Fragment>
      <div className={classes.Header}>
        <SidebarSearch search={search} setSearch={setSearch} />
      </div>
      <Divider />
      <div className={classes.List}>
        <SidebarList
          filteredCountries={filteredCountries}
          setCoordinates={setCoordinates}
        />
      </div>
    </React.Fragment>
  );
};

export default Sidebar;

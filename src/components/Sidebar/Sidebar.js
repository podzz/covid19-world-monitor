import { Divider } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { filterCountries } from "../../utils/helper";
import SidebarClasses from "./Sidebar.module.css";
import SidebarList from "./SidebarList/SidebarList";
import SidebarSearch from "./SidebarSearch/SidebarSearch";

const Sidebar = ({ loading, countries, setCoordinates }) => {
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCases] = useState([]);

  useEffect(() => {
    setFilteredCases(filterCountries(countries, search));
  }, [countries, setFilteredCases, search]);

  return (
    <React.Fragment>
      <div className={SidebarClasses.Header}>
        <SidebarSearch search={search} setSearch={setSearch} />
      </div>
      <Divider />
      <SidebarList
        filteredCountries={filteredCountries}
        setCoordinates={setCoordinates}
      />
    </React.Fragment>
  );
};

export default Sidebar;

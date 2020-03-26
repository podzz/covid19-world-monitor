import React from "react";
import { TextField } from "@material-ui/core";

const SidebarSearch = ({ search, setSearch }) => {
  return (
    <TextField
      label="Search for a country..."
      variant="outlined"
      value={search}
      onChange={event => setSearch(event.target.value)}
    />
  );
};

export default React.memo(SidebarSearch);

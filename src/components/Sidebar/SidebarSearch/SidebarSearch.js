import React from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import SearchRounded from "@material-ui/icons/SearchRounded";

const SidebarSearch = ({ search, setSearch }) => {
  return (
    <TextField
      label="Search for a country..."
      variant="outlined"
      value={search}
      onChange={event => setSearch(event.target.value)}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchRounded />
          </InputAdornment>
        )
      }}
    />
  );
};

export default React.memo(SidebarSearch);

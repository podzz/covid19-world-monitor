import { Avatar, Grid, ListItem, ListItemText } from "@material-ui/core";
import React from "react";
import Autosizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import SidebarLeftListClasses from "./SidebarLeftList.module.css";

const SidebarListItemRenderer = ({ index, data, style }) => {
  const { filteredCountries, setCoordinates } = data;
  const { state, lastCases, name, emoji, coordinates } = filteredCountries[
    index
  ];
  const [longitude, latitude] = coordinates || [0, 0];
  return (
    <ListItem
      button
      key={index}
      style={style}
      onClick={() =>
        setCoordinates({
          longitude,
          latitude
        })
      }
    >
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        wrap="nowrap"
        spacing={2}
      >
        <Grid
          item
          container
          direction="row"
          justify="flex-start"
          spacing={2}
          alignItems="center"
          wrap="nowrap"
        >
          <Grid item>
            <Avatar>
              <span className={SidebarLeftListClasses.Flag}>{emoji}</span>
            </Avatar>
          </Grid>
          <Grid item>
            <ListItemText primary={`${name}${state ? ` - ${state}` : ""}`} />
          </Grid>
        </Grid>
        <Grid item>
          <ListItemText secondary={`${lastCases}`} />
        </Grid>
      </Grid>
    </ListItem>
  );
};

const SidebarLeftList = React.memo(({ filteredCountries, setCoordinates }) => {
  return (
    <Autosizer>
      {({ height, width }) => (
        <FixedSizeList
          height={
            filteredCountries.length < 20
              ? 48 * filteredCountries.length
              : height
          }
          width={width}
          itemSize={48}
          itemCount={filteredCountries.length}
          itemData={{
            filteredCountries,
            setCoordinates
          }}
        >
          {SidebarListItemRenderer}
        </FixedSizeList>
      )}
    </Autosizer>
  );
});

export default SidebarLeftList;

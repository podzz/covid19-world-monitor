import { Avatar, Grid, ListItem, Typography } from "@material-ui/core";
import React from "react";
import Autosizer from "react-virtualized-auto-sizer";
import { FixedSizeList } from "react-window";
import SidebarListClasses from "./SidebarList.module.css";

const SidebarListItemRenderer = ({ index, data, style }) => {
  const { filteredCountries, setCoordinates } = data;
  const country = filteredCountries[index];
  return (
    <ListItem
      button
      key={index}
      style={style}
      onClick={() =>
        setCoordinates({
          longitude: country.localisation.la,
          latitude: country.localisation.lo
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
              <span className={SidebarListClasses.Flag}>
                {country.code ? country.code.emoji : null}
              </span>
            </Avatar>
          </Grid>
          <Grid item>
            <Typography variant="body2">{country.country_name}</Typography>
          </Grid>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" color="textPrimary">
            {country.cases}
          </Typography>
        </Grid>
      </Grid>
    </ListItem>
  );
};

const SidebarList = React.memo(({ filteredCountries, setCoordinates }) => {
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

export default SidebarList;

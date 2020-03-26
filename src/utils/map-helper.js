export const transformCountriesToMapData = countryData => {
  return {
    type: "FeatureCollection",

    features: countryData.map(country => {
      const count = +country.cases.replace(",", "")
      return {
        type: "Feature",
        properties: {
          count
        },
        geometry: {
          type: "Point",
          coordinates: [country.localisation.la, country.localisation.lo]
        }
      };
    })
  };
};

export const transformCountriesToMapData = countryData => {
  return {
    type: "FeatureCollection",

    features: countryData.map(country => {
      return {
        type: "Feature",
        properties: {
          ...country,
          cases: Math.sqrt(+country.cases.replace(",", "")),
          casesNumber: +country.cases.replace(",", ""),
          casesStr: country.cases.replace(",", "")
        },
        geometry: {
          type: "Point",
          coordinates: [country.localisation.la, country.localisation.lo]
        }
      };
    })
  };
};

export const transformCountriesToMapData = countryData => {
  return {
    type: "FeatureCollection",

    features: countryData.map(country => {
      const count = +country.cases.replace(",", "");
      return {
        type: "Feature",
        properties: {
          ...country,
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

export const retrieveFeatureFromEvent = event => {
  const {
    features,
    srcEvent: { offsetX, offsetY }
  } = event;
  const hoveredFeature =
    features && features.find(f => f.layer.id === "clusters");
  return { hoveredFeature, x: offsetX, y: offsetY };
};

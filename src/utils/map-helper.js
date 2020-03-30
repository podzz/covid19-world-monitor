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

const distance = (lat1, lon1, lat2, lon2, unit) => {
  if (lat1 === lat2 && lon1 === lon2) {
    return 0;
  } else {
    var radlat1 = (Math.PI * lat1) / 180;
    var radlat2 = (Math.PI * lat2) / 180;
    var theta = lon1 - lon2;
    var radtheta = (Math.PI * theta) / 180;
    var dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) {
      dist = 1;
    }
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515;
    if (unit === "K") {
      dist = dist * 1.609344;
    }
    if (unit === "N") {
      dist = dist * 0.8684;
    }
    return dist;
  }
};

export const retrieveFeatureFromEvent = event => {
  const {
    features = [],
    srcEvent: { offsetX, offsetY },
    lngLat
  } = event;
  let minDistance = Number.MAX_VALUE;
  let hoveredFeature = undefined;
  features
    .filter(f => f.layer.id === "clusters")
    .forEach(feature => {
      const distanceBetweenFeature = distance(
        lngLat[0],
        lngLat[1],
        feature.properties.latitude,
        feature.properties.longitude,
        "K"
      );

      if (minDistance > distanceBetweenFeature) {
        minDistance = distanceBetweenFeature;
        hoveredFeature = feature;
      }
    });
  return { hoveredFeature, x: offsetX, y: offsetY };
};

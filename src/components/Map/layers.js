export const clusterLayer = {
  id: "clusters",
  type: "fill",
  // beforeId: "countryText",
  source: "geojson",
  paint: {
    "fill-opacity": 1,
    "fill-color": [
      "interpolate",
      ["linear"],
      ["get", "lastCases"],
      10000,
      "rgba(0, 204, 0, 0.1)",
      40000,
      "rgba(230, 0, 0, 0.6)"
    ]
  }
};

export const clusterCountLayer = {
  id: "countryText",
  type: "symbol",
  source: "geojson",
  layout: {
    "text-field": ["to-string", ["get", "count"]],
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 20
  },
  paint: {
    "text-color": "#fff"
  }
};

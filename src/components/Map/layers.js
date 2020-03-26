export const clusterLayer = {
  id: "clusters",
  type: "circle",
  beforeId: "cluster-count",
  source: "geojson",
  paint: {
    "circle-radius": [
      "interpolate",
      ["linear"],
      ["zoom"],
      0,
      0,
      5,
      ["/", ["get", "cases"], 2]
    ],
    "circle-color": [
      "interpolate",
      ["linear"],
      ["get", "casesNumber"],
      0,
      "#00cc00",
      40000,
      "#e60000"
    ],
    "circle-opacity": 0.6,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff"
  }
};

export const clusterCountLayer = {
  id: "cluster-count",
  type: "symbol",
  source: "geojson",
  layout: {
    "text-field": ["get", "casesStr"],
    "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
    "text-size": 20
  },
  paint: {
    "text-color": "#fff"
  }
};

export const unclusteredPointLayer = {
  id: "unclustered-point",
  type: "circle",
  source: "geojson",
  paint: {
    "circle-color": "#11b4da",
    "circle-radius": 4,
    "circle-stroke-width": 1,
    "circle-stroke-color": "#fff"
  }
};

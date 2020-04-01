export const clusterLayer = {
  id: "clusters",
  type: "fill",
  beforeId: "admin-1-boundary-bg",
  source: "geojson",
  layout: {},
  paint: {
    "fill-opacity": 0.5,
    "fill-color": ["get", "color"]
  }
};

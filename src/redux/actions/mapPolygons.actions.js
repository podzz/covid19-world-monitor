export const MapPolygonsActions = {
  GET_MAP_POLYGONS: "[MapPolygons] Get map polygons",
  GET_MAP_POLYGONS_SUCCESS: "[MapPolygons] Get map polygons success",
  GET_MAP_POLYGONS_FAILURE: "[MapPolygons] Get map polygons failure"
};

export const getMapPolygons = () => ({
  type: MapPolygonsActions.GET_MAP_POLYGONS
});

export const getMapPolygonsSuccess = polygons => ({
  type: MapPolygonsActions.GET_MAP_POLYGONS_SUCCESS,
  polygons
});

export const getMapPolygonsFailure = error => ({
  type: MapPolygonsActions.GET_MAP_POLYGONS_FAILURE,
  error
});

import { MapPolygonsActions } from "../actions/mapPolygons.actions";

const initialState = {
  polygons: [],
  error: null,
  loading: false
};

export function mapPolygonsReducer(state = initialState, action) {
  switch (action.type) {
    case MapPolygonsActions.GET_MAP_POLYGONS:
      return {
        ...state,
        loading: true,
        error: null
      };
    case MapPolygonsActions.GET_MAP_POLYGONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        polygons: action.polygons
      };
    case MapPolygonsActions.GET_MAP_POLYGONS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

export const MapCasesActions = {
  GET_MAP_CASES: "[MapCases] Get map cases",
  GET_MAP_CASES_SUCCESS: "[MapCases] Get map cases success",
  GET_MAP_CASES_FAILURE: "[MapCases] Get map cases failure"
};

export const getMapCases = polygons => ({
  type: MapCasesActions.GET_MAP_CASES,
  polygons
});

export const getMapCasesSuccess = countries => ({
  type: MapCasesActions.GET_MAP_CASES_SUCCESS,
  countries
});

export const getMapCasesFailure = error => ({
  type: MapCasesActions.GET_MAP_CASES_FAILURE,
  error
});

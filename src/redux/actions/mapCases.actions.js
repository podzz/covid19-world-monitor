export const MapCasesActions = {
  GET_MAP_CASES: "[MapCases] Get map cases",
  GET_MAP_CASES_SUCCESS: "[MapCases] Get map cases success",
  GET_MAP_CASES_FAILURE: "[MapCases] Get map cases failure"
};

export const getMapCases = () => ({
  type: MapCasesActions.GET_MAP_CASES
});

export const getMapCasesSuccess = (countries, lastUpdate) => ({
  type: MapCasesActions.GET_MAP_CASES_SUCCESS,
  countries,
  lastUpdate
});

export const getMapCasesFailure = error => ({
  type: MapCasesActions.GET_MAP_CASES_FAILURE,
  error
});

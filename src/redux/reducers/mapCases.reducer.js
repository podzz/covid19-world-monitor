import { MapCasesActions } from "../actions/mapCases.actions";

const initialState = {
  countries: [],
  error: null,
  loading: false
};

export function mapCasesReducer(state = initialState, action) {
  switch (action.type) {
    case MapCasesActions.GET_MAP_CASES:
      return {
        ...state,
        loading: true,
        error: null
      };
    case MapCasesActions.GET_MAP_CASES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        countries: action.countries
      };
    case MapCasesActions.GET_MAP_CASES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

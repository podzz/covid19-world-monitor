import { CountryTimeseriesActions } from "../actions/countryTimeseries.actions";

const initialState = {
  countries: [],
  timeseriesByCountry: {},
  error: null,
  loading: false
};

export function countryTimeseriesReducer(state = initialState, action) {
  switch (action.type) {
    case CountryTimeseriesActions.GET_COUNTRY_TIMESERIES:
      return {
        ...state,
        loading: true,
        error: null
      };
    case CountryTimeseriesActions.GET_COUNTRY_TIMESERIES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
        timeseriesByCountry: action.data
      };
    case CountryTimeseriesActions.GET_COUNTRY_TIMESERIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error
      };
    default:
      return state;
  }
}

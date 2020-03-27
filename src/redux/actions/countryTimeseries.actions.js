export const CountryTimeseriesActions = {
  GET_COUNTRY_TIMESERIES: "[CountryTimeseries] Get country timeseries",
  GET_COUNTRY_TIMESERIES_SUCCESS:
    "[CountryTimeseries] Get country timeseries success",
  GET_COUNTRY_TIMESERIES_FAILURE:
    "[CountryTimeseries] Get country timeseries failure"
};

export const getCountryTimeseriesMapCases = () => ({
  type: CountryTimeseriesActions.GET_COUNTRY_TIMESERIES
});

export const getCountryTimeseriesSuccess = data => ({
  type: CountryTimeseriesActions.GET_COUNTRY_TIMESERIES_SUCCESS,
  data
});

export const getCountryTimeseriesFailure = error => ({
  type: CountryTimeseriesActions.GET_COUNTRY_TIMESERIES_FAILURE,
  error
});

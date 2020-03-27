import { all, takeEvery } from "redux-saga/effects";
import { MapCasesActions } from "../actions/mapCases.actions";
import { getMapCasesSaga } from "./mapCases.saga";
import { CountryTimeseriesActions } from "../actions/countryTimeseries.actions";
import { getCountryTimeseriesSaga } from "./countryTimeseries.saga";

export function* watchMapCases() {
  yield all([takeEvery(MapCasesActions.GET_MAP_CASES, getMapCasesSaga)]);
}

export function* watchCountryTimeseries() {
  yield all([
    takeEvery(
      CountryTimeseriesActions.GET_COUNTRY_TIMESERIES,
      getCountryTimeseriesSaga
    )
  ]);
}

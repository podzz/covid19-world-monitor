import { put } from "redux-saga/effects";
import { transformCsvToJson } from "../../utils/csvtojson.helper";
import {
  getCountryTimeseriesFailure,
  getCountryTimeseriesSuccess
} from "../actions/countryTimeseries.actions";

export function* getCountryTimeseriesSaga() {
  try {
    const response = yield fetch(
      "https://raw.githubusercontent.com/datasets/covid-19/master/data/countries-aggregated.csv"
    );
    const data = yield response.text();
    const dataRecoveredTransformed = yield transformCsvToJson(data);

    yield put(getCountryTimeseriesSuccess(dataRecoveredTransformed));
  } catch (error) {
    yield put(getCountryTimeseriesFailure(error.message));
  }
}

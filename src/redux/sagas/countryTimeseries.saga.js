import { all, put, call } from "redux-saga/effects";
import {
  getCountryTimeseriesFailure,
  getCountryTimeseriesSuccess
} from "../actions/countryTimeseries.actions";
import {
  transformCsvToJson,
  mergeTransformedCsv
} from "../../utils/csvtojson.helper";

export function* getCountryTimeseriesSaga() {
  try {
    const [responseRecovered, responseConfirmed, responseDeath] = yield all([
      call(
        fetch,
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_recovered_global.csv"
      ),
      call(
        fetch,
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_confirmed_global.csv"
      ),
      call(
        fetch,
        "https://raw.githubusercontent.com/CSSEGISandData/COVID-19/master/csse_covid_19_data/csse_covid_19_time_series/time_series_covid19_deaths_global.csv"
      )
    ]);
    const dataRecovered = yield responseRecovered.text();
    const dataRecoveredTransformed = yield transformCsvToJson(dataRecovered);
    const dataConfirmed = yield responseConfirmed.text();
    const dataConfirmedTransformed = yield transformCsvToJson(dataConfirmed);
    const dataDeath = yield responseDeath.text();
    const dataDeathTransformed = yield transformCsvToJson(dataDeath);
    const mergeAll = yield mergeTransformedCsv(
      dataRecoveredTransformed,
      dataConfirmedTransformed,
      dataDeathTransformed
    );
    yield put(getCountryTimeseriesSuccess(mergeAll));
  } catch (error) {
    yield put(getCountryTimeseriesFailure(error.message));
  }
}

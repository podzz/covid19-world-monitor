import { put } from "redux-saga/effects";
import { transformCountries } from "../../utils/helper";
import {
  getMapCasesFailure,
  getMapCasesSuccess
} from "../actions/mapCases.actions";

export function* getMapCasesSaga() {
  try {
    const response = yield fetch(
      "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
      {
        headers: {
          "x-rapidapi-host": process.env.REACT_APP_CovidApi_Host,
          "x-rapidapi-key": process.env.REACT_APP_CovidAPI_Key,
          "Content-Type": "application/json"
        }
      }
    );
    const { statistic_taken_at, countries_stat } = yield response.json();
    const countries = yield transformCountries(countries_stat);
    yield put(getMapCasesSuccess(countries, statistic_taken_at));
  } catch (error) {
    yield put(getMapCasesFailure(error.message));
  }
}

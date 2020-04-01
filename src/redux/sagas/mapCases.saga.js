import { countries } from "country-data";
import { get, keys, sortBy } from "lodash";
import { put } from "redux-saga/effects";
import {
  getMapCasesFailure,
  getMapCasesSuccess
} from "../actions/mapCases.actions";

export function* getMapCasesSaga() {
  try {
    const response = yield fetch(
      "https://coronadatascraper.com/timeseries-byLocation.json"
    );
    const data = yield response.json();

    const result = yield Object.keys(data).reduce((result, key) => {
      let { coordinates, dates, country, population } = data[key];
      const name = get(countries[country], "name");
      const emoji = get(countries[country], "emoji");
      let lastGrowthFactor = 100;
      let lastCases = 0;
      let lastDeaths = 0;
      let lastTested = 0;
      let lastRecovered = 0;

      let dateKeyArray = sortBy(keys(dates), dateObj => {
        return new Date(dateObj);
      });

      dateKeyArray.forEach(key => {
        const date = dates[key];
        if (get(date, "tested")) {
          lastTested = date.tested;
        }
        if (get(date, "growthFactor")) {
          lastGrowthFactor = date.growthFactor;
        }
        if (get(date, "cases")) {
          lastCases = date.cases;
        }
        if (get(date, "deaths")) {
          lastDeaths = date.deaths;
        }
        if (get(date, "recovered")) {
          lastRecovered = date.recovered;
        }
      });

      if (lastGrowthFactor) {
        lastGrowthFactor = +(lastGrowthFactor * 100).toFixed(0);
      }

      const casePercentPopulation = (population
        ? lastCases / population
        : 0
      ).toFixed(4);
      result[key] = {
        ...data[key],
        name,
        emoji,
        lastCases,
        lastDeaths,
        lastTested,
        lastGrowthFactor,
        lastRecovered,
        casePercentPopulation,
        coordinates
      };
      return result;
    }, {});

    yield put(getMapCasesSuccess(result));
  } catch (error) {
    yield put(getMapCasesFailure(error.message));
  }
}

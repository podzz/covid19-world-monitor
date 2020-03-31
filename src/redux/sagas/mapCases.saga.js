import { put } from "redux-saga/effects";
import {
  getMapCasesFailure,
  getMapCasesSuccess
} from "../actions/mapCases.actions";
import { last, keys, sortBy } from "lodash";
import { countries } from "country-data";

export function* getMapCasesSaga() {
  try {
    const response = yield fetch(
      "https://coronadatascraper.com/timeseries-byLocation.json"
    );
    const data = yield response.json();

    const result = yield Object.keys(data).reduce((result, key) => {
      let { coordinates, dates, country } = data[key];
      if (!key.includes(",") && countries[country]) {
        const { name, emoji } = countries[country];
        let { cases, deaths, tested, growthFactor } = dates[
          last(
            sortBy(keys(dates), dateObj => {
              return new Date(dateObj);
            })
          )
        ];

        if (key === "USA") {
          coordinates = [-101.924137, 41.4831411];
        }

        if (growthFactor) {
          growthFactor = (growthFactor * 100).toFixed(0);
        }

        result[key] = {
          ...data[key],
          name,
          emoji,
          lastCases: cases || 0,
          lastDeaths: deaths || 0,
          lastTested: tested || 0,
          lastGrowthFactor: growthFactor || 100,
          coordinates
        };
      }
      return result;
    }, {});

    yield put(getMapCasesSuccess(result));
  } catch (error) {
    yield put(getMapCasesFailure(error.message));
  }
}

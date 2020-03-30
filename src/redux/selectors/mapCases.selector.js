import { values, orderBy, keyBy } from "lodash";

export const selectCountriesList = state => {
  return values(state.mapCases.countries);
};

export const selectCountriesMapByFeatureId = state => {
  return keyBy(selectCountriesList(state), "featureId");
};

export const selectCountriesOrderedByCases = state => {
  return orderBy(selectCountriesList(state), "lastCases", ["desc"]);
};

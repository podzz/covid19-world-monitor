import * as csv from "csvtojson";
import { lookup } from "country-data";
import { transformCountryName } from "./helper";

export const transformCsvToJson = async csvData => {
  return csv()
    .fromString(csvData)
    .then(transformed => {
      const countryMapTimeserie = {};
      transformed.forEach(timeserie => {
        const country = lookup.countries({
          name: transformCountryName(timeserie.Country)
        })[0];

        const newData = {
          date: timeserie.Date,
          confirmed: +timeserie.Confirmed,
          death: +timeserie.Deaths
        };
        if (country) {
          if (!countryMapTimeserie[country.alpha3]) {
            countryMapTimeserie[country.alpha3] = [newData];
          } else {
            countryMapTimeserie[country.alpha3].push(newData);
          }
        }
      });

      return countryMapTimeserie;
    });
};

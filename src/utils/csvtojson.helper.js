import * as csv from "csvtojson";
import { get, omit, keyBy, pick } from "lodash";

export const transformCsvToJson = async csvData => {
  return csv()
    .fromString(csvData)
    .then(transformed => {
      const transformedMap = keyBy(
        transformed,
        data =>
          `${data["Province/State"] ? data["Province/State"] + "-" : ""}${
            data["Country/Region"]
          }`
      );
      return Object.keys(transformedMap).reduce((newMap, key) => {
        omit(transformedMap[key], [
          "Province/State",
          "Country/Region",
          "Lat",
          "Long"
        ]);
        newMap[key] = {
          meta: {
            ...pick(transformedMap[key], [
              "Province/State",
              "Country/Region",
              "Lat",
              "Long"
            ])
          },
          timelines: omit(transformedMap[key], [
            "Province/State",
            "Country/Region",
            "Lat",
            "Long"
          ])
        };
        return newMap;
      }, {});
    });
};

export const mergeTransformedCsv = (
  dataRecovered,
  dataConfirmed,
  dataDeath
) => {
  return Object.keys(dataRecovered).reduce((newMap, key) => {
    newMap[key] = {
      ...dataRecovered[key],
      timelines: Object.keys(dataRecovered[key].timelines).reduce(
        (newArray, date) => {
          const recovered = +dataRecovered[key].timelines[date];
          const confirmed = +(get(dataConfirmed[key], "timelines")
            ? dataConfirmed[key].timelines[date.replace("2020", "20")]
            : 0);
          const death = +(get(dataDeath[key], "timelines")
            ? dataDeath[key].timelines[date.replace("2020", "20")]
            : 0);
          if (recovered > 0 && confirmed > 0 && death > 0) {
            newArray.push({
              date,
              recovered,
              confirmed,
              death
            });
          }
          return newArray;
        },
        []
      )
    };
    return newMap;
  }, {});
};

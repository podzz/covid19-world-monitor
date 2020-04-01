import { get, maxBy } from "lodash";
import { getScaledColorValue, noCasesColor } from "./color";

export const getPolygonData = (
  countries,
  countriesMapByFeatureId,
  mapPolygons
) => {
  const worstCountryPercentage = get(
    maxBy(countries, "casePercentPopulation"),
    "casePercentPopulation"
  );

  return {
    ...mapPolygons,
    features: mapPolygons.features.reduce((result, feature) => {
      let color = noCasesColor;
      const countryForFeature = countriesMapByFeatureId[feature.properties.id];

      if (
        get(countryForFeature, "population") &&
        countryForFeature.lastCases > 0
      ) {
        color = getScaledColorValue(
          countryForFeature.casePercentPopulation,
          worstCountryPercentage
        );
      }
      if (countryForFeature) {
        result.push({
          ...feature,
          properties: {
            ...feature.properties,
            ...countryForFeature,
            color
          }
        });
      }

      return result;
    }, [])
  };
};

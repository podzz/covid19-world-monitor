import { get } from "lodash";
import { default as countriesPolygon } from "../assets/all-countries.json";

export const getPolygonData = countriesMapByFeatureId => ({
  ...countriesPolygon,
  features: countriesPolygon.features.reduce((result, feature) => {
    const countryForFeature = countriesMapByFeatureId[feature.properties.id];
    if (!get(feature.properties, "type_en") && countryForFeature) {
      result.push({
        ...feature,
        properties: {
          ...feature.properties,
          ...countryForFeature
        }
      });
    }

    return result;
  }, [])
});

import { get } from "lodash";

export const getPolygonData = (countriesMapByFeatureId, mapPolygons) => ({
  ...mapPolygons,
  features: mapPolygons.features.reduce((result, feature) => {
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

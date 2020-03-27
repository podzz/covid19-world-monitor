import { lookup } from "country-data";
import { default as CountryCoords } from "./country_coords.json";
import { get, keyBy } from "lodash";

const countryMap = keyBy(CountryCoords, "ISO");

export const convertApiDateToDate = apiDate => {
  const [datePart, timePart] = apiDate.split(" ");
  return new Date(`${datePart}T${timePart}Z`);
};

export const transformCountryName = countryName => {
  switch (countryName) {
    case "UK":
      return "United Kingdom";
    case "USA":
      return "United States";
    case "Iran":
      return "Iran, Islamic Republic Of";
    case "S. Korea":
      return "Korea, Republic Of";
    case "Czechia":
      return "Czech Republic";
    case "Russia":
      return "Russian Federation";
    case "UAE":
      return "United Arab Emirates";
    case "Bosnia and Herzegovina":
      return "Bosnia & Herzegovina";
    case "Laos":
      return "Lao People's Democratic Republic";
    case "Ivory Coast":
      return "Côte d'Ivoire";
    case "Trinidad and Tobago":
      return "Trinidad And Tobago";
    case "Congo":
      return "Republic Of Congo";
    case "Venezuela":
      return "Venezuela, Bolivarian Republic Of";
    case "Palestine":
      return "Palestinian Territory, Occupied";
    case "Bolivia":
      return "Bolivia, Plurinational State Of";
    case "Tanzania":
      return "Tanzania, United Republic Of";
    case "Syria":
      return "Syrian Arab Republic";
    case "Brunei":
      return "Brunei Darussalam";
    case "Vietnam":
      return "Viet Nam";
    case "Faeroe Islands":
      return "Faroe Islands";
    case "Réunion":
      return "Reunion";
    case "Eswatini":
      return "Swaziland";
    case "Timor-Leste":
      return "Timor-Leste, Democratic Republic of";
    case "St. Barth":
      return "Saint Barthélemy";

    case "North Macedonia":
      return "Macedonia, The Former Yugoslav Republic Of";
    case "DRC":
      return "Democratic Republic Of Congo";
    case "Channel Islands":
      return "Jersey";
    case "Isle of Man":
      return "Isle Of Man";
    case "U.S. Virgin Islands":
      return "Virgin Islands (US)";
    case "Curaçao":
      return "Curacao";
    case "Vatican City":
      return "Vatican City State";
    case "Antigua and Barbuda":
      return "Antigua And Barbuda";
    case "CAR":
      return "Central African Republic";
    case "St. Vincent Grenadines":
      return "Saint Vincent And The Grenadines";
    case "Turks and Caicos":
      return "Turks And Caicos Islands";
    default:
      return countryName;
  }
};

export const transformCountries = countries => {
  return countries.reduce((result, country) => {
    const name = transformCountryName(country.country_name);
    const code = lookup.countries({ name })[0];

    if (code && get(countryMap, code.alpha2)) {
      const { lo, la } = get(countryMap, code.alpha2);
      result.push({
        ...country,
        code,
        localisation: {
          lo,
          la
        }
      });
    }

    return result;
  }, []);
};

export const filterCountries = (countries, search) => {
  return countries.filter(country => {
    const country_name = country.country_name.toLowerCase();
    const alpha2 = country.code ? country.code.alpha2.toLowerCase() : "";
    const alpha3 = country.code ? country.code.alpha3.toLowerCase() : "";
    const searchLower = search.toLowerCase();

    return (
      country_name.includes(searchLower) ||
      alpha2.includes(searchLower) ||
      alpha3.includes(searchLower)
    );
  });
};

export const retrieveTimeseriesKeyForCountry = (
  timeseriesCountries,
  country
) => {
  let foundCountry = timeseriesCountries.find(
    timeserieCountry => timeserieCountry === country.country_name
  );

  return foundCountry;
};

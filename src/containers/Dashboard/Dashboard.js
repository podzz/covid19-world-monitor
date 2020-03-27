import React, { useCallback, useEffect, useState } from "react";
import Layout from "../Layout/Layout";
import Sidebar from "../../components/Sidebar/Sidebar";
import { useDispatch, useSelector } from "react-redux";
import { getMapCases } from "../../redux/actions/mapCases.actions";
import Map from "../../components/Map/Map";
import SelectedCountryDialog from "../../components/SelectedCountryDialog/SelectedCountryDialog";
import Spinner from "../../components/Spinner/Spinner";
import { transformCountriesToMapData } from "../../utils/map-helper";
import { getCountryTimeseriesMapCases } from "../../redux/actions/countryTimeseries.actions";
import { retrieveTimeseriesKeyForCountry } from "../../utils/helper";
import { default as countriesPolygon } from "../../assets/countries.json";
import { keyBy } from "lodash";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [getCoordinates, setCoordinates] = useState({
    longitude: 2.2137,
    latitude: 46.2276
  });
  const [getSelectedCountry, setSelectedCountry] = useState(null);
  const [getMapData, setMapData] = useState({});
  const [getMapDataText, setMapDataText] = useState({});

  const countries = useSelector(state => state.mapCases.countries);
  const lastUpdated = useSelector(state => state.mapCases.lastUpdate);
  const loading = useSelector(state => state.mapCases.loading);
  const timeseriesCountries = useSelector(
    state => state.countryTimeseries.countries
  );
  const timeseriesCountriesMap = useSelector(
    state => state.countryTimeseries.timeseriesByCountry
  );

  useEffect(() => {
    dispatch(getMapCases());
    dispatch(getCountryTimeseriesMapCases());
  }, [dispatch]);
  const leftSideBar = (
    <Sidebar
      countries={countries}
      lastUpdated={lastUpdated}
      setCoordinates={setCoordinates}
    ></Sidebar>
  );

  useEffect(() => {
    if (countries.length > 0) {
      const countryByAlpha3 = keyBy(countries, "code.alpha3");
      countriesPolygon.features = countriesPolygon.features.reduce(
        (result, feature) => {
          if (countryByAlpha3[feature.properties.ISO_A3]) {
            const newProperties = {
              ...feature.properties,
              ...countryByAlpha3[feature.properties.ISO_A3],
              count: +countryByAlpha3[feature.properties.ISO_A3].cases.replace(
                ",",
                ""
              )
            };
            result.push({
              ...feature,
              properties: newProperties
            });
          }
          return result;
        },
        []
      );
      setMapData(countriesPolygon);
      setMapDataText(transformCountriesToMapData(countries));
    }
  }, [countries]);

  const onSelectCountry = useCallback(
    countrySelected => {
      const foundKey = retrieveTimeseriesKeyForCountry(
        timeseriesCountries,
        countrySelected
      );
      const timeseries = timeseriesCountriesMap[foundKey];
      if (timeseries) {
        setSelectedCountry({
          country: {
            ...countrySelected,
            code: JSON.parse(countrySelected.code)
          },
          timeseries
        });
      }
    },
    [setSelectedCountry, timeseriesCountries, timeseriesCountriesMap]
  );

  return (
    <React.Fragment>
      <Layout leftSideBar={leftSideBar} lastUpdated={lastUpdated}>
        {Object.keys(getMapData).length > 0 ? (
          <Map
            mapData={getMapData}
            mapDataText={getMapDataText}
            longitude={getCoordinates.longitude}
            latitude={getCoordinates.latitude}
            countrySelected={onSelectCountry}
          ></Map>
        ) : null}
      </Layout>
      {getSelectedCountry ? (
        <SelectedCountryDialog
          selectedCountry={getSelectedCountry}
          discardSelectedCountry={() => setSelectedCountry(null)}
        ></SelectedCountryDialog>
      ) : null}
      {loading ? <Spinner /> : null}
    </React.Fragment>
  );
};

export default Dashboard;

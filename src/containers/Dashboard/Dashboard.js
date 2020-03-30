import { keyBy } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { default as countriesPolygon } from "../../assets/all-countries.json";
import Map from "../../components/Map/Map";
import SelectedCountryDialog from "../../components/SelectedCountryDialog/SelectedCountryDialog";
import Sidebar from "../../components/Sidebar/Sidebar";
import Spinner from "../../components/Spinner/Spinner";
import { getCountryTimeseriesMapCases } from "../../redux/actions/countryTimeseries.actions";
import { getMapCases } from "../../redux/actions/mapCases.actions";
import { transformCountriesToMapData } from "../../utils/map-helper";
import Layout from "../Layout/Layout";

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
          if (countryByAlpha3[feature.properties.A3]) {
            const newProperties = {
              ...feature.properties,
              ...countryByAlpha3[feature.properties.A3],
              count: +countryByAlpha3[feature.properties.A3].cases.replace(
                ",",
                ""
              ),
              longitude: countryByAlpha3[feature.properties.A3].localisation.lo,
              latitude: countryByAlpha3[feature.properties.A3].localisation.la
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
      const timeseries = timeseriesCountriesMap[countrySelected.A3];
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
    [setSelectedCountry, timeseriesCountriesMap]
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

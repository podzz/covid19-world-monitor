import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "../../components/Map/Map";
import SelectedCountryDialog from "../../components/SelectedCountryDialog/SelectedCountryDialog";
import Sidebar from "../../components/Sidebar/Sidebar";
import Spinner from "../../components/Spinner/Spinner";
import { getMapCases } from "../../redux/actions/mapCases.actions";
import {
  selectCountriesMapByFeatureId,
  selectCountriesOrderedByCases
} from "../../redux/selectors/mapCases.selector";
import { getPolygonData } from "../../utils/map-helper";
import Layout from "../Layout/Layout";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [getCoordinates, setCoordinates] = useState({
    longitude: 2.2137,
    latitude: 46.2276
  });
  const [getSelectedCountry, setSelectedCountry] = useState(null);
  const [getMapData, setMapData] = useState({});

  const countries = useSelector(selectCountriesOrderedByCases);
  const countriesMapByFeatureId = useSelector(selectCountriesMapByFeatureId);
  const loading = useSelector(state => state.mapCases.loading);

  useEffect(() => {
    dispatch(getMapCases());
  }, [dispatch]);

  const leftSideBar = (
    <Sidebar countries={countries} setCoordinates={setCoordinates}></Sidebar>
  );

  useEffect(() => {
    setMapData(getPolygonData(countriesMapByFeatureId));
  }, [countriesMapByFeatureId]);

  const onSelectCountry = useCallback(
    countrySelected => {
      setSelectedCountry(countrySelected);
    },
    [setSelectedCountry]
  );

  return (
    <React.Fragment>
      <Layout leftSideBar={leftSideBar}>
        {Object.keys(getMapData).length > 0 ? (
          <Map
            mapData={getMapData}
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

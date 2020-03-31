import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Map from "../../components/Map/Map";
import SelectedCountryDialog from "../../components/SelectedCountryDialog/SelectedCountryDialog";
import SidebarLeft from "../../components/Sidebar/SidebarLeft";
import Spinner from "../../components/Spinner/Spinner";
import { getMapPolygons } from "../../redux/actions/mapPolygons.actions";
import {
  selectCountriesMapByFeatureId,
  selectCountriesOrderedByCases
} from "../../redux/selectors/mapCases.selector";
import { getPolygonData } from "../../utils/map-helper";
import Layout from "../Layout/Layout";
import { selectMapPolygons } from "../../redux/selectors/mapPolygons.selector";
import { getMapCases } from "../../redux/actions/mapCases.actions";
import { isEmpty } from "lodash";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [getCoordinates, setCoordinates] = useState({
    longitude: 2.2137,
    latitude: 46.2276
  });
  const [getSelectedCountry, setSelectedCountry] = useState(null);
  const [getMapData, setMapData] = useState({});

  const countries = useSelector(selectCountriesOrderedByCases);
  const mapPolygons = useSelector(selectMapPolygons);
  const countriesMapByFeatureId = useSelector(selectCountriesMapByFeatureId);
  const loading = useSelector(state => state.mapCases.loading);

  useEffect(() => {
    dispatch(getMapPolygons());
  }, [dispatch]);

  useEffect(() => {
    if (!isEmpty(mapPolygons)) {
      dispatch(getMapCases(mapPolygons));
    }
  }, [dispatch, mapPolygons]);

  useEffect(() => {
    if (!isEmpty(mapPolygons)) {
      setMapData(getPolygonData(countriesMapByFeatureId, mapPolygons));
    }
  }, [countriesMapByFeatureId, mapPolygons]);

  const leftSideBar = (
    <SidebarLeft
      countries={countries}
      setCoordinates={setCoordinates}
    ></SidebarLeft>
  );

  const onSelectCountry = useCallback(
    countrySelected => {
      setSelectedCountry(countrySelected);
    },
    [setSelectedCountry]
  );

  return (
    <React.Fragment>
      <Layout leftSideBar={leftSideBar}>
        {!isEmpty(getMapData) ? (
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

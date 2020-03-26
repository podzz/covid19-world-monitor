import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import axios from "axios";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import "./App.css";
import Map from "./components/Map/Map";
import Sidebar from "./components/Sidebar/Sidebar";
import Layout from "./containers/Layout/Layout";
import { convertApiDateToDate, transformCountries } from "./utils/helper";
import { transformCountriesToMapData } from "./utils/map-helper";
import Spinner from "./components/Spinner/Spinner";
import { HashRouter } from "react-router-dom";
function App() {
  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          type: "dark"
        }
      }),
    []
  );

  const [getCountries, setCountries] = useState([]);
  const [getMapData, setMapData] = useState({});
  const [getLastUpdate, setLastUpdate] = useState(null);
  const [loading, setLoading] = useState(null);
  const [getCoordinates, setCoordinates] = useState({
    longitude: 2.2137,
    latitude: 46.2276
  });
  const [error, setError] = useState(null);

  const getCOVIDCountries = useCallback(async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
        {
          headers: {
            "x-rapidapi-host": process.env.REACT_APP_CovidApi_Host,
            "x-rapidapi-key": process.env.REACT_APP_CovidAPI_Key
          }
        }
      );
      const { statistic_taken_at, countries_stat } = response.data;
      const transformedCountries = transformCountries(countries_stat);
      setCountries(transformedCountries);
      setMapData(transformCountriesToMapData(transformedCountries));
      setLastUpdate(convertApiDateToDate(statistic_taken_at));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }, [setCountries, setLastUpdate, setError]);

  useEffect(() => {
    getCOVIDCountries();
  }, [getCOVIDCountries]);
  const leftSideBar = (
    <Sidebar
      countries={getCountries}
      lastUpdated={getLastUpdate}
      setCoordinates={setCoordinates}
    ></Sidebar>
  );
  return (
    <HashRouter basename="/">
      <ThemeProvider theme={theme}>
        <div className="App">
          <Layout leftSideBar={leftSideBar} lastUpdated={getLastUpdate}>
            {Object.keys(getMapData).length > 0 ? (
              <Map
                mapData={getMapData}
                longitude={getCoordinates.longitude}
                latitude={getCoordinates.latitude}
              ></Map>
            ) : null}
          </Layout>
          {loading ? <Spinner /> : null}
        </div>
      </ThemeProvider>
    </HashRouter>
  );
}

export default App;

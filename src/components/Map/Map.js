import { Paper } from "@material-ui/core";
import { first } from "lodash";
import React, { useCallback, useEffect, useRef, useState } from "react";
import MapGL, { FlyToInterpolator, Layer, Source } from "react-map-gl";
import { clusterLayer } from "./layers";
import "./Map.css";

const Map = ({ mapData, longitude, latitude, countrySelected }) => {
  const [viewport, setViewport] = useState({
    latitude: 46.2276,
    longitude: 2.2137,
    zoom: 4
  });
  const [tooltip, setTooltip] = useState({
    hoveredFeature: null,
    x: 0,
    y: 0
  });

  const _sourceRef = useRef();

  const onViewportChange = useCallback(
    viewport =>
      setViewport(oldViewPort => ({
        ...oldViewPort,
        ...viewport
      })),
    [setViewport]
  );

  const goToViewport = useCallback(
    ({ longitude, latitude }) => {
      onViewportChange({
        longitude,
        latitude,
        zoom: 4,
        transitionInterpolator: new FlyToInterpolator({ speed: 1.2 }),
        transitionDuration: "auto"
      });
    },
    [onViewportChange]
  );

  useEffect(() => {
    if (longitude && latitude) {
      goToViewport({ longitude, latitude });
    }
  }, [longitude, latitude, goToViewport]);

  const onHover = useCallback(
    event => {
      const {
        features,
        srcEvent: { offsetX, offsetY }
      } = event;
      const findState = (features || []).filter(
        feature => feature.properties.state
      );
      const hoveredFeature =
        findState.length > 0 ? findState[0] : first(features);
      setTooltip({ hoveredFeature, x: offsetX, y: offsetY });
    },
    [setTooltip]
  );

  const onClick = useCallback(
    event => {
      const { features } = event;
      const findState = (features || []).filter(
        feature => feature.properties.state
      );
      const hoveredFeature =
        findState.length > 0 ? findState[0] : first(features);
      if (hoveredFeature) {
        const { properties } = hoveredFeature;
        countrySelected(properties);
      }
    },
    [countrySelected]
  );

  const renderTooltip = useCallback(() => {
    const { hoveredFeature, x, y } = tooltip;

    if (hoveredFeature) {
      let stateOrCountry = (
        <div>
          <b>Country</b>: {hoveredFeature.properties.name}
        </div>
      );
      if (hoveredFeature.properties.state) {
        stateOrCountry = (
          <div>
            <b>State</b>:{" "}
            {hoveredFeature.properties.shortName ||
              hoveredFeature.properties.county ||
              hoveredFeature.properties.region ||
              hoveredFeature.properties.state}
          </div>
        );
      }
      return (
        <Paper className="tooltip" style={{ left: x, top: y }}>
          {stateOrCountry}
          <div>
            <b>Cases:</b> {hoveredFeature.properties.lastCases}
          </div>
          <div>
            <b>Recovered:</b> {hoveredFeature.properties.lastRecovered}
          </div>
          <div>
            <b>Deaths:</b> {hoveredFeature.properties.lastDeaths}
          </div>
          <div>
            <b>Population affected:</b>{" "}
            {hoveredFeature.properties.casePercentPopulation * 100} %
          </div>

          <div>
            <b>Growth factor:</b> {hoveredFeature.properties.lastGrowthFactor} %
          </div>
          <div className="tooltip-click">
            <b>
              <u>Click to see more statistics</u>
            </b>
          </div>
        </Paper>
      );
    }

    return false;
  }, [tooltip]);

  return (
    <div className="Map">
      <MapGL
        {...viewport}
        width="100%"
        height="100%"
        mapStyle="mapbox://styles/flash11/ck8gwpkts0njw1ip6l2jked9v"
        onViewportChange={onViewportChange}
        mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
        interactiveLayerIds={[clusterLayer.id]}
        onHover={onHover}
        onClick={onClick}
      >
        <Source type="geojson" data={mapData} ref={_sourceRef}>
          <Layer {...clusterLayer} />
        </Source>
        {renderTooltip()}
      </MapGL>
    </div>
  );
};

export default Map;

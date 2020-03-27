import React, { useRef, useState, useEffect, useCallback } from "react";
import ReactMapGL, { Layer, Source, FlyToInterpolator } from "react-map-gl";
import { clusterCountLayer, clusterLayer } from "./layers";
import "./Map.css";
import { Paper } from "@material-ui/core";
import { retrieveFeatureFromEvent } from "../../utils/map-helper";

const Map = ({
  mapData,
  mapDataText,
  longitude,
  latitude,
  countrySelected
}) => {
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
  const [width, setWidth] = useState("100%");

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

  const onResizeHandler = useCallback(() => {
    setWidth("100%");
  }, [setWidth]);

  const onHover = useCallback(
    event => {
      setTooltip(retrieveFeatureFromEvent(event));
    },
    [setTooltip]
  );

  const onClick = useCallback(
    event => {
      const { hoveredFeature } = retrieveFeatureFromEvent(event);
      if (hoveredFeature) {
        const { properties } = hoveredFeature;
        countrySelected(properties);
      }
    },
    [countrySelected]
  );

  const renderTooltip = useCallback(() => {
    const { hoveredFeature, x, y } = tooltip;

    return (
      hoveredFeature && (
        <Paper className="tooltip" style={{ left: x, top: y }}>
          <div>
            <b>Country</b>: {hoveredFeature.properties.country_name}
          </div>
          <div>
            <b>Cases:</b> {hoveredFeature.properties.cases}
          </div>
          <div>
            <b>Deaths:</b> {hoveredFeature.properties.deaths}
          </div>
          <div>
            <b>Total recovered:</b> {hoveredFeature.properties.total_recovered}
          </div>
          <div>
            <b>Active cases:</b> {hoveredFeature.properties.active_cases}
          </div>
          <div className="tooltip-click">
            <b>
              <u>Click to see more statistics</u>
            </b>
          </div>
        </Paper>
      )
    );
  }, [tooltip]);

  return (
    <div className="Map">
      <ReactMapGL
        width={width}
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        {...viewport}
        onViewportChange={onViewportChange}
        onResize={onResizeHandler}
        mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
        interactiveLayerIds={[clusterLayer.id]}
        onHover={onHover}
        onClick={onClick}
      >
        <Source
          id="countryText"
          type="geojson"
          data={mapDataText}
          ref={_sourceRef}
        >
          <Layer {...clusterCountLayer} />
        </Source>
        <Source type="geojson" data={mapData} ref={_sourceRef}>
          <Layer {...clusterLayer} />
        </Source>
        {renderTooltip()}
      </ReactMapGL>
    </div>
  );
};

export default Map;

import React, { useRef, useState, useEffect, useCallback } from "react";
import ReactMapGL, { Layer, Source, FlyToInterpolator } from "react-map-gl";
import { clusterCountLayer, clusterLayer } from "./layers";
import "./Map.css";

const Map = ({ mapData, longitude, latitude }) => {
  const [viewport, setViewport] = useState({
    latitude: 46.2276,
    longitude: 2.2137,
    zoom: 4
  });
  const _sourceRef = useRef();

  const [width, setWidth] = useState("100%");

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

  return (
    <div className="Cursor">
      <ReactMapGL
        width={width}
        height="100%"
        mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
        {...viewport}
        onViewportChange={onViewportChange}
        onResize={onResizeHandler}
        mapboxApiAccessToken={process.env.REACT_APP_MapboxAccessToken}
        interactiveLayerIds={[clusterLayer.id]}
      >
        <Source type="geojson" data={mapData} ref={_sourceRef}>
          <Layer {...clusterCountLayer} />
          <Layer {...clusterLayer} />
        </Source>
      </ReactMapGL>
    </div>
  );
};

export default Map;

import React, { useEffect } from "react";
import { Box } from "@mui/material";
import {
  MapContainer,
  ImageOverlay,
  GeoJSON,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const squareGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Test Square" },
      geometry: {
        type: "Polygon",
        coordinates: [
          [
            [100, 100],
            [300, 100],
            [300, 300],
            [100, 300],
            [100, 100], // close ring
          ],
        ],
      },
    },
  ],
};

// 2) Loud style so you can't miss it
const squareStyle = () => ({
  color: "#ff0000",
  weight: 4,
  opacity: 1,
  fillColor: "#00ff00",
  fillOpacity: 0.6,
});

// 3) Create panes *programmatically* so we don't fight <Pane> quirks
function InitPanes() {
  const map = useMap();

  useEffect(() => {
    // base pane for the image
    const basePane = map.createPane("base");
    basePane.style.zIndex = "200";

    // regions pane for GeoJSON
    const regionsPane = map.createPane("regions");
    regionsPane.style.zIndex = "400";

    // optional: keep the image from eating mouse events
    const css = document.createElement("style");
    css.textContent = `
      .leaflet-pane.leaflet-base-pane img.leaflet-image-layer {
        pointer-events: none;
      }
    `;
    document.head.appendChild(css);

    return () => {
      // Leaflet doesn't really have a "destroy pane" API; this is just demo code.
      // In a real app you'd leave panes for the lifetime of the map.
    };
  }, [map]);

  return null;
}

export function DivisionMap2() {
  // pixel bounds of your AVIF
  const bounds = [
    [0, 0],
    [891, 1584],
  ];

  return (
    <Box sx={{ width: "100%", height: 600 }}>
      <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds} // let Leaflet auto-center/zoom
        style={{ width: "100%", height: "100%" }}
      >
        {/* create custom panes */}
        <InitPanes />

        {/* base image in 'base' pane */}
        <ImageOverlay
          url="/division_2_map.avif"
          bounds={bounds}
          pane="base"
          opacity={1} // you can temporarily set to 0.5 if you want to check overlap
        />

        {/* square in 'regions' pane (above image) */}
        <GeoJSON
          data={squareGeoJSON}
          style={squareStyle}
          pane="regions"
          onEachFeature={(feature, layer) => {
            console.log("Square bounds:", layer.getBounds());
          }}
        />
      </MapContainer>
    </Box>
  );
}
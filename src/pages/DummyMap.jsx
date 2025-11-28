import React, { useEffect } from "react";
import { Box } from "@mui/material";
import {
  MapContainer,
  ImageOverlay,
  GeoJSON,
  useMap,
  useMapEvents,
  Polygon,
  Pane,
  SVGOverlay,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { PinLayer } from "./Map/PinLayer";
import { RegionLayer } from "./Map/RegionLayer";

const squareGeoJSON = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      properties: { name: "Test Square" },
      geometry: {
        type: "Polygon",
        coordinates: [
          
        ],
      },
    },
  ],
};

const squareStyle = () => ({
  color: "#ff0000",
  weight: 4,
  opacity: 1,
  fillColor: "#00ff00",
  fillOpacity: 0.6,
});




export function DivisionMap2() {
  const polygon = [
    [
        378,
        268.59999084472656
    ],
    [
        453,
        239.59999084472656
    ],
    [
        548,
        239.59999084472656
    ],
    [
        540,
        253.59999084472656
    ],
    [
        534,
        259.59999084472656
    ],
    [
        534,
        279.59999084472656
    ],
    [
        570,
        303.59999084472656
    ],
    [
        562,
        307.59999084472656
    ],
    [
        561,
        317.59999084472656
    ],
    [
        571,
        325.59999084472656
    ],
    [
        534,
        387.59999084472656
    ],
    [
        534,
        417.59999084472656
    ],
    [
        534,
        469.59999084472656
    ],
    [
        388,
        467.59999084472656
    ],
    [
        378,
        268.59999084472656
    ]
]
  // pixel bounds of your AVIF
  const bounds = [
    [0, 0],
    [891, 1584],
  ];

  return (
    <Box sx={{ width: "100%", height: 600 }}>
      <MapContainer
        crs={L.CRS.Simple}
        minZoom={-1}
        bounds={bounds} // let Leaflet auto-center/zoom
        style={{ width: "100%", height: "100%" }}
      >
        
        <Pane name="base" style={{zIndex: 200}}></Pane>
        {/* base image in 'base' pane */}
        <ImageOverlay
          url="/division_2_map.avif"
          bounds={bounds}
          pane="base"
          opacity={1} // you can temporarily set to 0.5 if you want to check overlap
        />

        {/* square in 'regions' pane (above image) */}
        
        <Pane name="regions" style={{zIndex: 200}}></Pane>
        <PinLayer></PinLayer>
        <SVGOverlay bounds={bounds}>
          
        </SVGOverlay>
       <RegionLayer></RegionLayer>
        <ClickCapture/>
      </MapContainer>
    </Box>
  );
}

function ClickCapture() {
  const coords = []
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;          // Leaflet order
      // CRS.Simple tip: treat as image coords [y=lat, x=lng]
      if(coords.length === 0){
        coords.push([lat, lng])
        coords.push([lat, lng])
      }
      else{
        const pop = coords.pop();
        coords.push([lat, lng])
        coords.push(pop)
      }
      // If you want GeoJSON order [x, y] == [lng, lat]:
      console.log(coords);
    },
  });
  return null;
}
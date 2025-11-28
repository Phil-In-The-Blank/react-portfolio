import { Box } from "@mui/material"
import { useCallback, useEffect, useRef, useState } from "react"
import { ImageOverlay, MapContainer, useMap, useMapEvents, GeoJSON, Pane} from "react-leaflet"
import { geoJSON } from "../shared/constants"
import L from "leaflet";

const regionStyle = () => ({
  color: "#ff0000",
  weight: 5,
  opacity: 1,
  fillColor: "#00ff00",
  fillOpacity: 0.6,
});

export function DivisionMap() {
  

const onEachFeature = (feature, layer) => {
  layer.bringToFront();

};
  const setColor = ({ properties }) => ({
    color: '#ff0000',      // bright red stroke
  weight: 5,             // thick line
  opacity: 1,
  fillColor: '#00ff00',  // bright green fill
  fillOpacity: 0.6}
  );
  const bounds = [[0,0], [891,1584]]
  const baseUrl = import.meta.env.VITE_API_BASE_URL
    const testLocations = [
    {
        key: 'foggy_bottom',
        type: 'region', // Will determine Z index
        posX: .42,
        posY: .88,
        width: .1,
        height: .1
    },
    {
        key: 'bank_headquarters',
        type: 'mission', // Will determine Z index
        posX: .375,
        posY: .41,
        width: .05,
        height: .05
    }
]

const testLootMappings = [
    {key: 'bank_headquarters', icon: '511'},
    {key: 'foggy_bottom', icon: 'wyvern_wear'}
]

    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const [baseImg, setBaseImg] = useState(null);
    const [lootMapping, setLootMapping] = useState(null);
    const [icons, setIcons] = useState(null);

    const [iconLocations, setIconLocations] = useState(null)


    // Get api data
    

    

const bound = [
    [0, 0],
    [891, 1584],
  ];

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
            [100, 100],
          ],
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
  zIndex: 2
});
  
    return(
//     <>
//     <Box sx={{
//         position: "relative", height: "100%", minHeight: 0, width: "100%"
//       }}>
//         <Box sx={{ position: 'absolute', inset: 0 }}>
//       <MapContainer
//       crs= {L.CRS.Simple}
//       maxBounds={bounds}
//       center={[bounds[1][0]/2, bounds[1][1]/2]}
//       zoom={-1}
      
//       style={{height: "100%", width: "100%"}}
//       whenReady={(e) => e.target.invalidateSize()}
//       >

        
//         <Pane name="base" style={{zIndex: 200}}>
//           {/* <ImageOverlay pane="base" url="/division_2_map.avif" bounds={bounds} style={{}}/> */}
//         </Pane>

//         <Pane name="regions" style={{zIndex: 400}}>
// <RegionsLayer data={geoJSON}/>
//         </Pane>
//         <SetView center={[bounds[1][0], bounds[1][1]/2]} zoom={-1} />
        
//         <ClickCapture/>
//       </MapContainer>
      
//          {/* <div ref={containerRef} style={{ width: '100%', maxWidth: 1200, margint: '0 auto'}}>
//             <canvas ref={canvasRef} id="dcCanvas" style={{maxWidth: "100%", height: "auto"}}></canvas>
//         </div> */}
//         </Box>
//         </Box>
//         </>
  <Box sx={{ width: "100%", height: 600 /* <== hardcoded so it's visible */ }}>
       <MapContainer
        crs={L.CRS.Simple}
        bounds={bounds}
        style={{ width: "100%", height: "100%" }}
      >
        {/* 1) Base image pane (lower z-index) */}
      
          <ImageOverlay url="/division_2_map.avif" bounds={bounds}  />
       

        {/* 2) Regions pane (higher z-index) */}
       
          <GeoJSON data={squareGeoJSON} style={squareStyle} onEachFeature={onEachFeature}/>
      
      </MapContainer>
    </Box>
    )
}
// TODO: Refactor once this is working
function drawSvgIcon(ctx, icon, cx, cy, size, opts = {}) {
  const [minX, minY, vbW, vbH] = icon.viewBox;
  const scale = size / Math.max(vbW, vbH);

  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(scale, scale);
  ctx.translate(-(minX + vbW / 2), -(minY + vbH / 2));

  const { fill = "white", stroke = "black", lineWidth = 2 / scale, shadow = false } = opts;
  if (shadow) {
    ctx.shadowColor = "rgba(0,0,0,0.4)";
    ctx.shadowBlur = 8 / scale;
    ctx.shadowOffsetY = 4 / scale;
  }

  for (const seg of icon.paths) {
    if (!seg.d) continue;
    const path = new Path2D(seg.d);
    // prefer per-path fill/stroke, then fall back to provided opts
    const pathFill = seg.fill ?? fill;
    const pathStroke = seg.stroke ?? stroke;

    if (pathFill) {
      ctx.fillStyle = pathFill;
      ctx.fill(path);
    }
    if (pathStroke) {
      ctx.lineWidth = lineWidth;
      ctx.strokeStyle = pathStroke;
      ctx.stroke(path);
    }
  }

  ctx.restore();
}

function SetView({ center, zoom }) {
  const map = useMap();
  useEffect(() => { map.setView(center, zoom, { animate: false }); }, [center, zoom, map]);
  return null;
}

function ClickCapture() {
  const coords = []
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;          // Leaflet order
      // CRS.Simple tip: treat as image coords [y=lat, x=lng]
      if(coords.length === 0){
        coords.push([lng, lat])
        coords.push([lng, lat])
      }
      else{
        const pop = coords.pop();
        coords.push([lng, lat])
        coords.push(pop)
      }
      // If you want GeoJSON order [x, y] == [lng, lat]:
      console.log(coords);
    },
  });
  return null;
}



function RegionsLayer({data}){
  const map = useMap();
  const onEachFeature = useCallback(
    (feature, layer) => {
      const bounds = layer.getBounds();
      console.log("Foggy bounds", bounds);
      // for debugging, zoom to the region; remove this once you're happy
      // map.fitBounds(bounds, { padding: [20, 20] });
    },
    [map]
  );

  return (
    <GeoJSON
      data={data}
      style={regionStyle}
      pane="regions"
      onEachFeature={onEachFeature}
    />
  );
}
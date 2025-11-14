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

    // Initial Render
    useEffect(() => {
        const base = new Image();
        base.src = '/division_2_map.avif'
        base.onload = () => {
            setBaseImg(base);
        }

        let cancelled = false;

    (async () => {
      try {
        const result = await loadIconSprite("/test-library.svg");
        if (!cancelled) setIcons(result);
      } catch (err) {
        console.error("Failed to load sprite:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
    }, [])

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

async function loadIconSprite(url) {
  const resp = await fetch(url, { cache: "no-store" });
  const text = await resp.text();
  const doc = new DOMParser().parseFromString(text, "image/svg+xml");

  // Support <symbol id="..."> inside a sprite
  const symbols = Array.from(doc.querySelectorAll("symbol"));

  // If your file has <svg><g id="..."><path/></g>...</svg>, fall back to groups:
  const groupsAsSymbols =
    symbols.length === 0
      ? Array.from(doc.querySelectorAll("svg > g[id]")).map((g) => {
          const sym = doc.createElementNS("http://www.w3.org/2000/svg", "symbol");
          sym.setAttribute("id", g.getAttribute("id") || "");
          const vb = doc.querySelector("svg")?.getAttribute("viewBox");
          if (vb) sym.setAttribute("viewBox", vb);
          // move children into the faux symbol
          Array.from(g.childNodes).forEach((n) => sym.appendChild(n.cloneNode(true)));
          return sym;
        })
      : [];

  const nodes = symbols.length ? symbols : groupsAsSymbols;

  // Build a dictionary: id -> { viewBox: [x,y,w,h], paths: [{d, fill, stroke}] }
  const ICONS = {};

  for (const sym of nodes) {
    const id = sym.getAttribute("id") || crypto.randomUUID();
    const vb = (sym.getAttribute("viewBox") || "0 0 24 24").split(/\s+/).map(Number);

    const paths = Array.from(sym.querySelectorAll("path")).map((p) => ({
      d: p.getAttribute("d") || "",
      fill: p.getAttribute("fill") || undefined,
      stroke: p.getAttribute("stroke") || undefined,
    }));

    // You can also flatten <rect>, <circle>, etc. into paths — but sticking to <path> keeps it simple.
    ICONS[id] = { viewBox: [vb[0], vb[1], vb[2], vb[3]], paths };
  }

  return ICONS;
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
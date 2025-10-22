import { useEffect, useRef, useState } from "react"



export function Map() {
    const testLocations = [
    {
        key: 'foggy_bottom',
        type: 'region', // Will determine Z index
        posX: .3,
        posY: .66,
        width: .1,
        height: .1
    },
    {
        key: 'bank_headquarters',
        type: 'mission', // Will determine Z index
        posX: .3,
        posY: .285,
        width: .05,
        height: .05
    }
]

const testLootMappings = [
    {key: 'bank_headquarters', icon: 'square1'},
    {key: 'foggy_bottom', icon: 'square3'}
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

    // get location data here, and icon to location mapping (2 separate web requests)
    setIconLocations(testLocations)
    setLootMapping(testLootMappings)

    return () => {
      cancelled = true;
    };
    }, [])

    // Set sizing after init
    useEffect(() => {
    if (!baseImg || !icons) return;

    const canvas = canvasRef.current;
    const container = containerRef.current;
    const ctx = canvas.getContext("2d");

    const render = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = container.clientWidth;
      const aspect = baseImg.width / baseImg.height;
      const cssW = w;
      const cssH = cssW / aspect;

      canvas.width = Math.round(cssW * dpr);
      canvas.height = Math.round(cssH * dpr);
      canvas.style.width = `${cssW}px`;
      canvas.style.height = `${cssH}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, cssW, cssH);
      ctx.drawImage(baseImg, 0, 0, cssW, cssH);

      // convert image -> canvas coords
      if(icons && iconLocations && lootMapping)
      iconLocations.forEach((location) => {
        const icon = lootMapping.find( loot => loot.key === location.key).icon
        const cx = location.posX * cssW;
        const cy = location.posY * cssH;
        const scaleX = cssW / baseImg.width;
        const scaleY = cssH / baseImg.height;
        if(location.type === 'region'){
            ctx.save()
            ctx.globalAlpha = 0.5
            drawSvgIcon(ctx, icons[icon], cx, cy, 96, { fill:"yellow", stroke: "yellow", lineWidth: 2 })
            ctx.restore()
        }
        else
        drawSvgIcon(ctx, icons[icon], cx, cy, 16, { stroke: "white", lineWidth: 2 })
      })
      
      
      // draw the SVG icon (e.g., 32px visual size)
        
    
        
    // {
    //     fill: "#8B5CF6",
    //     stroke: "white",
    //     lineWidth: 2
    //   }
  
    };

    render();
    window.addEventListener("resize", render);
    return () => window.removeEventListener("resize", render);
  }, [baseImg, icons, lootMapping, iconLocations]);

  const handleClick = (e) => {
    if (!baseImg) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const cssX = e.clientX - rect.left;
    const cssY = e.clientY - rect.top;
    const aspect = baseImg.width / baseImg.height;
    const cssW = rect.width;
    const cssH = cssW / aspect;

    setIconPosImg({
      x: cssX / cssW,
      y: cssY / cssH,
    });
  };
    return(
        <div ref={containerRef} style={{ width: '100%', maxWidth: 1200, margint: '0 auto'}}>
            <canvas ref={canvasRef} id="dcCanvas" style={{maxWidth: "100%", height: "auto"}}></canvas>
        </div>
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
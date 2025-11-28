import * as L from 'leaflet'
import { useEffect, useState } from 'react'
import { Marker } from 'react-leaflet'
import './PinLayer.css'

export function PinLayer() {
    const testMarkers = [
        {
            position: [100, 100],
            iconId: 'wyvern_wear'
        },
        {
            position: [600, 600],
            iconId: 'pistol'
        },
    ]


    const [icons, setIcons] = useState(null)
    useEffect(() => {
         let cancelled = false;
    (async () => {
      try {
        const result = await loadIcons("/test-library.svg");
        if (!cancelled) setIcons(result);
      } catch (err) {
        console.error("Failed to load sprite:", err);
      }
    })();

    return () => {
      cancelled = true;
    };
    }, [])

    if(icons === null){
       return ( <></>)
    }
    return(
        <>
            {  testMarkers.map((marker) => (
                icons !== null && icons[marker.iconId] ?
                <Marker position={marker.position} icon={L.divIcon({
                    html: `<div class="map-icon-wrapper">${icons[marker.iconId]}</div>`,
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    className: 'test'
                })}></Marker> : <></>
            )) }
        </>
    )
}

async function loadIcons(url) {
    const resp = await fetch(url, { cache: "no-store" });
    const text = await resp.text();
    const doc = new DOMParser().parseFromString(text, "image/svg+xml");
    const symbols = Array.from(doc.querySelectorAll("symbol"));

    const ICONS = {};

  for (const sym of symbols) {
    const id = sym.getAttribute("id");
    const vb = (sym.getAttribute("viewBox") || "0 0 24 24").split(/\s+/).map(Number);

    const paths = Array.from(sym.querySelectorAll("path")).map((p) => (
        `<path d="${p.getAttribute('d')}"></path>`
    
    ));
    ICONS[id] = 
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb.join(' ')}" class="map-icon-svg">
        ${paths.join('')}
    </svg>
    `;
  }

  return ICONS;
}
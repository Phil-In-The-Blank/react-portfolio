import * as L from 'leaflet'
import { useEffect, useState } from 'react'
import { Marker } from 'react-leaflet'
import './PinLayer.css'
import { loadIcons } from '../../shared/constants'

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
                <Marker key={marker.iconId} position={marker.position} icon={L.divIcon({
                    html: `<div class="map-icon-wrapper">${icons[marker.iconId]}</div>`,
                    iconSize: [50, 50],
                    iconAnchor: [25, 25],
                    className: 'test',
                })}></Marker> : <></>
            )) }
        </>
    )
}
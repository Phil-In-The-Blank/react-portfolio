export const geoJSON = {type: "FeatureCollection", features: [
    {
        type: "Feature",
        id: "01",
        properties: {
            name: "Foggy Bottom"
        },
        geometry: {
            type: "Polygon",
            coordinates: [[
    [
        239.59999084472656,
        523
    ],
    [
        251.59999084472656,
        520
    ],
    [
        255.59999084472656,
        514
    ],
    [
        276.59999084472656,
        512
    ],
    [
        297.59999084472656,
        549
    ],
    [
        301.59999084472656,
        543
    ],
    [
        315.59999084472656,
        543
    ],
    [
        319.59999084472656,
        551
    ],
    [
        383.59999084472656,
        512
    ],
    [
        416.59999084472656,
        514
    ],
    [
        467.59999084472656,
        512
    ],
    [
        466.59999084472656,
        358
    ],
    [
        265.59999084472656,
        356
    ],
    [
        235.59999084472656,
        427
    ],
    [
        239.59999084472656,
        523
    ]
]]
        }
    }
]}

export async function loadIcons(url) {
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


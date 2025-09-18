export const layerConfig = {

  "A02": {
    id: "data-layer",
    type: "fill",
    file: "kpiData", 
    paint: {
      "fill-color": [
        "interpolate",
        ["linear"],
        ["get", "pct_accessible"],
        10, "#f7fbff",
        20, "#deebf7",
        30, "#c6dbef",
        40, "#9ecae1",
        50, "#6baed6",
        60, "#4292c6",
        70, "#2171b5",
        80, "#08519c",
        90, "#08306b"
      ],
      "fill-opacity": 0.8,
      "fill-outline-color": "#333333",
    },
    tooltipProperties: [
      {
        label: "Pop% with transit access: ",
        property: "pct_accessible",
        suffix: "%"
      },
    ],
  },
  
};
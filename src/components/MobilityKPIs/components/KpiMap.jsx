import {
  Box,
  IconButton, // Import IconButton
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useCallback, useRef, useState } from "react";
import Map from "react-map-gl/mapbox";

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const baseLayers = [
  { label: "Light", value: "mapbox://styles/mapbox/light-v11" },
  { label: "Dark", value: "mapbox://styles/mapbox/dark-v11" },
];

// SVG for the compass needle
const NorthArrow = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" fill="#333" />
  </svg>
);

const WebMap = ({ kpi }) => {
  const [mapStyle, setMapStyle] = useState(baseLayers[0].value);
  const mapRef = useRef(null);
  const [viewport, setViewport] = useState({
    longitude: 75.7873,
    latitude: 26.9124,
    zoom: 11,
    bearing: 0, // Initialize bearing
    pitch: 0, // Initialize pitch
  });

  // --- STEP 1: Add state to track the map's bearing ---
  const [bearing, setBearing] = useState(0);

  const handleStyleChange = (event, newStyle) => {
    if (newStyle !== null) {
      setMapStyle(newStyle);
    }
  };

  // --- STEP 2: Create a function to reset the map's bearing ---
  const handleResetNorth = useCallback(() => {
    mapRef.current?.easeTo({ bearing: 0, pitch: 0 });
  }, []);

  if (!MAPBOX_TOKEN) {
    return (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "grey.200",
        }}
      >
        <Typography color="error">Mapbox token is missing.</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        height: 700,
        width: "100%",
        mt: 2,
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Map
        ref={mapRef}
        {...viewport}
        onMove={(evt) => {
          setViewport(evt.viewState);
          setBearing(evt.viewState.bearing);
        }}
        style={{
          width: "100%",
          height: "100%",
        }}
        mapStyle={mapStyle}
        mapboxAccessToken={MAPBOX_TOKEN}
      ></Map>

      {/* Base Layer Switcher */}
      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "rgba(255, 255, 255, 0.9)",
        }}
      >
        <ToggleButtonGroup
          value={mapStyle}
          exclusive
          onChange={handleStyleChange}
          aria-label="map style"
          size="small"
        >
          {baseLayers.map((layer) => (
            <ToggleButton
              key={layer.value}
              value={layer.value}
              aria-label={layer.label}
              sx={{ width: 80 }}
            >
              {layer.label}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Paper>

      <Paper
        elevation={3}
        sx={{
          position: "absolute",
          top: 60,
          right: 10,
          borderRadius: "50%",
        }}
      >
        <IconButton
          onClick={handleResetNorth}
          aria-label="reset north"
          sx={{
            transform: `rotate(${bearing}deg)`,
            transition: "transform 0.2s ease-in-out",
          }}
        >
          <NorthArrow />
        </IconButton>
      </Paper>

      {kpi && (
        <Box
          sx={{
            position: "absolute",
            top: 10,
            left: 10,
            padding: 1,
            backgroundColor: "yellow",
            opacity: 0.5,
            fontFamily: "monospace",
          }}
        >
          <Typography variant="caption">Active KPI: {kpi.code}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default WebMap;

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { Box, IconButton, Paper } from "@mui/material";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

// Components
import BigMap from "./components/BigMap";
import LayerControl from "./components/LayerControl";

const MobilityMap = () => {
  const [visibleLayers, setVisibleLayers] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  const handleLayerToggle = (layer, isChecked) => {
    setVisibleLayers((prev) =>
      isChecked ? [...prev, layer] : prev.filter((l) => l.id !== layer.id)
    );
  };

  const panelWidth = 200;

  return (
    <Box>
      {/* Main Box */}
      <Paper
        elevation={1}
        sx={{
          height: "85vh", // Fills 85% of the viewport height (mobile-friendly)
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Box sx={{ height: "100%", width: "100%", zIndex: 1 }}>
          <BigMap visibleLayers={visibleLayers} />
        </Box>

        <Box
          sx={{
            position: "absolute",
            left: 0,
            top: "50%",
            zIndex: 2,
            display: "flex",
            alignItems: "center",
            transform: `translateX(${
              isPanelOpen ? 0 : `-${panelWidth}px`
            }) translateY(-50%)`,
            transition: "transform 300ms ease-in-out",
          }}
        >
          {/* Control Panel */}
          <Paper
            elevation={2}
            sx={{
              width: panelWidth,
              p: 2,
              mr: 1,
              overflowY: "auto",
            }}
          >
            <LayerControl onLayerToggle={handleLayerToggle} />
          </Paper>

          {/* Toggle Icon */}
          <IconButton
            onClick={() => setIsPanelOpen(!isPanelOpen)}
            sx={{
              backgroundColor: "white",
              border: "1.5px solid #ddd",
              "&:hover": { backgroundColor: "#ffffff" },
              transform: isPanelOpen ? "rotate(0deg)" : "rotate(180deg)",
              transition: "transform 300ms ease-in-out",
            }}
          >
            <ChevronLeftIcon />
          </IconButton>
        </Box>
      </Paper>
    </Box>
  );
};

export default MobilityMap;

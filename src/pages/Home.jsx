import { Box, Container } from "@mui/material";
import { useState } from "react";

// Home Page Components
import LayerDescription from "../components/common/LayerDescription";
import NavigationButtons from "../components/common/NavigationButtons";
import TitleBanner from "../components/common/TitleBanner";
// Sub Pages
import TeamAbout from "../components/TeamAbout/TeamAbout";
import DataCatalogue from "../components/DataCatalogue/DataCatalogue";
import MobilityKPIs from "../components/MobilityKPIs/MobilityKPIs";
import MobilityMap from "../components/MobilityMap/MobilityMap";
// Icons
import AssessmentIcon from "@mui/icons-material/Assessment";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MapIcon from "@mui/icons-material/Map";
import MenuBookIcon from "@mui/icons-material/MenuBook";

function Home() {
  const [activeLayer, setActiveLayer] = useState("map");
  const mapNavigationButtons = [
    { id: "map", text: "Mobility Map", icon: <MapIcon /> },
    { id: "goals", text: "Mobility Scorecard", icon: <AssessmentIcon /> },
    { id: "catalogue", text: "Data Catalogue", icon: <MenuBookIcon /> },
    { id: "about", text: "About the Initiative", icon: <InfoOutlinedIcon /> },
  ];

  const handleLayerChange = (layerId) => {
    setActiveLayer(layerId);
  };

  return (
    <Box>
      {/* Title banner */}
      <Box>
        <TitleBanner />
      </Box>

      {/* Navigation */}
      <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
        <NavigationButtons
          buttons={mapNavigationButtons}
          onButtonClick={handleLayerChange}
          activeButtonId={activeLayer}
        />
      </Box>

      <Container maxWidth="lg">
        {/* Description */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          <LayerDescription activeLayer={activeLayer} />
        </Box>

        {/* Main Content / Pages */}
        <Box sx={{ mb: { xs: 2, sm: 3, md: 4 } }}>
          {activeLayer === "map" && <MobilityMap />}
          {activeLayer === "goals" && <MobilityKPIs />}
          {activeLayer === "catalogue" && <DataCatalogue />}
          {activeLayer === "about" && <TeamAbout />}
        </Box>
      </Container>
    </Box>
  );
}

export default Home;

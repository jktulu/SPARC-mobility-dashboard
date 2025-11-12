import { useState } from "react";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Box, Collapse, IconButton, Typography } from "@mui/material";

const TabDescription = ({ activeLayer, tabContent }) => {
  const [expanded, setExpanded] = useState(true);
  const activeContent = tabContent[activeLayer];

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  if (!activeContent) return null;

  return (
    <Box sx={{ position: "relative", mb: 3, pl: 2 }}>
      <Box
        sx={{
          borderLeft: 4,
          borderColor: "primary.main",
          pl: 4,
          py: 1,
          position: "relative",
        }}
      >
        <InfoOutlinedIcon
          sx={{
            position: "absolute",
            left: -14,
            top: 14,
            color: "primary.main",
            backgroundColor: "background.default",
            borderRadius: "50%",
          }}
        />
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            cursor: "pointer",
          }}
          onClick={handleToggle}
        >
          <Typography variant="h5" fontWeight="bold" color="primary.main">
            {activeContent.title}
          </Typography>
          <IconButton size="small">
            <ExpandMoreIcon
              sx={{
                transform: expanded ? "rotate(0deg)" : "rotate(-90deg)",
                transition: "transform 0.2s",
              }}
            />
          </IconButton>
        </Box>
        
        <Collapse in={expanded}>
          {typeof activeContent.description === "string" ? (
            <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
              {activeContent.description}
            </Typography>
          ) : (
            <Box sx={{ pt: 1 }}>{activeContent.description}</Box>
          )}
        </Collapse>
      </Box>
    </Box>
  );
};

export default TabDescription;

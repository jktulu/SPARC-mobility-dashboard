import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { useState } from "react";

const VerticalTabs = ({ tabs, onTabChange, activeTab }) => {
  const [value, setValue] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (onTabChange) {
      onTabChange(event, newValue);
    }
  };

  const handleShowAll = (event) => {
    if (onTabChange) {
      onTabChange(event, null);
    }
  };

  return (
    <Box>
      {/* Main Tab component */}
      <Paper
        sx={{
          width: "100%",
          minWidth: 150,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Tabs
          orientation="vertical"
          variant="fullWidth"
          value={activeTab !== null ? activeTab : false}
          onChange={handleChange}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                "&.Mui-selected": {
                  color: tab.color,
                },
              }}
            />
          ))}
        </Tabs>
      </Paper>

      {/* Button */}
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          onClick={handleShowAll}
          sx={{
            color: activeTab !== null ? "primary.main" : "text.secondary",
            fontWeight: activeTab !== null ? "bold" : "normal",
          }}
        >
          {activeTab !== null ? "Show All" : "Filter by theme"}
        </Button>
      </Box>
    </Box>
  );
};

// Prop types validation for VerticalTabs
VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string,
    })
  ).isRequired,
  onTabChange: PropTypes.func.isRequired,
  activeTab: PropTypes.number,
};

export default VerticalTabs;

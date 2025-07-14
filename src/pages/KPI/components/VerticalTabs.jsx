import {
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Typography,
  Divider
} from '@mui/material';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

// Define Tab
function TabPanel(props) {
  const { tab, value, index, ...other } = props;
  const [currentVisualIndex, setCurrentVisualIndex] = useState(0);

  const handleNextVisual = () => {
    setCurrentVisualIndex((prevIndex) =>
      (prevIndex + 1) % tab.visuals.length);
  }
  const handlePrevVisual = () => {
    setCurrentVisualIndex((prevIndex) =>
      prevIndex === 0 ? tab.visuals.length - 1 : prevIndex - 1
    );
    ;
  };

  // This effect handles the automatic cycling of the carousel.
  useEffect(() => {
    // Only run the timer if this tab is active and there's more than one visual.
    if (value === index && tab.visuals.length > 1) {
      const timer = setInterval(() => {
        setCurrentVisualIndex(prevIndex => (prevIndex + 1) % tab.visuals.length);
      }, 5000);
      return () => clearInterval(timer);   // Cleanup: clear the interval when the tab is hidden or component unmounts.
    }
  }, [value, index, tab.visuals.length]); // Rerun effect if these change


  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
      style={{ flexGrow: 1, overflowY: 'auto', height: '100%' }}
    >
      {value === index && (
        <Box sx={{ p: 5, display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Title */}
          <Typography variant="h5" sx={{ mb: 2 }}>
            {tab.title}
          </Typography>

          {/* Description */}
          <Typography component="p" color="text.primary">
            {tab.description}
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Carousel Visual Area */}
          <Box sx={{ my: 2, flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 250 }}>
            <Box sx={{ width: '100%', position: 'relative', height: '100%' }}>
              {tab.visuals.map((item, itemIndex) => (
                <Box
                  key={itemIndex}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.5s ease-in-out',
                    opacity: itemIndex === currentVisualIndex ? 1 : 0,
                  }}
                >
                  {item.type === 'image' && (
                    <Box
                      component="img"
                      src={item.src}
                      alt={item.alt}
                      sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                  )}

                </Box>
              ))}
            </Box>
          </Box>

          {/* Carousel Dots and Explore Button */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 'auto', pt: 2, flexShrink: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Button
                variant="text"
                onClick={handlePrevVisual}
                sx={{ mr: 1, minWidth: '40px', minHeight: '40px' }}
              >
                Prev
              </Button>
              {tab.visuals.map((_, dotIndex) => (
                <Box
                  key={dotIndex}
                  onClick={() => setCurrentVisualIndex(dotIndex)}
                  sx={{
                    width: 10, height: 10, borderRadius: '50%',
                    backgroundColor: dotIndex === currentVisualIndex ? 'primary.main' : 'grey.400',
                    mx: 1, cursor: 'pointer', transition: 'background-color 0.3s',
                  }}
                />

              ))}

              <Button
                variant="text"
                onClick={handleNextVisual}
                sx={{ ml: 1, minWidth: '40px', minHeight: '40px' }}
              >
                Next
              </Button>
            </Box>
            <Button
              variant="contained"
              href="a"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore
            </Button>
          </Box>
        </Box>
      )}
    </div>
  );
}

// Update Prop types
TabPanel.propTypes = {
  tab: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


// --- The Main VerticalTabs Component ---
const VerticalTabs = ({ tabs }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        height: 900,
        boxShadow: 3,
      }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        textColor="inherit"
        indicatorColor="primary"
        sx={{
          borderRight: 1,
          borderColor: 'divider',
          flexShrink: 0,
          minWidth: 200,
        }}
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            label={tab.label}
            {...a11yProps(index)}
            sx={{
              textTransform: 'none',
              fontSize: '1rem',
              alignItems: 'flex-start',
              p: 2,
              opacity: 0.7,
              '&.Mui-selected': {
                color: 'primary.main',
                fontWeight: 'bold',
                opacity: 1,
              },

            }}
          />
        ))}
      </Tabs>

      {tabs.map((tab, index) => (
        <TabPanel key={index} value={value} index={index} tab={tab} />
      ))}
    </Paper>
  );
};

VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      visuals: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf(['image']).isRequired,
          src: PropTypes.string,
          alt: PropTypes.string,
          title: PropTypes.string,
        })
      ).isRequired,
    })
  ).isRequired,
};

export default VerticalTabs;
import {
  Box,
  Button,
  Paper,
  Tab,
  Tabs,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import { useState } from 'react';

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
      <Box sx={{ p: 1, textAlign: 'center' }}>
        <Typography variant="subtitle1" color="text.secondary">
          Select a topic to filter
        </Typography>
      </Box>
      <Paper
        sx={{
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Tabs
          orientation='vertical'
          variant="scrollable"
          value={activeTab === null ? false : activeTab}
          onChange={handleChange}
          sx={{
            borderColor: 'divider',
            width: '100%',
          }}
        >
          {tabs.map((tab, index) => (
            <Tab
              key={index}
              label={tab.label}
              sx={{
                opacity: 1,
                '&.Mui-selected': {
                  fontWeight: 'bold',
                  opacity: 1
                }
              }} />
          ))}
        </Tabs>


      </Paper>
      <Box sx={{ p: 1 }}>
        <Button
          fullWidth
          onClick={handleShowAll}
          variant='text'
          sx={{
            color: 'primary.main',
            // If a tab is selected, the button has 0.5 opacity (like an unselected tab).
            // If no tab is selected ("Show All" is active), it has full opacity.
            opacity: activeTab !== null ? 1 : 0.5,
            // If "Show All" is active, make the font bold to match selected tabs.
            fontWeight: activeTab !== null ? 'bold' : 'normal',
          }}
        >
          Show All
        </Button>
      </Box>
    </Box>
  );
};

VerticalTabs.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  onTabChange: PropTypes.func.isRequired,
};

export default VerticalTabs;

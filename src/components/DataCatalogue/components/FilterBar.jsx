import { Box, Button, FormControl, InputLabel, MenuItem, Select, Chip, Checkbox, ListItemText } from '@mui/material';
import ClearAllIcon from '@mui/icons-material/ClearAll';


const FilterBar = ({ filters, onFilterChange, filterOptions }) => {
  const { format, resolution, theme } = filters;
  const { fileFormats, resolutions, themes } = filterOptions;

  // Handler for filter changes
  const handleDelete = (filterName, valueToDelete) => () => {
    onFilterChange({
      ...filters,
      // Create a new array for the specified filter, excluding the deleted value.
      [filterName]: filters[filterName].filter((value) => value !== valueToDelete),
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({
      ...filters,
      [name]: typeof value === 'string' ? value.split(',') : value,
    });
  };

  const handleClearAll = () => {
    onFilterChange({
      format: [],
      resolution: [],
      theme: [],
    });
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', gap: 1, mt: 2, flexWrap: 'nowrap' }}>
        <FormControl fullWidth size="small">
          <InputLabel id="format-select-label">Format</InputLabel>
          <Select
            labelId="format-select-label"
            id="format-select"
            name="format"
            value={format}
            label="Format"
            multiple
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    onDelete={handleDelete('format', value)}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                ))}
              </Box>
            )}
          >
            {fileFormats.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={format.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="resolution-select-label">Resolution</InputLabel>
          <Select
            labelId="resolution-select-label"
            id="resolution-select"
            name="resolution"
            value={resolution}
            label="resolution"
            multiple
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    onDelete={handleDelete('resolution', value)}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                ))}
              </Box>
            )}
          >
            {resolutions.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={resolution.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth size="small">
          <InputLabel id="theme-select-label">Theme</InputLabel>
          <Select
            labelId="theme-select-label"
            id="theme-select"
            name="theme"
            value={theme}
            label="Theme"
            multiple
            onChange={handleChange}
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.2 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    size="small"
                    onDelete={handleDelete('theme', value)}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
                ))}
              </Box>
            )}
          >
            {themes.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={theme.includes(option)} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box>
        <Button
          variant="text"
          onClick={handleClearAll}
          startIcon={<ClearAllIcon />}
          sx={{ visibility: filters.format.length > 0 || filters.resolution.length > 0 || filters.theme.length > 0 ? 'visible' : 'hidden' }}
        >
          Clear All
        </Button>
      </Box>
    </Box >
  );
};

export default FilterBar;
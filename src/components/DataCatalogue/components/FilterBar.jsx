import ClearAllIcon from "@mui/icons-material/ClearAll";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@mui/material";

const FilterBar = ({ filters, onFilterChange, filterOptions }) => {
  const { format, resolution, theme, lastupdate } = filters;
  const { formats, resolutions, themes, lastupdates } = filterOptions;

  // Handler for filter changes
  const handleDelete = (filterName, valueToDelete) => () => {
    onFilterChange({
      ...filters,
      [filterName]: filters[filterName].filter(
        (value) => value !== valueToDelete
      ),
    });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    onFilterChange({
      ...filters,
      [name]: typeof value === "string" ? value.split(",") : value,
    });
  };

  const handleClearAll = () => {
    onFilterChange({
      format: [],
      resolution: [],
      theme: [],
      lastupdate: [],
    });
  };

  return (
    <Box>
      <Grid container sx={{ display: "flex", mt: 2 }} spacing={2}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.2 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      size="small"
                      onDelete={handleDelete("theme", value)}
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
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      size="small"
                      onDelete={handleDelete("resolution", value)}
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
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel id="lastupdate-select-label">Last Updated</InputLabel>
            <Select
              labelId="lastupdate-select-label"
              id="lastupdate-select"
              name="lastupdate"
              value={lastupdate}
              label="Last Updated"
              multiple
              onChange={handleChange}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.2 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      size="small"
                      onDelete={handleDelete("lastupdate", value)}
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  ))}
                </Box>
              )}
            >
              {lastupdates.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={lastupdate.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
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
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      size="small"
                      onDelete={handleDelete("format", value)}
                      onMouseDown={(event) => event.stopPropagation()}
                    />
                  ))}
                </Box>
              )}
            >
              {formats.map((option) => (
                <MenuItem key={option} value={option}>
                  <Checkbox checked={format.includes(option)} />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>

      </Grid>
      <Box>
        <Button
          variant="text"
          onClick={handleClearAll}
          startIcon={<ClearAllIcon />}
          disabled={
            filters.format.length === 0 &&
            filters.resolution.length === 0 &&
            filters.theme.length === 0 &&
            filters.lastupdate.length === 0
          }
        >
          Clear All
        </Button>
      </Box>
    </Box>
  );
};

export default FilterBar;

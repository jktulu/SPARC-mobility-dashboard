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
  useTheme,
} from "@mui/material";

// Filter dropdown component (used in FilterBar)
const FilterDropdown = ({ config, value, onChange, onDelete }) => {
  const { name, label, options } = config;
  const theme = useTheme();
  const domainColorMap = theme.kpiColorMap;
  const isKpi = name === "kpi";

  return (
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-select-label`}
        id={`${name}-select`}
        name={name}
        value={value}
        label={label}
        multiple
        onChange={onChange}
        renderValue={(selected) => {
          const displayValues = isKpi
            ? selected.map(
                (val) => options.find((opt) => opt.value === val)?.label || val
              )
            : selected;

          return (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {displayValues.map((displayValue, index) => (
                <Chip
                  key={selected[index]}
                  label={displayValue}
                  size="small"
                  onDelete={onDelete(name, selected[index])}
                  onMouseDown={(event) => event.stopPropagation()}
                />
              ))}
            </Box>
          );
        }}
      >
        {options.map((option) => {
          const optionValue = isKpi ? option.value : option;
          const optionLabel = isKpi ? option.label : option;
          return (
            <MenuItem key={optionValue} value={optionValue}>
              {isKpi && (
                <Box
                  component="span"
                  sx={{
                    width: 15,
                    height: 15,
                    borderRadius: "50%",
                    backgroundColor: domainColorMap[option.domainId] || theme.palette.grey[400],
                    mr: 1.5
                  }}
              />              
              )}
              <Checkbox checked={value.includes(optionValue)} sx={{ p: 0, mr: 1 }} />
              <ListItemText primary={optionLabel} />
            </MenuItem>
          );
        })}
      </Select>
    </FormControl>
  );
};

// Filter bar component
const FilterBar = ({ filters, onFilterChange, filterOptions }) => {
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
    const clearedFilters = Object.keys(filters).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    onFilterChange(clearedFilters);
  };
  const isClearAllDisabled = Object.values(filters).every(
    (arr) => arr.length === 0
  );

  // Filter configurations
  const mainFilterConfigs = [
    {
      name: "sector",
      label: "Sector",
      options: filterOptions.sectors,
    },
    {
      name: "granularity",
      label: "Granularity",
      options: filterOptions.granularities,
    },
    {
      name: "format",
      label: "Format",
      options: filterOptions.formats,
    },
    {
      name: "lastupdate",
      label: "Last Updated",
      options: filterOptions.lastupdates,
    },
  ];

  const kpiFilterConfig = {
    name: "kpi",
    label: "Associated KPI",
    options: filterOptions.kpis,
  };

  // --- Rendering ---
  return (
    <Box>
      {/* Main filters */}
      <Grid container sx={{ display: "flex", mt: 2 }} spacing={2}>
        {mainFilterConfigs.map((config) => (
          <Grid size={{ xs: 12, md: 6, lg: 3 }} key={config.name}>
            <FilterDropdown
              config={config}
              value={filters[config.name]}
              onChange={handleChange}
              onDelete={handleDelete}
            />
          </Grid>
        ))}

        {/* KPI Filter*/}
        <Grid size={12} key={kpiFilterConfig.name}>
          <FilterDropdown
            config={kpiFilterConfig}
            value={filters.kpi}
            onChange={handleChange}
            onDelete={handleDelete}
          />
        </Grid>
      </Grid>
      <Box>
        <Button
          variant="text"
          onClick={handleClearAll}
          startIcon={<ClearAllIcon />}
          disabled={isClearAllDisabled}
        >
          Clear All
        </Button>
      </Box>
    </Box>
  );
};

export default FilterBar;

import {
  Box,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
} from "@mui/material";
import { layerConfig } from "./layerConfig";

const LayerControl = ({ onLayerToggle }) => {
  return (
    <Box>
      <Typography
        variant="h6"
        sx={{ fontWeight: "bold", color: "primary.main", mb: -1 }}
      >
        Theme
      </Typography>
      <Typography variant="caption" sx={{ color: "text.secondary", mb: 10 }}>
        Choose a layer
      </Typography>

      {layerConfig.map((themeGroup) => (
        <Box key={themeGroup.theme} my={2}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: "bold", color: "secondary.main" }}
          >
            {themeGroup.theme}
          </Typography>
          <FormGroup>
            {themeGroup.layers.map((layer) => (
              <FormControlLabel
                key={layer.id}
                control={
                  <Checkbox
                    onChange={(e) => onLayerToggle(layer, e.target.checked)}
                  />
                }
                label={layer.name}
              />
            ))}
          </FormGroup>
        </Box>
      ))}
    </Box>
  );
};

export default LayerControl;

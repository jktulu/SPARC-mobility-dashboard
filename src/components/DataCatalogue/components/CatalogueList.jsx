import { Description, ExitToApp, Public, Widgets } from "@mui/icons-material";
import {
  Box,
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";

const CatalogueListItem = ({ item, onClick }) => (
  <ListItem disablePadding divider>
    <Grid
      container
      spacing={2}
      sx={{
        width: "100%",
        alignItems: "flex-start",
        p: 2,
      }}
    >
      <Grid size={{ sm: 12, md: 9 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%",
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              {item.title}
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{
                mb: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: "3",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.description}
            </Typography>
          </Box>
        </Box>
      </Grid>

      <Grid size={{ sm: 12, md: 3 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 1,
          }}
        >
          <Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Widgets fontSize="small" color="secondary" />
              <Typography variant="inherit" color="text.secondary">
                Sector: {item.sector}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Public fontSize="small" color="secondary" />
              <Typography variant="inherit" color="text.secondary">
                Granularity: {item.granularity_spatial}
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", gap: 1, mb: 0.5 }}
            >
              <Description fontSize="small" color="secondary" />
              <Typography variant="inherit" color="text.secondary">
                Format: {item.format}
              </Typography>
            </Box>
          </Box>

          <Button
            variant="contained"
            size="small"
            startIcon={<ExitToApp />}
            onClick={() => onClick(item)}
            sx={{ flexShrink: 0, mt: 0.5 }}
          >
            Go to dataset
          </Button>
        </Box>
      </Grid>
    </Grid>
  </ListItem>
);

const CatalogueList = ({ items, onItemClick }) => (
  <Box
    sx={{
      border: "1px solid",
      borderColor: "divider",
      overflow: "hidden",
      minHeight: 400,
    }}
  >
    <List disablePadding>
      {items.length > 0 ? (
        items.map((item) => (
          <CatalogueListItem key={item.id} item={item} onClick={onItemClick} />
        ))
      ) : (
        <ListItem sx={{ p: 4, textAlign: "center" }}>
          <ListItemText
            primary="No datasets found"
            secondary="Try adjusting your search query."
          />
        </ListItem>
      )}
    </List>
  </Box>
);

export default CatalogueList;

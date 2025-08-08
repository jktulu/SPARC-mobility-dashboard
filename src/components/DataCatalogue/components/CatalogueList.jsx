import { Description, ExitToApp, Public, Widgets } from "@mui/icons-material";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

const CatalogueListItem = ({ item, onClick }) => (
  <ListItem disablePadding divider>
    <Box sx={{ p: 2, alignItems: "flex-start", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          width: "100%",
          alignItems: "flex-start",
          gap: 8,
        }}
      >
        <Box
          sx={{
            flex: 1, // Let this column take up all available space
            minWidth: 0, // A flexbox best practice to prevent overflow
            height: "100%",
            justifyContent: "space-between",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box>
            <Typography variant="h5" gutterBottom>
              {item.name}
            </Typography>
            <Typography
              variant="body"
              color="text.secondary"
              sx={{
                mb: 1.5,
                display: "-webkit-box",
                WebkitLineClamp: "2",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {item.description}
            </Typography>
          </Box>
          <Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Source: {item.provider}
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between", 
            gap: 1,
            width: 325, 
            flexShrink: 0, 
            height: "100%", // 
          }}
        >
          <Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                mb: 0.5,
                flexShrink: 0,
              }}
            >
              <Widgets fontSize="small" color="secondary" />
              <Typography variant="inherit" color="text.secondary">
                Theme: {item.theme}
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
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Public fontSize="small" color="secondary" />
              <Typography variant="inherit" color="text.secondary">
                Resolution: {item.resolution}
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
      </Box>
    </Box>
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

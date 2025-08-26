import {
  Box,
  Fab,
  Tab,
  Tabs,
  useMediaQuery,
  useTheme,
  Typography,
} from "@mui/material";

const NavigationButtons = ({ buttons = [], onButtonClick, activeButtonId }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleTabChange = (event, newActiveButtonId) => {
    onButtonClick(newActiveButtonId);
  };

  if (isMobile) {
    return (
      <>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "flex-start",
            pt: 2,
          }}
        >
          {buttons.map((button) => (
            <Box
              key={button.id}
              onClick={() => onButtonClick(button.id)}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "flex-start",
                cursor: "pointer",
                flex: 1,
                textAlign: "center",
              }}
            >
              <Fab
                color={button.id === activeButtonId ? "primary" : "default"}
                aria-label={button.text}
                size="medium"
                sx={{ boxShadow: button.id === activeButtonId ? 5 : 2 }}
              >
                {button.icon}
              </Fab>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 300,
                  mt: 0.5,
                  p: 1,
                  lineHeight: 1,
                  textAlign: "center",
                  color:
                    button.id === activeButtonId
                      ? "primary.main"
                      : "text.secondary",
                }}
              >
                {button.text}
              </Typography>
            </Box>
          ))}
        </Box>
      </>
    );
  }

  // --- Desktop: Tabs ---
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <Tabs
        value={activeButtonId}
        onChange={handleTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label="navigation tabs"
      >
        {buttons.map((button) => (
          <Tab
            key={button.id}
            value={button.id}
            label={button.text}
            icon={button.icon}
            sx={{
              fontWeight: 500,
              fontSize: "1.2rem",
              textTransform: "none",
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default NavigationButtons;

import { Box, Paper, Typography, Grid } from "@mui/material";

const KpiRow = ({ kpis = [], onKpiSelect, selectedKpiCode }) => {
  if (!kpis || kpis.length === 0) {
    return (
      <Paper
        sx={{
          p: 3,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography color="text.secondary">
          No KPIs to display for this topic
        </Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Grid container spacing={1}>
        {/* Map colour to kpi */}
        {kpis.map((kpi) => {
          const isSelected = kpi.code === selectedKpiCode;
          const color = kpi.domainColor;

          return (
            <Grid
              size={{ xs: 12, sm: 6, md: 4, lg: 3 }}
              key={kpi.code}
            >
              <Paper
                onClick={() => onKpiSelect(kpi)}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  height: "100%",
                  cursor: "pointer",
                  userSelect: "none",
                  border: "3px solid",
                  borderColor: isSelected ? "primary.dark" : "transparent",
                  backgroundColor: color,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                  },
                }}
              >
                {/* Title KPI */}
                <Box
                  sx={{
                    width: "60%",
                    textAlign: "right",
                    display: "flex",
                    alignItems: "center",
                    pl: 0.5,
                    pr:0.5,
                  }}
                >
                  <Typography
                    sx={{
                      lineHeight: 1,
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                      color: "primary.contrastText",
                    }}
                  >
                    {kpi.title}
                  </Typography>
                </Box>

                {/* Stats */}
                <Box
                  sx={{
                    width: "40%",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: "bold",
                      lineHeight: 1,
                      fontSize: "1.8rem",
                    }}
                  >
                    {kpi.stat}
                  </Typography>

                  <Typography
                    variant="caption"
                    color="text.primary"
                    sx={{ lineHeight: 1 }}
                  >
                    {kpi.unit ? kpi.unit : "\u00A0"}
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default KpiRow;

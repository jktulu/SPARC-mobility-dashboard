import { Box, Paper, Typography } from '@mui/material';


const KpiRow = ({ kpis = [], onKpiSelect, selectedKpiCode }) => {

  if (!kpis || kpis.length === 0) {
    return (
      <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">No KPIs to display for this topic</Typography>
      </Paper>
    );
  }

  return (
    <Box>
      <Box sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 1,
      }}>
        {kpis.map((kpi, index) => (
          <Paper
            key={index}
            onClick={() => onKpiSelect(kpi)}
            sx={{
              p: 1,
              width: 325,
              height: 70,
              flexShrink: 0,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              border: '1px solid',
              borderColor: kpi.code === selectedKpiCode ? 'primary.main' : 'transparent',
              backgroundColor: kpi.code === selectedKpiCode ? 'background.selected' : 'background.paper',
              transition: 'border-color 0.3s, transform 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                borderColor: kpi.code === selectedKpiCode ? 'primary.dark' : 'grey.300',
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'row',
                gap: 2,
                alignItems: 'center',
                justifyContent: 'flex-start',
                width: '100%',
              }}
            >
              <Box sx={{ width: '55%', textAlign: 'right', pr: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
                  {kpi.title}
                </Typography>
              </Box>
              <Box sx={{ width: '25%', textAlign: 'right' }}>
                <Typography variant="h2" color="text.secondary">
                  {kpi.stat}
                </Typography>
              </Box>
              <Box sx={{ width: '20%', textAlign: 'left' }}>
                <Typography variant="caption" color="text.secondary">
                  {kpi.unit}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box >
  );
};

export default KpiRow;
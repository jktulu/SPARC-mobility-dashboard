import { Box, Paper, Typography , Divider } from '@mui/material';


const InfoAreaRow = ({ kpis = [] }) => {

  if (!kpis || kpis.length === 0) {
    return (
      <Paper sx={{ p: 3,  height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">No KPIs to display for this domain.</Typography>
      </Paper>
    );
  }

  return (
    // This outer box allows for horizontal scrolling on smaller screens
    <Box sx={{
      display: 'flex',
      overflowX: 'auto',
      p: 1,
      // Custom scrollbar styling
      '&::-webkit-scrollbar': {
        height: '8px',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: '#f1f1f1',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: '#ccc',
        borderRadius: '4px',
      },
      '&::-webkit-scrollbar-thumb:hover': {
        backgroundColor: '#aaa',
      }
    }}>
      {/* This inner box uses flex to lay out the cards in a row */}
      <Box sx={{ display: 'flex', gap: 1 }}>
        {kpis.map((kpi, index) => (
          <Paper 
            key={index} 
            sx={{ 
              p: 2, 
              maxWidth:270,
              height: 250,
              flexShrink: 0, 
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between'
            }}
          >
            <Box>
              <Typography variant="caption" color="text.secondary">
                KPI: {kpi.code}
              </Typography>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', mt: 1, fontSize: '1.1rem' }}>
                {kpi.title}
              </Typography>
              <Divider sx={{ my: 1.5 }} />
              <Typography variant="body2" component="p">
                {kpi.description}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default InfoAreaRow;
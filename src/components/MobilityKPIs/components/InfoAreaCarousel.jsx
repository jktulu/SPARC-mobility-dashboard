
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

const InfoAreaCarousel = ({ kpis = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
    if (kpis.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex(prevIndex => (prevIndex + 1) % kpis.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [kpis]); // Rerun effect only when the kpis prop changes

  if (!kpis || kpis.length === 0) {
    return (
      <Paper sx={{ p: 3, height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography color="text.secondary">No KPIs to display for this domain.</Typography>
      </Paper>
    );
  }

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % kpis.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex => (prevIndex - 1 + kpis.length) % kpis.length);
  };

  const currentKpi = kpis[currentIndex];

  return (
    <Paper sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>

      <Box>
        <Typography variant="caption" color="text.secondary">
          KPI: {currentKpi.code}
        </Typography>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold' }}>
          {currentKpi.title}
        </Typography>
        <Typography variant="body1" component="p">
          {currentKpi.description}
        </Typography>
      </Box>

      {/* Carousel Controls */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="body2" color="text.secondary">
          {currentIndex + 1} / {kpis.length}
        </Typography>
        <Box>
          <IconButton onClick={handlePrev} disabled={kpis.length <= 1}>
            <ArrowBackIosNewIcon fontSize="small" />
          </IconButton>
          <IconButton onClick={handleNext} disabled={kpis.length <= 1}>
            <ArrowForwardIosIcon fontSize="small" />
          </IconButton>
        </Box>
      </Box>


    </Paper>
  );
};
export default InfoAreaCarousel;



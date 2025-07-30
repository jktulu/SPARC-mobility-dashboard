import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography
} from '@mui/material';
import { useEffect, useMemo, useState } from 'react';

import KpiDetailBox from './components/KpiDetailBox';
import InfoAreaRow from './components/KpiRow';
import VerticalTabs from './components/VerticalTabs';

const MobilityKPIs = () => {

  // State for the data fetched from JSON files
  const [kpiDomains, setKpiDomains] = useState([]);
  const [kpiDetails, setKpiDetails] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage the UI
  const [activeTabIndex, setActiveTabIndex] = useState(null);
  const [selectedKpi, setSelectedKpi] = useState(null);

  // --- Data Fetching ---
  useEffect(() => {
    // Use Promise.all to fetch both files concurrently for better performance
    Promise.all([
      fetch('data/kpiDomains.json'),
      fetch('data/kpiDetails.json')
    ])
      .then(async ([domainsResponse, detailsResponse]) => {
        if (!domainsResponse.ok || !detailsResponse.ok) {
          throw new Error('Network response was not ok for one or more files.');
        }
        const domainsData = await domainsResponse.json();
        const detailsData = await detailsResponse.json();
        return [domainsData, detailsData];
      })
      .then(([domainsData, detailsData]) => {
        setKpiDomains(domainsData);
        setKpiDetails(detailsData);
        setIsLoading(false);
      })
      .catch(fetchError => {
        console.error("Failed to fetch initial data:", fetchError);
        setError("Could not load required data. Please try again later.");
        setIsLoading(false);
      });
  }, []); // The empty array [] ensures this effect runs only once when the component mounts

  // Conditionally Calculate selectedKpis. 
  // If no tab is selected, return all KPIs from the details object. Otherwise, get the KPIs for the currently selected tab

  const selectedKpis = useMemo(() => {
    if (activeTabIndex === null) {
      return Object.values(kpiDetails);
    }
    const selectedTab = kpiDomains[activeTabIndex];
    return selectedTab?.kpis.map(code => kpiDetails[code]).filter(Boolean) || [];
  }, [activeTabIndex, kpiDomains, kpiDetails]); // Dependencies for the hook


  // --- Event Handlers ---
  const handleTabChange = (event, newIndex) => {
    setActiveTabIndex(newIndex);
  };

  const handleKpiSelect = (kpi) => {
    if (selectedKpi && selectedKpi.code === kpi.code) {
      setSelectedKpi(null);       // The same KPI was clicked again, so deselect it.
    } else {
      setSelectedKpi(kpi);       // A new or different KPI was clicked, so select it.
    }
  };


  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ px: 4 }}>
      <Grid container spacing={2} >

        {/* Left Column for Tabs */}
        <Grid item size={2} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <VerticalTabs
            tabs={kpiDomains}
            activeTab={activeTabIndex}
            onTabChange={handleTabChange}
          />
        </Grid>

        {/* Right Column */}
        <Grid item size={10} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 1 }}>
            <InfoAreaRow
              kpis={selectedKpis}
              onKpiSelect={handleKpiSelect}
              selectedKpiCode={selectedKpi?.code}
            />
          </Box>
         <Divider sx={{ my: 1 }} />
          <KpiDetailBox kpi={selectedKpi} />
        </Grid>

      </Grid>
    </Box>
  );
};

export default MobilityKPIs;
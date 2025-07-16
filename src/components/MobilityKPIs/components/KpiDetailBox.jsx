import { Box, CircularProgress, Paper, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import KpiChart from './KpiChart';


const KpiDetailBox = ({ kpi }) => {
    // 1. Add state for loading, data, and errors
    const [chartData, setChartData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 2. Use useEffect to fetch data when the kpi prop changes
    useEffect(() => {
        if (kpi) {
            setIsLoading(true);
            setError(null);
            setChartData(null);

            // Fetch the JSON file
            fetch(`/data/kpi/${kpi.code}.json`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Cannot connect to the server');
                    }
                    return response.json();
                })
                .then(data => {
                    setChartData(data);
                    setIsLoading(false);
                })
                .catch(fetchError => {
                    console.error("Failed to fetch chart data:", fetchError);
                    setError("Failed to load chart data or no chart data available");
                    setIsLoading(false);
                });
        } else {
            // Reset state if the new KPI has no chart
            setChartData(null);
            setError(null);
            setIsLoading(false);
        }
    }, [kpi]); // re-runs every time the selected KPI changes

    // If no KPI is selected, show a placeholder message.
    if (!kpi) {
        return (
            <Paper sx={{ p: 3, mt: 1, textAlign: 'center' }}>
                <Typography color="text.secondary">Select a KPI card above to see more details.</Typography>
            </Paper>
        );
    }

    return (
        <Paper sx={{ p: 2, mt: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 'bold', fontSize: '1.25rem', mb: 2, textAlign: 'center' }}>
                {kpi.title}
            </Typography>
            <Box sx={{
                width: '100%',
                height: 500,
                display: 'flex',
                flexDirection: 'column',
            }}
            >

                {isLoading && <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}><CircularProgress /></Box>}
                {error && <Typography color="error" sx={{ my: 2 }}>{error}</Typography>}
                {chartData && <KpiChart data={chartData} />}

            </Box>

        </Paper>
    );
};


export default KpiDetailBox;
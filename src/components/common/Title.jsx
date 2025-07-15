import { Box, Typography } from '@mui/material';

// The component now accepts an 'onButtonClick' function as a prop.
const Title = () => {
    return (
        <Box sx={{ marginBottom: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>

            <Box component="section">
                <Typography
                    variant="h1"
                    sx={{ color: 'roseShades.dark', fontWeight: 'bold' }}
                >
                    Jaipur Open Mobility Data Hub
                </Typography>
            </Box>

            <Box component="section">
                <Typography variant="body1" color="text.secondary">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </Typography>
            </Box>

        </Box>
    );
};

export default Title;
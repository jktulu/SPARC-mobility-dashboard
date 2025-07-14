import { createTheme } from '@mui/material/styles';

// Define the custom color palette first for easy reference
const roseShades = {
  lightest: '#FAD4D4',   // For card backgrounds or subtle highlights
  lighter: '#F8B2B2',  // A light coral, good for hover states
  light: '#F8B2B2',      // A light coral, good for hover states
  main: '#E26D5C',       // The main, vibrant coral
  dark: '#B9473D',       // A stronger, deeper red tone
  darker: '#A03B32',      // A darker, more muted red
  darkest: '#7E2C27',     // A rich crimson, good for nav/footers
};

const theme = createTheme({
  palette: {
    // Integrate your custom shades directly into the primary palette
    primary: {
      light: roseShades.light,
      main: roseShades.main,
      dark: roseShades.dark,
      contrastText: '#ffffff', // White text works well on these primary colors
    },
    secondary: {
      main: roseShades.darkest, // Use the darkest shade as a secondary color
      contrastText: '#ffffff',
    },
    background: {
      default: '#FEF6F5', // A very light, warm off-white
      paper: '#FFFFFF',
    },
    text: {
      primary: '#2C2C2C',
      secondary: '#5A5A5A',
    },
    roseShades: roseShades,
  },
  typography: {
    fontFamily: `'Titillium Web', 'Noto Sans', 'Helvetica', 'Arial', sans-serif`,
    h1: { fontWeight: 700 },
    h2: { fontWeight: 600 },
    h3: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    button: { textTransform: 'none' }, 
  },

  shape: {
    borderRadius: 8,
  },

  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          padding: '10px 22px',
          fontWeight: 600,
          boxShadow: 2,

        },
      },
    },
    MuiTab: {
        styleOverrides: {
            root: {
                '&.Mui-selected': {
                    fontWeight: 700,
                    color: roseShades.main,
                    backgroundColor: roseShades.lightest,
                }
            }
        }
    }
  },
});

export default theme;
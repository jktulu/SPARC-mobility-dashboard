import { Box, Typography, Button, Grid } from '@mui/material';
import VerticalTabs from './components/VerticalTabs';

const tabData = [
  {
    label: 'Public Transport Supply',
    learnMoreLink: '#',
    title: 'Understanding Public Transport Supply',
    description: 'This is about making sure there are enough buses and trains, and that they run frequently. When supply is good, you have more travel options and spend less time waiting.',
    visuals: [
      {
        type: 'image',
        src: 'https://placehold.co/600x300/8E9AAF/FFFFFF?text=Bus+Network+Map',
        alt: 'Map of the bus network',
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/8E9AAF/FFFFFF?text=Train+Frequency',
        alt: 'Train frequency chart',
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/8E9AAF/FFFFFF?text=Train+Frequency',
        alt: 'Train frequency chart',
      },
    ],
  },
  {
    label: 'Safety & Comfort',
    learnMoreLink: '#',
    title: 'Prioritizing Passenger Safety & Comfort',
    description: 'Your journey should feel safe and be a pleasant experience. We focus on things like good lighting in stations, clean vehicles, and clear information so you can travel without worry.',
    visuals: [
      {
        type: 'image',
        src: 'https://placehold.co/600x300/A4B494/FFFFFF?text=Clean+Interior',
        alt: 'Interior of a clean bus',
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/A4B494/FFFFFF?text=Clean+Interior',
        alt: 'Interior of a clean bus',
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/A4B494/FFFFFF?text=Well-Lit+Station',
        alt: 'A well-lit station platform at night',
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/A4B494/FFFFFF?text=Well-Lit+Station',
        alt: 'A well-lit station platform at night',
      },
    ],
  },
  // Add more tabs following the same structure...
  {
    label: 'Sustainable Funding',
    title: 'Sustainable Funding Model',
    description: 'Securing long-term funding for green initiatives.',
    visuals: [
      {
        type: 'image',
        src: 'https://placehold.co/600x300/D8C3A5/FFFFFF?text=Pedestrian+Zone',
        alt: 'Pedestrian Zone'
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/C4A29E/FFFFFF?text=Green+Bonds',
        alt: 'Green Bonds'
      }
    ]
  },
  {
    label: 'Effective Enforcement',
    title: 'Ensuring Effective Enforcement',
    description: 'Keeping the system running smoothly by ensuring rules are followed.',
    visuals: [
      {
        type: 'image',
        src: 'https://placehold.co/600x300/9DB5B2/FFFFFF?text=Bus+Lane+Camera',
        alt: 'Bus Lane Camera'
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/D8C3A5/FFFFFF?text=Pedestrian+Zone',
        alt: 'Pedestrian Zone'
      },
    ]
  },
  {
    label: 'Sustainable Mobility',
    title: 'Path to Sustainable Mobility',
    description: 'Creating a transport system that is good for people and the environment.', 
    visuals: [
      {
        type: 'image',
        src: 'https://placehold.co/600x300/D8C3A5/FFFFFF?text=Bike+Share',
        alt: 'Bike Share Program'
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/D8C3A5/FFFFFF?text=Pedestrian+Zone',
        alt: 'Pedestrian Zone'
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/D8C3A5/FFFFFF?text=Pedestrian+Zone',
        alt: 'Pedestrian Zone'
      },
    ]
  },
  {
    label: 'Health & Safety',
    title: 'Focus on Health & Safety',
    description: 'Committed to keeping you safe on every trip with regular maintenance and clear procedures.',
    visuals: [
      {
        type: 'image',
        src: 'https://placehold.co/600x300/D8C3A5/FFFFFF?text=Pedestrian+Zone',
        alt: 'Pedestrian Zone'
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/D8C3A5/FFFFFF?text=Pedestrian+Zone',
        alt: 'Pedestrian Zone'
      },
    ]
  },
  {
    label: 'Inclusive Mobility',
    title: 'Mobility for All',
    description: 'Making sure our transport system is affordable and physically accessible for everyone.',
    visuals: [
      {
        type: 'image',
        src: 'https://placehold.co/600x300/BFA89E/FFFFFF?text=Accessible+Ramp',
        alt: 'Accessible Ramp'
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/BFA89E/FFFFFF?text=Accessible+Ramp',
        alt: 'Accessible Ramp'
      },
      {
        type: 'image',
        src: 'https://placehold.co/600x300/BFA89E/FFFFFF?text=Audio+Announcements',
        alt: 'Audio Announcement System'
      }
    ]
  },
];

const MobilityKPIs = () => {
  return (
    <Box sx={{ p: { xs: 2, sm: 4 } }}>      <Box component="section">
      <Typography variant="h5" sx={{ color: 'roseShades.dark', fontWeight: 'bold', mb: 2 }}>
        What makes the city move?
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </Typography>
    </Box>

      <Box>
        <VerticalTabs tabs={tabData} />
      </Box>
{/* 
      <Box sx={{
        mt: 4,
        display: 'flex',
        justifyContent: 'center',
      }}>
        <Button
          sx={{ width: '200px' }}
          variant="contained"
          color="primary"
          href="/explore-map"
          component="a"
          fullWidth
        >
          Explore
        </Button>
      </Box> */}

    </Box>
  );
};

export default MobilityKPIs;
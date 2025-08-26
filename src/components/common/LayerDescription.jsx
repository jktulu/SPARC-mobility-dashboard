import { Box, Link, Typography } from "@mui/material";

const content = {
  map: {
    title: "Explore public transport in the Jaipur District",
    description:
      "With this interactive map, you can view bus, metro and train routes and stops. Contextualise the networks by adding administrative boundaries or urban activities.",
  },
  goals: {
    title: "Tracking Progress",
    description:
      "Track progress against mobility goals (aka Key Performance Indicators) that were deemed pressing in Jaipur. Explore their definitions, metrics and evolution, where this information is available.",
  },
  catalogue: {
    title: "Screening for Open Data",
    description: (
      <>
        Explore our meta-data catalogue of data sets related to transport and
        mobility in Jaipur, which is aligned with the meta-data standards set
        out in India's{" "}
        <Link
          href="https://www.data.gov.in/sites/default/files/NDSAP%20Implementation%20Guidelines%202.4.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          National Data Sharing and Access Policy
        </Link>
        . Whether you are a planner, researcher or resident seeking to stay
        informed, we invite you to search, browse, check access and identify
        evidence gaps. Shape the debate of data sharing in the city.
      </>
    ),
  },
  about: {
    title: "About the Initiative",
    description: (
      <>
        <Typography variant="body1" color="text.primary" gutterBottom>
          The Smart Mobility Hub is a collaboration between the{" "}
          <Link
            href="https://www.ucl.ac.uk/bartlett/casa"
            target="_blank"
            rel="noopener noreferrer"
          >
            Centre for Advanced Spatial Analysis
          </Link>{" "}
          (CASA) at the University College London (UCL) and the{" "}
          <Link
            href="https://mnit.ac.in/dept_arch/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Department of Architecture and Planning
          </Link>{" "}
          at MNIT, Jaipur. Designed to support India's Smart City Mission and
          Datasmart City Strategy, the project promotes transparent and
          inclusive urban mobility through improved data sharing and
          evidence-based decision-making.
        </Typography>
        <Typography variant="body1" color="text.primary" gutterBottom>
          At its core, the tool offers a comprehensive catalogue of 241 mobility
          and urban planning datasets sourced from city reports and
          publications. This is the first-of-its-kind effort to map and share
          the urban data landscape for one of India's smart cities. In parallel,
          we engaged with local urban stakeholders to define 16 Key Performance
          Indicators (KPIs) that reflect urgent mobility priorities in Jaipur.
          This foundational work enables planners and policymakers to identify
          both existing data resources and critical gaps that hinder tracking of
          progress and effective decision-making. Ultimately, the Jaipur
          Mobility Insights Hub aims to spark a city-wide conversation about
          data sharing and collaboration to advance sustainable, inclusive and
          'datasmart' mobility in Jaipur.
        </Typography>
      </>
    ),
  },
};

const LayerDescription = ({ activeLayer }) => {
  const activeContent = content[activeLayer];
  if (!activeContent) {
    return null;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ color: "primary.dark" }}>
        {activeContent.title}
      </Typography>
      {typeof activeContent.description === "string" ? (
        <Typography variant="body1" color="text.primary">
          {activeContent.description}
        </Typography>
      ) : (
        activeContent.description
      )}
    </Box>
  );
};

export default LayerDescription;

// Define the base URL prefix in one single place.
const BASE_URL = "https://orca.casa.ucl.ac.uk/~jens/sparc-dash/data/";
// const BASE_URL = "data/"; 

const pathConfig = {
  // Scorecard
  KPI_DOMAINS_PATH: `${BASE_URL}kpiDef/kpiDomains.json`,
  KPI_DETAILS_PATH: `${BASE_URL}kpiDef/kpiDetails.json`,
  KPI_CHARTS_FOLDER_PATH: `${BASE_URL}kpiCharts/`,
  KPI_MAPS_FOLDER_PATH: `${BASE_URL}kpiMaps/`,
  // Data Catalogue
  DATA_CATALOGUE_PATH: `${BASE_URL}datacatalogue/datacatalogue.json`,
  // Highlights
  HIGHLIGHTS_PATH: `${BASE_URL}highlightsData.json`,
};

export default pathConfig;
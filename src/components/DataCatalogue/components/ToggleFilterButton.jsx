import { FilterList, FilterListOff } from "@mui/icons-material";
import { Button } from "@mui/material";

const ToggleFilterButton = ({ showFilters, onClick }) => (
  <Button
    onClick={onClick}
    startIcon={showFilters ? <FilterListOff /> : <FilterList />}
    sx={{ textTransform: "none" }}
    color="primary"
    variant="text"
  >
    {showFilters ? "Hide Filters" : "More Filters"}
  </Button>
);

export default ToggleFilterButton;

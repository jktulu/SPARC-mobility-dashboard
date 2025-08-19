import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

const SearchBar = ({ query, onQueryChange }) => (
  <TextField
    fullWidth
    variant="outlined"
    placeholder="Search by keyword..."
    value={query}
    onChange={(e) => onQueryChange(e.target.value)}
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search />
        </InputAdornment>
      ),
    }}
  />
);

export default SearchBar;

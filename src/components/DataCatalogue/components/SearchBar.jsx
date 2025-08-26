import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

const SearchBar = ({ query, onQueryChange }) => (
  <TextField
    fullWidth
    size="small"
    variant="outlined"
    placeholder="Search by title, description, or keyword..."
    value={query}
    onChange={(e) => onQueryChange(e.target.value)}
    slotProps={{
      input: {
        startAdornment: (
          <InputAdornment position="start" >
            <Search />
          </InputAdornment>
        ),
      },
    }}
  />
);

export default SearchBar;

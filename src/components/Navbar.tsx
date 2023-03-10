/* LIBRARIES */
import { useState } from "react";
import { AppBar, Toolbar, Typography, TextField } from "@mui/material";

// Define the type of the props object that the component expects
interface Props {
  onSearch: (query: string) => void;
}

/* NAVBAR */
const Navbar = ({ onSearch }: Props) => {
  const [searchQuery, setSearchQuery] = useState(""); // states for searching

  // this changes the state
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    onSearch(event.target.value);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Countries 🌍
        </Typography>

        <TextField
          label="Search"
          variant="standard"
          value={searchQuery}
          onChange={handleSearch}
        />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;

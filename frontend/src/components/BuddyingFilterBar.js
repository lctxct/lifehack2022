import { categories } from "../types/Organisations";
import { useState } from "react";
import { TextField } from "@mui/material";
import MultiSelect from "./MultiSelect";
import { createTheme, ThemeProvider } from "@mui/material";

const customTheme = createTheme({
  palette: {
    light: {main: '#CDBCA5', contrastText: '#FFFFFF'},
    mediumlight: {main: '#d4c4b4', contrastText: '#FFFFFF'},
    neutral: {main: '#98745C', contrastText: '#FFFFFF'},
    dark: {main: '#060606', contrastText: '#FFFFFF'},
  },
});

const BuddyingFilterBar = ({
  handleCategoryFilterChange,
  handleLocationFilterChange,
  categoryFilter,
  locationFilter,
}) => {
  const locations = ["Aljunied", "Hougang", "Ang Mo Kio", "Kebun Baru", "Yio Chu Kang", "Bishan–Toa Payoh", "Marymount", "Chua Chu Kang", "Hong Kah North", "East Coast", "Holland–Bukit Timah", "Bukit Panjang", "Jalan Besar", "Potong Pasir", "Jurong", "Bukit Batok", "Yuhua", "Marine Parade", "MacPherson", "Mountbatten", "Marsiling–Yew Tee", "Nee Soon", "Pasir Ris–Punggol", "Punggol West", "Sembawang", "SSengkang", "Tampines", "Tanjong Pagar", "Radin Mas", "West Coast", "Pioneer"
]

  return (
    <div>
      {/* <TextField
        sx={{ m: 1, width: 500, maxWidth: "80vw" }}
        id="outlined-search"
        label="Search for organisation..."
        type="search"
      /> */}

      <MultiSelect
        sx={{fontFamily:"inherit"}}
        label="Categories"
        items={categories}
        itemFilter={categoryFilter}
        handleChange={handleCategoryFilterChange}
      />

      <MultiSelect
        label="Locations"
        items={locations}
        itemFilter={locationFilter}
        handleChange={handleLocationFilterChange}
      />
    </div>
  );
};

export default BuddyingFilterBar;

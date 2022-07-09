import { categories } from "../types/Organisations";
import { useState } from "react";
import {
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import MultiSelect from "./MultiSelect";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const BuddyingFilterBar = () => {
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [locationFilter, setLocationFilter] = useState([]);

  const handleCategoryFilterChange = (e) => {
    const {
      target: { value },
    } = e;

    setCategoryFilter(typeof value === "string" ? value.split(",") : value);
  };

  const handleLocationFilterChange = (e) => {
    const {
      target: { value },
    } = e;

    setLocationFilter(typeof value === "string" ? value.split(",") : value);
  };

  const locations = ["dummyData!"];

  return (
    <div>
      <div>
        <TextField
          sx={{ m: 1, width: 500, maxWidth: "80vw" }}
          id="outlined-search"
          label="Search for organisation..."
          type="search"
        />
      </div>

      <MultiSelect
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

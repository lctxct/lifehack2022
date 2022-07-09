import { categories } from "../types/Organisations";
import { useState } from "react";
import { TextField } from "@mui/material";
import MultiSelect from "./MultiSelect";

const BuddyingFilterBar = ({
  handleCategoryFilterChange,
  handleLocationFilterChange,
  categoryFilter,
  locationFilter,
}) => {
  const locations = ["dummyData!"];

  return (
    <div>
      {/* <TextField
        sx={{ m: 1, width: 500, maxWidth: "80vw" }}
        id="outlined-search"
        label="Search for organisation..."
        type="search"
      /> */}

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

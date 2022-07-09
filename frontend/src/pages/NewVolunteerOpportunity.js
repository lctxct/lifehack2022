import { categories } from "../types/Organisations";
import MultiSelect from "../components/MultiSelect";
import { Typography } from "@mui/material";
import { useState } from "react";

const NewVolunteerOpportunity = () => {
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
      <Typography variant="h1">Create New Volunteering Opportunity</Typography>
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

export default NewVolunteerOpportunity;

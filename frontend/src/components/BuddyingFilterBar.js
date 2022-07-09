import { categories } from "../types/Organisations";
import { useState } from "react";
import {
  Box, 
  Checkbox,
  IconButton, 
  InputBase, 
  InputLabel,
  FormControl,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  TextField
} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

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

  const handleChange = (e) => {
    const {
      target: { value },
    } = e;

    setCategoryFilter(typeof value === "string" ? value.split(",") : value);
  };

  const locations = ['dummyData!'];

  return (
    <div>
      <div>
      <TextField sx={{ m: 1, width: 500, maxWidth: '80vw' }} id="outlined-search" label="Search for organisation..." type="search" />
      </div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Categories</InputLabel>
        <Select
          multiple
          value={categoryFilter}
          onChange={handleChange}
          input={<OutlinedInput label="Categories" />}
          renderValue={(selected) => {
            const display = selected.join(", ");
            if (display.length > 50) {
              return `${selected.length} item(s) selected`;
            }
            return display;
          }}
          MenuProps={MenuProps}
        >
          {categories.map((category, index) => {
            return (
              <MenuItem key={index} value={category}>
                <Checkbox checked={categoryFilter.includes(category)} />
                <ListItemText primary={category} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>

      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel>Locations</InputLabel>
        <Select
          multiple
          value={categoryFilter}
          onChange={handleChange}
          input={<OutlinedInput label="Locations" />}
          renderValue={(selected) => {
            const display = selected.join(", ");
            if (display.length > 50) {
              return `${selected.length} item(s) selected`;
            }
            return display;
          }}
          MenuProps={MenuProps}
        >
          {locations.map((location, index) => {
            return (
              <MenuItem key={index} value={location}>
                <Checkbox checked={categoryFilter.includes(location)} />
                <ListItemText primary={location} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  );
};

export default BuddyingFilterBar;

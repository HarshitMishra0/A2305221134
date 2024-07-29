import React, { useState } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const Filter = ({ onFilterChange }) => {
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = () => {
    onFilterChange({ category, minPrice, maxPrice });
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Category</InputLabel>
        <Select value={category} onChange={(e) => setCategory(e.target.value)}>
          <MenuItem value="Phone">Phone</MenuItem>
          <MenuItem value="Computer">Computer</MenuItem>
          {/* Add more categories as needed */}
        </Select>
      </FormControl>
      <TextField
        label="Min Price"
        type="number"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
      />
      <TextField
        label="Max Price"
        type="number"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
      />
      <Button onClick={handleSubmit}>Filter</Button>
    </div>
  );
};

export default Filter;

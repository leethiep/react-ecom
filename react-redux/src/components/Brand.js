import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import {
  FormControlLabel,
  InputAdornment,
  TextField,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { updateSelectedBrands, setSearchQuery } from "../actions/brandActions";
import useDebounce from "../hooks/Debounce"; 
import { styled } from "@mui/system";
import { primaryColor, grayColor } from "../../src/assets/variables/color";

const CustomCheckbox = styled("input")({
  appearance: "none",
  width: "20px",
  height: "20px",
  backgroundColor: grayColor,
  opacity:0.6,
  borderRadius: "4px",
  outline: "none",
  cursor: "pointer",
  margin: "0",
  "&:checked": {
    backgroundColor: primaryColor,
    position: "relative",
    "&::before": {
      content: '""',
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "5px",
      height: "5px",
      backgroundColor: "#fff",
      borderRadius: "50%",
    },
  },
});
const CustomTextField = styled(TextField)({
  backgroundColor: "rgba(65,66,71,.06)", 
  outline : "none",
  border : "none",
  margin : "10px 0",

});
function Brand() {
  const brands = useSelector((state) => state.brands.brands);
  const brandProductCounts = useSelector(
    (state) => state.brands.brandProductCounts
  );
  const selectedBrands = useSelector((state) => state.brands.selectedBrands);
  const searchQuery = useSelector((state) => state.brands.searchQuery);
  const [searchResults, setSearchResults] = useState([]);
  const dispatch = useDispatch();

  const handleBrandCheckboxChange = (event) => {
    const selected = event.target.value;
    const isChecked = event.target.checked;

    const updatedSelectedBrands = isChecked
      ? Array.isArray(selectedBrands)
        ? [...selectedBrands, selected]
        : [selected]
      : Array.isArray(selectedBrands)
      ? selectedBrands.filter((brand) => brand !== selected)
      : [];

    dispatch(updateSelectedBrands(updatedSelectedBrands));
  };

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  useEffect(() => {
    const filteredBrands = brands.filter((brand) =>
      brand.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
    );
    setSearchResults(filteredBrands);
  }, [debouncedSearchQuery, brands]);

  return (
    <div className="sidebar__section">
      <p className="sidebar__title">Brands</p>
      <CustomTextField
        fullWidth
        size="small"
        placeholder="Search for brands ..."
        value={searchQuery}
        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <ul>
        {searchResults.map((brand, index) => (
          <li key={index} className="my-2 ms-3">
            <FormControlLabel
              control={
                <CustomCheckbox
                  type="checkbox"
                  value={brand}
                  checked={selectedBrands && selectedBrands.includes(brand)}
                  onChange={handleBrandCheckboxChange}
                />
              }
              label={
                <>
                  <span
                    className={`brand__item px-2 ms-2 ${
                      selectedBrands && selectedBrands.includes(brand)
                        ? "fw-bold"
                        : ""
                    }`}
                  >
                    {brand}
                  </span>
                  <span
                    className={`product-count p-1 ${
                      selectedBrands && selectedBrands.includes(brand)
                        ? "fw-bold"
                        : ""
                    }`}
                  >
                    {brandProductCounts[brand] || 0}{" "}
                  </span>
                </>
              }
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Brand;

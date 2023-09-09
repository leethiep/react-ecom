import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Slider from "@mui/material/Slider";
import useFetchMaxPrice from "../hooks/FetchMaxPrice";
import { setPriceRange } from "../actions/priceActions";
import { styled } from "@mui/system";
import { primaryColor } from "../assets/variables/color";





const CustomSlider = styled(Slider) ({
  "& .MuiSlider-thumb": {
    backgroundColor: primaryColor,
    border: `1px solid ${primaryColor}`,
    height: 16,
    width: 16,
    marginTop: -2,
    "&:hover": {
      boxShadow: "none",
    },
  },
  "& .MuiSlider-track": {
    height: 6,
    backgroundColor: primaryColor,
  },
  "& .MuiSlider-valueLabel": {
    backgroundColor: "#fff",
    color: primaryColor,
    borderRadius: 4,
    padding: 4,
    fontSize: 16,
    fontWeight: 700,
  },
  "&.Mui-disabled": {
    backgroundColor: primaryColor,
    cursor: "not-allowed",
    pointerEvents: "none",
    "& .MuiSlider-thumb": {
      borderColor: primaryColor,
    },
    "& .MuiSlider-track": {
      backgroundColor: primaryColor,
    },
    "& .MuiSlider-valueLabel": {
      backgroundColor: primaryColor,
    },
  },
});

function Price() {
  const dispatch = useDispatch();
  const priceRange = useSelector((state) => state.price.priceRange);
  const selectedBrands = useSelector((state) => state.brands.selectedBrands);
  const maxPrice = useSelector((state) => state.price.maxPrice);

  const handlePriceRangeChange = (event, newRange) => {
    dispatch(setPriceRange(newRange));
  };

  const loading = useFetchMaxPrice(selectedBrands);

  return (
   
      <div className="sidebar__section">
        <p className="sidebar__title">
          Price Range:
        </p>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <CustomSlider
              min={0}
              max={maxPrice}
              value={priceRange}
              onChange={handlePriceRangeChange}
              valueLabelDisplay="on"
              valueLabelFormat={(value) => `$${value}`}
            />
          </>
        )}
      </div>
    
  );
}

export default Price;

import React, { useState, useEffect } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

function Price({ onSelectPrice, selectedPrice }) {
  const [priceRange, setPriceRange] = useState(selectedPrice);
  const [maxPrice, setMaxPrice] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        const products = data;
        const productPrices = products.map((product) => product.price);
        const maxPrice = Math.ceil(Math.max(...productPrices));

        setMaxPrice(maxPrice);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
  };

  useEffect(() => {
    onSelectPrice(priceRange);
  }, [priceRange]);
  useEffect(() => {
    setPriceRange(selectedPrice);
  }, [selectedPrice]);
  

  return (
    <div className="sidebar__section">
      <h5 className="sidebar__title">Price Range:</h5>
      <Slider
        min={0}
        max={maxPrice}
        value={priceRange}
        onChange={handlePriceRangeChange}
        range
        tipFormatter={(value) => `$${value}`}
        className="custom-slider"
      />
      <p>
        Price: ${priceRange[0]} - ${priceRange[1]}
      </p>
    </div>
  );
}

export default Price;

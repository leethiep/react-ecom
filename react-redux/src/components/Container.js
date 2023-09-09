import React, { useState } from "react";

import NavFilter from "./NavFilter";
import Products from "./Products";
import Brand from "./Brand";
import Category from "./Category";
import Price from "./Price";
import Rating from "./Rating";
import FreeShipping from "./FreeShipping";

function Container() {
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedPrice, setSelectedPrice] = useState([0, 1600]);

  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedFreeShipping, setSelectedFreeShipping] = useState(null);

  const [selectedSortOption, setSelectedSortOption] = useState("featured");
  const [productsPerPage, setProductsPerPage] = useState(16);
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedParentIndex, setExpandedParentIndex] = useState(-1);

  const handleClearFilter = () => {
    setSelectedBrands([]);
    setSelectedCategory([]);
    setSelectedPrice([0, 1600]);

    setSelectedRating(null);
    setSelectedFreeShipping(null);

    // Clear the filters logic

    // Set the expandedParentIndex back to its initial value
    setExpandedParentIndex(-1);
  };
  const handleSortChange = (selectedSortOption) => {
    setSelectedSortOption(selectedSortOption);
  };
  const handleProductsPerPageChange = (productsPerPage) => {
    setProductsPerPage(productsPerPage);
  };

  return (
    <div className="container">
      <NavFilter
        onSortChange={handleSortChange}
        onProductsPerPageChange={handleProductsPerPageChange}
        onClearFilter={handleClearFilter}
      />

      <div className="row">
        <div className="col-3">
          <Category onClearFilter={handleClearFilter} />
          <Brand />

          <Price />
          <FreeShipping />

          <Rating />
        </div>
        <div className="col-9">
          <Products
            selectedSortOption={selectedSortOption}
            productsPerPage={productsPerPage}
          />
        </div>
      </div>
    </div>
  );
}

export default Container;

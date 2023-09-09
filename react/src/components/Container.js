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


  const handleClearFilter = () => {
    setSelectedBrands([]);
    setSelectedCategory([]);
    setSelectedPrice([0, 1600]); 
    
    setSelectedRating(null);
    setSelectedFreeShipping(null);
  };
  const handleSortChange = (selectedSortOption) => {
    setSelectedSortOption(selectedSortOption);
  };
  const handleProductsPerPageChange = (productsPerPage) => {
    setProductsPerPage(productsPerPage);
  };
  const handleSelectBrand = (selectedBrands) => {
    setSelectedBrands(selectedBrands);
  };
  const handleSelectCategory = (selectedCategory) => {
    setSelectedCategory(selectedCategory);
  };
  const handleSelectPrice = (priceRange) => {
    setSelectedPrice(priceRange);
  };
  const handleSelectRating = (rating) => {
    setSelectedRating(rating);
  };
  const handleSelectFreeShipping = (freeShipping) => {
    setSelectedFreeShipping(freeShipping);
  };

  return (
    <div className="container">
      <NavFilter
        onClearFilter={handleClearFilter}
        onSortChange={handleSortChange}
        onProductsPerPageChange={handleProductsPerPageChange}
      />
      <div className="row">
        <div className="col-3">
          <Category
            onSelectCategory={handleSelectCategory}
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategory}
          />
          <Brand onSelectBrand={handleSelectBrand} selectedBrands={selectedBrands} />

          <Price onSelectPrice={handleSelectPrice} selectedPrice={selectedPrice} selectedBrands={selectedBrands}/>
          <FreeShipping onSelectFreeShipping={handleSelectFreeShipping} selectedFreeShipping={selectedFreeShipping}/>

          <Rating onSelectRating={handleSelectRating} selectedRating={selectedRating} selectedBrands={selectedBrands}/>
        </div>
        <div className="col-9">
          <Products
            selectedBrands={selectedBrands}
            selectedCategories={selectedCategory}
            selectedPrice={selectedPrice}
            selectedRating={selectedRating}
            selectedFreeShipping={selectedFreeShipping}
            selectedSortOption={selectedSortOption}
            productsPerPage={productsPerPage}
            searchQuery={searchQuery}
          />
        </div>
      </div>
    </div>
  );
}

export default Container;

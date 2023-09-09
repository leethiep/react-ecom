import React, { useState } from "react";
import { ArrowClockwise } from "react-bootstrap-icons";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { setFreeShipping } from "../actions/shippingActions";
import { setSelectedBrands } from "../actions/brandActions";
import { setSearchProduct } from "../actions/searchAction";
import { setSelectedCategories } from "../actions/categoryAction";
import { setPriceRange } from "../actions/priceActions";
import { setRating } from "../actions/ratingActions";

function NavFilter({ onSortChange, onProductsPerPageChange, onClearFilter }) {
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState("featured");
  const [productsPerPage, setProductsPerPage] = useState(16); 
 
  const initialFreeShipping = null;
  const initialSelectedBrands = [];
  const initialSearchQuery = "";
  const initialSelectedCategories = [];
  const initialPriceRange = [1, 1600]; 
  const initialRating = null;
  const [expandedParentIndex, setExpandedParentIndex] = React.useState(-1);
  const handleClearFilter = () => {
    dispatch(setFreeShipping(initialFreeShipping));
    dispatch(setSelectedBrands(initialSelectedBrands));
    dispatch(setSearchProduct(initialSearchQuery));
    dispatch(setSelectedCategories(initialSelectedCategories));
    dispatch(setPriceRange(initialPriceRange));
    dispatch(setRating(initialRating));
    onClearFilter(expandedParentIndex);
  };
  const handleSortChange = (event) => {
    const newSortOption = event.target.value;
    setSortOption(newSortOption);

    onSortChange(newSortOption);
  };
  const handleProductsPerPageChange= (event) => {
    const newProductsPerPageChange = event.target.value;
    setProductsPerPage(newProductsPerPageChange);

    onProductsPerPageChange(newProductsPerPageChange);
  };

  return (
    <div className="d-flex align-items-center justify-content-between border-bottom py-3">
      <div className="right-side d-flex">
        <h2>Filter</h2>
        <div
          className="btn clear-filter d-flex align-items-center"
          onClick={handleClearFilter}
        >
          <ArrowClockwise className="mx-2" />
          <span className="text-secondary">Clear filter</span>
        </div>
      </div>
      <div className="left-side d-flex ">
        <Form.Select
          aria-label="Sort by featured"
          className="mx-2"
          value={sortOption}
          onChange={handleSortChange}
        >
          <option value="featured">Sort by featured</option>
          <option value="price-asc">Price ascending</option>
          <option value="price-des">Price descending</option>
        </Form.Select>
        <Form.Select
          aria-label="Number of products per page"
          value={productsPerPage}
          onChange={handleProductsPerPageChange}
        >
          <option value="16">16 hits per page</option>
          <option value="32">32 hits per page</option>
          <option value="64">64 hits per page</option>
        </Form.Select>
      </div>
    </div>
  );
}

export default NavFilter;

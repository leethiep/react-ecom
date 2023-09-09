// src/actions/brandActions.js
import axios from 'axios';

export const setBrands = (brands) => ({
  type: 'SET_BRANDS',
  payload: brands,
});

export const setSearchQuery = (query) => ({
  type: 'SET_SEARCH_QUERY',
  payload: query,
});

export const setSearchResults = (results) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: results,
});

export const setBrandProductCounts = (counts) => ({
  type: 'SET_BRAND_PRODUCT_COUNTS',
  payload: counts,
});

export const fetchBrandsAndCounts = () => {
  return (dispatch) => {
    fetch('http://localhost:3000/products')
      .then((response) => response.json())
      .then((data) => {
        const uniqueBrands = Array.from(new Set(data.map((product) => product.brand)));
        dispatch(setBrands(uniqueBrands));

        const brandCounts = {};
        uniqueBrands.forEach((brand) => {
          const count = data.filter((product) => product.brand === brand).length;
          brandCounts[brand] = count;
        });
        dispatch(setBrandProductCounts(brandCounts));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
};

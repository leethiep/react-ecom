import React, { useState, useEffect } from "react";
import { Search } from "react-bootstrap-icons";

function Brand({ onSelectBrand, selectedBrands }) {
  const [brands, setBrands] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [brandProductCounts, setBrandProductCounts] = useState({});

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        const uniqueBrands = Array.from(
          new Set(data.map((product) => product.brand))
        );
        setBrands(uniqueBrands);

        const brandCounts = {};
        uniqueBrands.forEach((brand) => {
          const count = data.filter(
            (product) => product.brand === brand
          ).length;
          brandCounts[brand] = count;
        });
        setBrandProductCounts(brandCounts);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleBrandCheckboxChange = (event) => {
    const selected = event.target.value;
    const updatedSelectedBrands = event.target.checked
      ? [...selectedBrands, selected]
      : selectedBrands.filter((brand) => brand !== selected);

    onSelectBrand(updatedSelectedBrands);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const filteredBrands = brands.filter((brand) =>
      brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filteredBrands);
  }, [searchQuery, brands]);

  return (
    <div className="sidebar__section">
      <p className="sidebar__title">Brands</p>
      <div className="input-group mb-3">
        <span className="input-group-text bg-gray border-0">
          <Search />
        </span>
        <input
          type="text"
          placeholder="Search for brands ..."
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="form-control border-0 bg-gray"
        />
      </div>
      <ul>
        {searchResults.map((brand, index) => (
          <li key={index}>
            <label className="custom-checkbox">
              <input
                type="checkbox"
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={handleBrandCheckboxChange}
              />

             
              <span className="brand__item px-2">{brand}</span>
              <span className="product-count p-1">
                {brandProductCounts[brand] || 0}{" "}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Brand;

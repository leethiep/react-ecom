import React, { useState, useEffect } from "react";
import { Star, AttachMoney } from "@mui/icons-material";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { CardContent, CardMedia, Typography } from "@mui/material";
function Products({ selectedSortOption, productsPerPage }) {
  const products = useSelector((state) => state.products.products);
  const selectedBrands = useSelector((state) => state.brands.selectedBrands);
  const selectedCategories = useSelector(
    (state) => state.categories.selectedCategories
  );

  const priceRange = useSelector((state) => state.price.priceRange);
  const isFreeShipping = useSelector(
    (state) => state.freeShipping.isFreeShipping
  );
  const rating = useSelector((state) => state.rating.rating);
  const search = useSelector((state) => state.search.searchProduct);

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
          const filtered = filterProducts(
        products,
        selectedBrands,
        selectedCategories,
        priceRange,
        rating,
        isFreeShipping,
        search
      );

      let sortedProducts = [...filtered];
      if (selectedSortOption === "price-asc") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (selectedSortOption === "price-des") {
        sortedProducts.sort((a, b) => b.price - a.price);
      }

      setFilteredProducts(sortedProducts);
     }, [
    products,
    selectedBrands,
    selectedCategories,
    priceRange,
    rating,
    isFreeShipping,
    selectedSortOption,
    search,
  ]);

  const filterProducts = (
    products,
    brands,
    categories,
    price,
    rating,
    freeShipping,
    search
  ) => {
    return products.filter((product) => {
      
      const matchCategory =
        categories.length === 0 ||
        categories.every((category) => product.categories.includes(category));
      const matchBrand =
        brands.length === 0 || brands.some((brand) => product.brand === brand);
      const matchPrice = price[0] <= product.price && product.price <= price[1];
      const matchRating = rating === null || product.rating === rating;
      const matchFreeShipping =
        freeShipping === null || product.free_shipping === freeShipping;

      const formattedSearchQuery = search.replace(/\s+/g, "").toLowerCase();

      const matchSearchQuery =
        formattedSearchQuery === "" ||
        product.name.toLowerCase().includes(formattedSearchQuery) ||
        product.description.toLowerCase().includes(formattedSearchQuery);

      return (
        matchCategory &&
        matchBrand &&
        matchPrice &&
        matchRating &&
        matchFreeShipping &&
        matchSearchQuery
      );
    });
  };

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const offset = (currentPage - 1) * productsPerPage;
  const currentPageProducts = filteredProducts.slice(
    offset,
    offset + productsPerPage
  );

  const handlePageChange = (_, newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <div className="row product__container">
        {currentPageProducts.length === 0 ? (
          <Typography variant="h6">No products found.</Typography>
        ) : (
          currentPageProducts.map((product) => (
            <div key={product.objectID} className="col-lg-3 product__item">
              <CardMedia
                component="img"
                src={product.image}
                alt={product.image}
                className="product__img image-fluid py-4 w-100"
              />
              <CardContent>
                <Typography variant="subtitle2" color="textSecondary" className="product__category">
                  {product.categories[0]}
                </Typography>
                <Typography variant="body2" className="product-name">
                  {product.name}
                </Typography>
                <Typography variant="body2" className="product-desc">
                  {product.description}
                </Typography>
                <div className="d-flex align-items-center">
                  <AttachMoney className="text-primary product__icon" />
                  <Typography variant="body2" className="fw-bold">
                    {product.price}
                  </Typography>
                  <div className="d-flex align-items-center border border-primary px-1 rounded mx-2 text-primary ">
                    <Star className="mx-1 product__icon" />
                    <Typography variant="body2">{product.rating}</Typography>
                  </div>
                </div>
              </CardContent>
            </div>
          ))
        )}
      </div>
      <div className="pagination d-flex justify-content-center">
      
      <Pagination
          count={pageCount}
          classes={{
            ul: "custom-pagination",
            root: "pagination-container",
            item: "customPaginationItemClass", 
          }}
          size="large"
          page={currentPage}
          variant="outlined"
          shape="rounded"
          onChange={handlePageChange}
         
        />

          
      </div>
    </div>
  );
}

export default Products;

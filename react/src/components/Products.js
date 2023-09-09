import React, { useState, useEffect } from "react";

import { StarFill, CurrencyDollar } from "react-bootstrap-icons";
import ReactPaginate from "react-paginate";
import { useSearchContext } from "./SearchContext";

function Products({
  selectedBrands,
  selectedCategories,
  selectedPrice,
  selectedRating,
  selectedFreeShipping,
  selectedSortOption,
  productsPerPage,
}) {
  
  const { searchQuery } = useSearchContext();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    // Lọc sản phẩm dựa trên các điều kiện đã chọn và searchQuery
    const filtered = filterProducts(
      products,
      selectedBrands,
      selectedCategories,
      selectedPrice,
      selectedRating,
      selectedFreeShipping,
      searchQuery
    );

    // Sắp xếp sản phẩm theo tùy chọn sắp xếp
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
    selectedPrice,
    selectedRating,
    selectedFreeShipping,
    selectedSortOption,
    searchQuery,
  ]);

  const filterProducts = (
    products,
    brands,
    categories,
    price,
    rating,
    freeShipping,
    searchQuery
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

        const formattedSearchQuery = searchQuery.replace(/\s+/g, "").toLowerCase();

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

  if (loading) {
    return <div>Loading...</div>;
  }
  // Tính toán phân trang

  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const offset = currentPage * productsPerPage;
  const currentPageProducts = filteredProducts.slice(
    offset,
    offset + productsPerPage
  );

  // Xử lý sự kiện khi chuyển trang
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="row product__container">
        {currentPageProducts.length === 0 ? (
          <h2>No products found.</h2>
        ) : (
          currentPageProducts.map((product) => (
            <div key={product.objectID} className="col-lg-3 product__item">
              <img
                src={product.image}
                alt={product.image}
                className="product__img image-fluid py-4 w-100"
              />
              <h6 className="text-uppercase text-secondary">
                {" "}
                {product.categories[0]}
              </h6>
              <h6 className="product-name fw-bold">{product.name}</h6>
              <p className="product-desc"> {product.description}</p>
              <p className="d-flex align-items-center">
                <span className="text-primary fw-bold d-flex align-items-center ">
                  <CurrencyDollar className="display-7" />
                </span>
                <span className="fw-bold">{product.price}</span>{" "}
                <span className="d-flex align-items-center border border-primary px-1 rounded mx-2 text-primary product__icon">
                  <StarFill className="  mx-1" />
                  {product.rating}
                </span>
              </p>
            </div>
          ))
        )}
      </div>
      <div className="pagination d-flex justify-content-center">
        <ReactPaginate
          previousLabel={"<"} 
          nextLabel={">"} 
          pageCount={pageCount}
          onPageChange={handlePageChange}
          containerClassName={"pagination-container"}
          pageLinkClassName={"pagination-item p-2 "} 
          previousLinkClassName={"pagination-arrow"}
          nextLinkClassName={"pagination-arrow"}
          disabledClassName={"pagination-disabled"}
          activeClassName={"pagination-active bg-primary "} 
        />
      </div>
    </div>
  );
}

export default Products;

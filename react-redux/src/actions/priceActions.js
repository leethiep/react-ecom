const BASE_URL = "http://localhost:3000/products";

export const setPriceRange = (priceRange) => {
  return {
    type: "SET_PRICE_RANGE",
    payload: priceRange,
  };
};
export const setMaxPrice = (maxPrice) => {
  return {
    type: "SET_MAX_PRICE",
    payload: maxPrice,
  };
};
export const fetchMaxPrice = async (selectedBrands) => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();
  
      // Lọc sản phẩm dựa trên selectedBrands (nếu có)
      const filteredProducts = selectedBrands.length > 0
        ? data.filter(product => selectedBrands.includes(product.brand))
        : data;
  
      const productPrices = filteredProducts.map((product) => product.price);
      const maxPrice = Math.ceil(Math.max(...productPrices));
  
      return maxPrice;
    } catch (error) {
      console.error("Error fetching max price:", error);
    }
  };
  
   
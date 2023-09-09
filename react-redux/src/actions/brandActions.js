const BASE_URL = 'http://localhost:3000/products'; 
export const setBrands = (brands) => ({
  type: 'SET_BRANDS',
  payload: brands
});

export const setBrandProductCounts = (counts) => ({
  type: 'SET_BRAND_PRODUCT_COUNTS',
  payload: counts
});
export const setSelectedBrands = (selectedBrands) => ({
  type: 'SET_SELECTED_BRANDS',
  payload: selectedBrands
});
export const updateSelectedBrands = (updatedBrands) => ({
  type: 'UPDATE_SELECTED_BRANDS',
  payload: updatedBrands
});
export const setSearchQuery = (searchQuery) => ({
  type: 'SET_SEARCH_QUERY',
  payload: searchQuery
});
export const setSearchResults = (searchResults) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: searchResults
});

export const fetchBrandsAndCounts = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    
    const uniqueBrands = Array.from(new Set(data.map(product => product.brand)));
    
    const brandCounts = {};
    uniqueBrands.forEach(brand => {
      const count = data.filter(product => product.brand === brand).length;
      brandCounts[brand] = count;
    });

    return { uniqueBrands, brandCounts }; // Trả về đối tượng chứa cả hai dữ liệu
  } catch (error) {
    console.error('Error fetching brand data:', error);
    return null; // Trả về null trong trường hợp lỗi
  }
};

export const searchBrands = (searchQuery) => (dispatch, getState) => {
  dispatch(setSearchQuery(searchQuery)); // Cập nhật trạng thái truy vấn tìm kiếm

  const state = getState();
  const brands = state.brands.brands;

  const filteredBrands = brands.filter(brand =>
    brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  dispatch(setSearchResults(filteredBrands)); // Cập nhật trạng thái kết quả tìm kiếm
  return filteredBrands; // Trả về mảng thương hiệu đã lọc
};

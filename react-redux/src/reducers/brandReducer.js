const initialState = {
  selectedBrands: [],
  brands: [],
  searchQuery: "",
  searchResults: [],
  brandProductCounts: {},
};

const brandReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_BRANDS":
      return {
        ...state,
        selectedBrands: action.payload,
      };
    case "UPDATE_SELECTED_BRANDS":
      return {
        ...state,
        selectedBrands: action.payload,
      };

    case "SET_BRANDS":
      return {
        ...state,
        brands: action.payload,
      };
    case "SET_SEARCH_QUERY":
      return {
        ...state,
        searchQuery: action.payload,
      };
    case "SET_SEARCH_RESULTS":
      return {
        ...state,
        searchResults: action.payload,
      };
    case "SET_BRAND_PRODUCT_COUNTS":
      return {
        ...state,
        brandProductCounts: action.payload,
      };
    default:
      return state;
  }
};

export default brandReducer;

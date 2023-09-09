const initialState = {
  searchProduct: "",
  searchProductResults: [],
  };
  const searchReducer = (state = initialState, action) => {
    switch (action.type) {
     
      case "SET_SEARCH_PRODUCT":
        return {
          ...state,
          searchProduct: action.payload,
        };
      case "SET_SEARCH_PRODUCT_RESULTS":
        return {
          ...state,
          searchProductResults: action.payload,
        };
      
      default:
        return state;
    }
  };
  
  export default searchReducer;
  
import { combineReducers } from 'redux';

const brandsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_BRANDS':
      return action.payload;
    default:
      return state;
  }
};

const searchQueryReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_QUERY':
      return action.payload;
    default:
      return state;
  }
};

const searchResultsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return action.payload;
    default:
      return state;
  }
};

const brandProductCountsReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_BRAND_PRODUCT_COUNTS':
      return action.payload;
    default:
      return state;
  }
};

export default combineReducers({
  brands: brandsReducer,
  searchQuery: searchQueryReducer,
  searchResults: searchResultsReducer,
  brandProductCounts: brandProductCountsReducer,
});

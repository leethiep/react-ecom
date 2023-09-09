const initialState = {
    priceRange: [1, 1600],
    maxPrice: 0,
  };
  
  const priceReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_PRICE_RANGE':
        return {
          ...state,
          priceRange: action.payload,
        };
        case 'SET_MAX_PRICE':
        return {
          ...state,
          maxPrice: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default priceReducer;
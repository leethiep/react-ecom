const initialState = {
    isFreeShipping: null,
  };
  
  const freeShippingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_FREE_SHIPPING':
        return {
          ...state,
          isFreeShipping: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default freeShippingReducer;
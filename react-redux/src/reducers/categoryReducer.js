

const initialState = {
  categoryMap: [],
  selectedCategories: []
};

const categoryReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CATEGORIES':
      return {
        ...state,
        categoryMap: action.payload
      };
    case 'SET_SELECTED_CATEGORIES':
      return {
        ...state,
        selectedCategories: action.payload
      };
    default:
      return state;
  }
};

export default categoryReducer;

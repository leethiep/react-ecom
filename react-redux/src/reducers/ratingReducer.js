const initialState = {
    rating: null,
    ratingCount: [], // Thêm trường ratingCount và khởi tạo là một mảng rỗng
  };
  
  const ratingReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_RATING':
        return {
          ...state,
          rating: action.payload,
        };
      case 'SET_RATING_COUNT':
        return {
          ...state,
          ratingCount: action.payload, // Lưu ratingCount từ action.payload
        };
      default:
        return state;
    }
  };
  
  export default ratingReducer;
  
const BASE_URL = "http://localhost:3000/products";
export const setRating = (rating) => ({
  type: 'SET_RATING',
  payload: rating,
});

export const setRatingCount = (ratingCount) => ({
  type: 'SET_RATING_COUNT',
  payload: ratingCount,
});

export const fetchRatingCount = (selectedBrands) => {
  return async (dispatch) => {
    try {
      const response = await fetch(BASE_URL);
      const data = await response.json();

      const countMap = {};
      data.forEach((product) => {
        if (
          selectedBrands.length === 0 ||
          selectedBrands.includes(product.brand)
        ) {
          const productRating = Math.floor(product.rating);
          countMap[productRating] = (countMap[productRating] || 0) + 1;
        }
      }); 

      const sortedCount = Object.keys(countMap)
        .map((rating) => ({
          rating: Number(rating),
          count: countMap[rating],
        }))
        .sort((a, b) => b.rating - a.rating);

      // Dispatch the sortedCount to update the rating count state
      dispatch(setRatingCount(sortedCount));
    } catch (error) {
      console.error("Error fetching rating count:", error);
    }
  };
};

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import thunk from 'redux-thunk'; // Import Redux Thunk
import productReducer from './reducers/productReducer';
import brandReducer from './reducers/brandReducer';
import categoryReducer from './reducers/categoryReducer';
import priceReducer from './reducers/priceReducer';
import freeShippingReducer from './reducers/shippingReducer';
import ratingReducer from './reducers/ratingReducer';
import searchReducer from './reducers/searchReducer';

const store = configureStore({
  reducer: {
    products: productReducer,
    brands: brandReducer,
    categories: categoryReducer,
    price : priceReducer,
    freeShipping: freeShippingReducer,
    rating : ratingReducer,
    search : searchReducer
  },
  middleware: [thunk], 
});

export default store;

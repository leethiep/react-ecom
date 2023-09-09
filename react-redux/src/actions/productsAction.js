const BASE_URL = 'http://localhost:3000/products';
export const setProducts = (products) => {
    return {
      type: 'SET_PRODUCTS',
      payload: products
    };
  };
  

export const fetchData = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

  
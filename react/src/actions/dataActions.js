import axios from 'axios';

export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
const URL = 'http://localhost:3000/products';

export const fetchData = () => {
  return (dispatch) => {
    axios.get(URL) 
      .then(response => {
        dispatch({
          type: FETCH_DATA_SUCCESS,
          payload: response.data
        });
      })
      .catch(error => {
        console.error("Error fetching data:", error);
      });
  };
};

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setMaxPrice, fetchMaxPrice } from "../actions/priceActions";

const useFetchMaxPrice = (selectedBrands) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndDispatchMaxPrice = async () => {
      try {
        // Simulate API call for demonstration purposes
        const maxPriceFromAPI = await fetchMaxPrice(selectedBrands);
        dispatch(setMaxPrice(maxPriceFromAPI));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching and dispatching max price:", error);
        setLoading(false);
      }
    };

    fetchAndDispatchMaxPrice();
  }, [dispatch, selectedBrands]);

  return loading;
};

export default useFetchMaxPrice;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRatingCount } from "../actions/ratingActions";

export function useRatingCount(selectedBrands) {
  const dispatch = useDispatch();
  const ratingCount = useSelector((state) => state.rating.ratingCount);

  useEffect(() => {
    dispatch(fetchRatingCount(selectedBrands));
  }, [dispatch, selectedBrands]);

  return ratingCount;
}

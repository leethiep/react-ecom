import React, { useState, useEffect } from "react";
import { StarFill } from "react-bootstrap-icons";

function Rating({ onSelectRating, selectedRating, selectedBrands }) {
  const [ratingCount, setRatingCount] = useState([]);
  const [rating, setRating] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        const products = data;
        const countMap = {};
        products.forEach((product) => {
          if (
            selectedBrands.length === 0 ||
            selectedBrands.includes(product.brand)
          ) {
            const productRating = Math.floor(product.rating);
            countMap[productRating] = (countMap[productRating] || 0) + 1;
          }
        });

        // Sort ratingCount array by rating in descending order
        const sortedCount = Object.keys(countMap)
          .map((rating) => ({
            rating: Number(rating),
            count: countMap[rating],
          }))
          .sort((a, b) => b.rating - a.rating);

        setRatingCount(sortedCount);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedBrands]);
  useEffect(() => {
    setRating(selectedRating);
  }, [selectedRating]);

  // Hàm render sao dựa trên rating và số lượng sao
  const renderStars = (rating, totalStars) => {
    const stars = [];
    const primaryStars = rating > totalStars ? totalStars : rating;
    const grayStars = totalStars - primaryStars;

    for (let i = 0; i < primaryStars; i++) {
      stars.push(<StarFill key={i} className="text-primary" />);
    }
    for (let i = 0; i < grayStars; i++) {
      stars.push(
        <StarFill key={i + primaryStars} className="text-secondary" />
      );
    }
    return stars;
  };
  const handleSelectRating = (rating) => {
    onSelectRating(rating);
  };

  return (
    <div className="sidebar__section">
      <p className="sidebar__title">Rating Counts</p>
      <ul>
        {ratingCount.map((ratingData, index) => (
          <li
            key={index}
            className="d-flex justify-items-center my-2"
            onClick={() => handleSelectRating(ratingData.rating)}
          >
            <span className="px-1 rating__icon d-flex justify-items-center ">
              {renderStars(ratingData.rating, 5)}
            </span>{" "}
            <span className="product-count p-1">{ratingData.count}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Rating;

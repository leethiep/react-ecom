import React, { useState } from "react";
import { Star } from "@mui/icons-material";
import { useRatingCount } from "../hooks/RatingCount";
import { useDispatch, useSelector } from "react-redux";
import { setRating } from "../actions/ratingActions";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";

import { primaryColor, grayColor } from "../../src/assets/variables/color";

function Rating() {
  const starFontSize = "30px";
  const dispatch = useDispatch();
  const selectedBrands = useSelector((state) => state.brands.selectedBrands);

  const ratingCount = useRatingCount(selectedBrands);

  const handleRatingChange = (newRating) => {
    dispatch(setRating(newRating));
  };

  const renderStars = (rating, totalStars, index) => {
    const stars = [];
    const primaryStars = rating > totalStars ? totalStars : rating;
    const grayStars = totalStars - primaryStars;

    for (let i = 0; i < primaryStars; i++) {
      stars.push(
        <Star
          key={i}
          className="rating__icon"
          sx={{
            color: primaryColor,
            fontSize: starFontSize,
            opacity: selectedStars === index ? 1 : 0.6,
            cursor: "pointer",
          }}
          onClick={() => handleStarClick(index)}
        />
      );
    }
    for (let i = 0; i < grayStars; i++) {
      stars.push(
        <Star
          key={i + primaryStars}
          className="rating__icon"
          sx={{
            color: grayColor,
            fontSize: starFontSize,
            opacity: selectedStars === index ? 1 : 0.6,
            cursor: "pointer",
          }}
          onClick={() => handleStarClick(index)}
        />
      );
    }
    return stars;
  };

  const [selectedStars, setSelectedStars] = useState(null); 

  const handleStarClick = (index) => {
    setSelectedStars(index === selectedStars ? null : index); 
  };

  return (
    <div className="sidebar__section">
      <p className="sidebar__title">
        Rating Counts
      </p>
      <List>
        {ratingCount &&
          ratingCount.map((ratingData, index) => (
            <ListItem
              key={index}
              className="d-flex justify-items-center my-2 mx-0"
              onClick={() => handleRatingChange(ratingData.rating)}
            >
              <span className="px-1 d-flex justify-items-center ">
                {renderStars(ratingData.rating, 5, index)}
              </span>{" "}
              <Typography className={`product-count p-1 ${selectedStars === index ? "selected" : ""}`}>
                {ratingData.count}
              </Typography>
            </ListItem>
          ))}
      </List>
    </div>
  );
}

export default Rating;

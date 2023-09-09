import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setSelectedCategories,
  fetchCategoryData,
  setCategories,
} from "../actions/categoryAction";
import { Collapse, ListItem, ListItemText, Typography } from "@mui/material";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {ArrowDropUp,ArrowDropDown } from '@mui/icons-material';

function Category({ onClearFilter }) {
  const dispatch = useDispatch();
  const selectedBrands = useSelector((state) => state.brands.selectedBrands);
  const categoryMap = useSelector((state) => state.categories.categoryMap);
  
  const selectedCategories = useSelector(
    (state) => state.categories.selectedCategories
  );

  const [expandedParentIndex, setExpandedParentIndex] = React.useState(-1);
  const [expandedChildIndex, setExpandedChildIndex] = React.useState(-1);
  const [resolvedCategoryMap, setResolvedCategoryMap] = useState([]);

  const handleParentToggle = (index) => {
    setExpandedParentIndex((prevIndex) => (index === prevIndex ? -1 : index));

    setExpandedChildIndex(-1);
  };

  const handleChildToggle = (index) => {
    setExpandedChildIndex((prevIndex) => (index === prevIndex ? -1 : index));
  };

  useEffect(() => {
    const selectedCategory = [];
    console.log(selectedCategory);
  
    if (expandedParentIndex !== -1 && categoryMap[expandedParentIndex]) {
      selectedCategory.push(categoryMap[expandedParentIndex].parent);
      console.log(selectedCategory);
    }
  
    if (
      expandedChildIndex !== -1 &&
      categoryMap[expandedParentIndex]?.children &&
      categoryMap[expandedParentIndex].children[expandedChildIndex]
    ) {
      selectedCategory.push(
        categoryMap[expandedParentIndex].children[expandedChildIndex].name
      );
    }
  
    console.log(selectedCategory);
  
    dispatch(setSelectedCategories(selectedCategory));
  }, [expandedParentIndex, expandedChildIndex, categoryMap, dispatch]);
  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const receivedCategoryMap = await fetchCategoryData(selectedBrands);
        if (receivedCategoryMap) {
          dispatch(setCategories(receivedCategoryMap));
          setResolvedCategoryMap(receivedCategoryMap);
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    fetchData();
  }, [dispatch, selectedBrands]);

  return (
    <div className="sidebar__section">
      <p className="sidebar__title">Category</p>
      {resolvedCategoryMap.map((category, parentIndex) => (
        <div key={parentIndex} className="custom-dropdown">
          <ListItem
            onClick={() => handleParentToggle(parentIndex)}
            className={`custom-dropdown-header ${
              parentIndex === expandedParentIndex &&
              selectedCategories.length > 0
                ? "active"
                : ""
            }`}
          >
            {parentIndex === expandedParentIndex &&
            selectedCategories.length > 0 ? (
              <ArrowDropUp />
            ) : (
              <ArrowDropDown />
            )}
            <ListItemText
              primary={
                <div className="d-flex align-items-center">
                  <Typography
                    variant="body1"
                    style={{
                      fontWeight:
                        parentIndex === expandedParentIndex ? "bold" : "normal",
                    }}
                  >
                    {category.parent}
                  </Typography>
                  <Typography variant="body2" className="product-count p-1 mx-1">
                    {category.count}
                  </Typography>
                </div>
              }
            />
          </ListItem>
          <Collapse
            in={parentIndex === expandedParentIndex}
            timeout="auto"
            unmountOnExit
            className="custom-dropdown-content ms-3"
          >
            <ul>
              {category.children.map((child, childIndex) => (
                <ListItem
                  key={childIndex}
                  onClick={() => handleChildToggle(childIndex)}
                  className={`d-flex align-items-center ${
                    childIndex === expandedChildIndex &&
                    selectedCategories.length > 0
                      ? "active"
                      : ""
                  }`}
                >
                  {childIndex === expandedChildIndex ? (
                    <ArrowDropUp />
                  ) : (
                    <ArrowDropDown />
                  )}
                  <ListItemText
                    primary={
                      <div className="d-flex align-items-center">
                        <Typography
                          variant="body1"
                          style={{
                            fontWeight:
                              childIndex === expandedChildIndex
                                ? "bold"
                                : "normal",
                          }}
                        >
                          {child.name}
                        </Typography>
                        <Typography
                          variant="body2"
                          className="product-count p-1"
                        >
                          {child.count}
                        </Typography>
                      </div>
                    }
                  />
                </ListItem>
              ))}
            </ul>
          </Collapse>
        </div>
      ))}
    </div>
  );
}

export default Category;

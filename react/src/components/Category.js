import React, { useState, useEffect } from "react";
import { CaretDownFill, CaretUpFill } from "react-bootstrap-icons";

function Category({ selectedBrands, onSelectCategory, selectedCategories }) {
  const [categoryMap, setCategoryMap] = useState([]);

  const [expandedParentIndex, setExpandedParentIndex] = useState(-1);
  const [expandedChildIndex, setExpandedChildIndex] = useState(-1);

  const handleParentToggle = (index) => {
    setExpandedParentIndex(index === expandedParentIndex ? -1 : index);
    // Reset child index when a new parent is expanded
    setExpandedChildIndex(-1);
  };

  const handleChildToggle = (index) => {
    setExpandedChildIndex(index === expandedChildIndex ? -1 : index);
  };

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:3000/products")
      .then((response) => response.json())
      .then((data) => {
        // Process the data to create a category map with counts
        const products = data;
        const newCategoryMap = [];

        products.forEach((product) => {
          if (
            selectedBrands.length === 0 ||
            selectedBrands.includes(product.brand)
          ) {
            const parentCategory = product.categories[0];
            const childCategories = product.categories.slice(1);

            const existingParentCategory = newCategoryMap.find(
              (category) => category.parent === parentCategory
            );

            if (!existingParentCategory) {
              newCategoryMap.push({
                parent: parentCategory,
                count: 1,
                children: childCategories.map((childCategory) => ({
                  name: childCategory,
                  count: 1,
                })),
              });
            } else {
              existingParentCategory.count += 1;
              existingParentCategory.children =
                existingParentCategory.children.map((child) => {
                  if (childCategories.includes(child.name)) {
                    return { ...child, count: child.count + 1 };
                  }
                  return child;
                });
            }
          }
        });

        setCategoryMap(newCategoryMap);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [selectedBrands]);

  useEffect(() => {
    // Tạo mảng selectCategory dựa trên expandedParentIndex và expandedChildIndex
    const selectedCategory = [];
    if (expandedParentIndex !== -1) {
      selectedCategory.push(categoryMap[expandedParentIndex].parent);
      if (expandedChildIndex !== -1) {
        selectedCategory.push(
          categoryMap[expandedParentIndex].children[expandedChildIndex].name
        );
      }
    }
    // Gọi hàm onSelectCategory và truyền giá trị mảng selectedCategory
    onSelectCategory(selectedCategory);
  }, [expandedParentIndex, expandedChildIndex]);
  useEffect(() => {
    // Trong useEffect này, bạn cập nhật lại selectedCategories mỗi khi nó thay đổi
    onSelectCategory(selectedCategories);
  }, [selectedCategories]);
  return (
    <div className="sidebar__section">
      {categoryMap.map((category, parentIndex) => (
        <div key={parentIndex} className="custom-dropdown">
          <div
            className={`custom-dropdown-header  ${
              parentIndex === expandedParentIndex &&
              selectedCategories.length > 0
                ? "active fw-bold"
                : ""
            }`}
            onClick={() => handleParentToggle(parentIndex)}
          >
            {parentIndex === expandedParentIndex &&
            selectedCategories.length > 0 ? (
              <CaretUpFill className="m-3 text-secondary custom-icon" />
            ) : (
              <CaretDownFill className="m-3 text-secondary custom-icon" />
            )}
            {category.parent}{" "}
            <span className="product-count p-1">{category.count}</span>
          </div>
          {parentIndex === expandedParentIndex && (
            <div className="custom-dropdown-content ms-3">
              <ul>
                {category.children.map((child, childIndex) => (
                  <li
                    key={childIndex}
                    className={`d-flex align-items-center ${
                      childIndex === expandedChildIndex &&
                      selectedCategories.length > 0
                        ? "active"
                        : ""
                    }`}
                    onClick={() => handleChildToggle(childIndex)}
                  >
                    {childIndex === expandedChildIndex ? (
                      <CaretDownFill className="m-3 text-secondary custom-icon" />
                    ) : (
                      <CaretUpFill className="m-3 text-secondary custom-icon" />
                    )}
                    <span
                      className={
                        childIndex === expandedChildIndex &&
                        selectedCategories.length > 0
                          ? "fw-bold"
                          : ""
                      }
                    >
                      {child.name}
                      <span className="product-count p-1">{child.count}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Category;

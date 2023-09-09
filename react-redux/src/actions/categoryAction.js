
const BASE_URL = "http://localhost:3000/products";

export const setCategories = (categoryMap) => ({
  type: "SET_CATEGORIES",
  payload: categoryMap,
});

export const setSelectedCategories = (selectedCategories) => ({
  type: "SET_SELECTED_CATEGORIES",
  payload: selectedCategories,
});

export const fetchCategoryData = async (selectedBrands) => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();

    const products = data;
    const categoryMap = [];

    products.forEach((product) => {
      if (
        selectedBrands.length === 0 ||
        selectedBrands.includes(product.brand)
      ) {
        const parentCategory = product.categories[0];
        const childCategories = product.categories.slice(1);

        const existingParentCategory = categoryMap.find(
          (category) => category.parent === parentCategory
        );

        if (!existingParentCategory) {
          categoryMap.push({
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
    
    return categoryMap;
  } catch (error) {
    console.error("Error fetching category data:", error);
    return null;
  }
};

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Header from "./particals/Header";
import Container from "./components/Container";

import { setProducts, fetchData } from "./actions/productsAction";
import {
  fetchBrandsAndCounts,
  setBrands,
  setBrandProductCounts,
} from "./actions/brandActions";
import {
  fetchCategoryData,
  setCategories,
} from "../src/actions/categoryAction";


function App() {
  const dispatch = useDispatch();
  const brands = useSelector((state) => state.brands);
  useEffect(() => {
    const fetchAllData = async () => {
      const productData = await fetchData("products");
      if (productData) {
        dispatch(setProducts(productData));
      }
      const brandData = await fetchBrandsAndCounts();
      if (brandData) {
        dispatch(setBrands(brandData.uniqueBrands));
        dispatch(setBrandProductCounts(brandData.brandCounts));
      }
      const categoriesData = fetchCategoryData(brands.selectedBrands);
      if (categoriesData) {
        dispatch(setCategories(categoriesData));
      }
      
    };

    fetchAllData();
  }, [dispatch, brands.selectedBrands]);

  return (
    <div>
     
        <header>
          <Header />
        </header>
        <main>
          <Container />
        </main>
      
    </div>
  );
}

export default App;

// src/pages/AllProductsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import Filter from "../components/Filter";

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState({});

  useEffect(() => {
    let url = "http://localhost:3000/products?";
    if (filter.category) url += `category=${filter.category}&`;
    if (filter.minPrice) url += `minPrice=${filter.minPrice}&`;
    if (filter.maxPrice) url += `maxPrice=${filter.maxPrice}&`;

    axios
      .get(url)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error(error));
  }, [filter]);

  return (
    <div>
      <Filter onFilterChange={setFilter} />
      <ProductList products={products} />
    </div>
  );
};

export default AllProductsPage;

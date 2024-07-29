import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AllProductsPage from "./pages/AllProductsPage";
import ProductPage from "./pages/ProductPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllProductsPage />} />
        <Route path="/product/:id" element={<ProductPage />} />
      </Routes>
    </Router>
  );
}

export default App;

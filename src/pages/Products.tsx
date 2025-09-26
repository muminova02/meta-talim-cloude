import React from "react";
import { motion } from "framer-motion";
import Navigation from "../components/sections/Navigation";
import Products from "../components/sections/Products";
import Footer from "../components/sections/Footer";

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navigation />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Products />
        <Footer />
      </motion.div>
    </div>
  );
};

export default ProductsPage;

import React, { useState, useEffect, useMemo } from "react";
import Cards from "../components/Cards";
import Card from "../components/Card";
import Sidebar from "../components/Sidebar";
import styles from "./Products.module.css";

const Products = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceLimit, setPriceLimit] = useState(1000);

  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const json = await res.json();
        setData(json);
      } catch (err) {
        console.error("Loading error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredData = useMemo(() => {
    return data.filter((product) => {
      const isCategoryMatch =
        selectedCategories.length === 0 ||
        selectedCategories.includes(product.category);
      const isPriceMatch = product.price <= priceLimit;

      return isCategoryMatch && isPriceMatch;
    });
  }, [data, selectedCategories, priceLimit]);

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <p>Loading catalog...</p>
      </div>
    );
  }

  return (
    <div className={styles.pageLayout}>
      <button
        className={styles.mobileFilterBtn}
        onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
      >
        {isMobileFiltersOpen ? "Hide Filters" : "Show Filters"}
      </button>

      <div
        className={`${styles.sidebarWrapper} ${isMobileFiltersOpen ? styles.open : ""}`}
      >
        <Sidebar
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          priceLimit={priceLimit}
          setPriceLimit={setPriceLimit}
        />
      </div>

      <div className={styles.container}>
        <h1 className={styles.title}>All Products</h1>
        <p className={styles.subtitle}>
          Explore our latest tech and fashion arrivals.
        </p>

        {filteredData.length > 0 ? (
          <Cards>
            {filteredData.map((product) => (
              <Card key={product.id} item={product} />
            ))}
          </Cards>
        ) : (
          <div className={styles.noProducts}>
            <p>No products found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategories([]);
                setPriceLimit(1000);
              }}
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;

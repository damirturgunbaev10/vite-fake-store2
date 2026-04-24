import React from "react";
import styles from "./Sidebar.module.css";

const Sidebar = ({
  selectedCategories,
  setSelectedCategories,
  priceLimit,
  setPriceLimit,
}) => {
  const categories = [
    { id: "electronics", label: "Electronics" },
    { id: "jewelery", label: "Jewelery" },
    { id: "men's clothing", label: "Men's Clothing" },
    { id: "women's clothing", label: "Women's Clothing" },
  ];

  const handleCategoryChange = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId),
      );
    } else {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };

  return (
    <div className={styles.sidebar}>
      <h3 className={styles.sidebarTitle}>Categories</h3>
      <div className={styles.categoryList}>
        {categories.map((cat) => (
          <label key={cat.id} className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat.id)}
              onChange={() => handleCategoryChange(cat.id)}
              className={styles.checkbox}
            />
            {cat.label}
          </label>
        ))}
      </div>

      <div className={styles.divider}></div>

      <h3 className={styles.sidebarTitle}>Price Limit</h3>
      <div className={styles.priceFilter}>
        <input
          type="range"
          min="0"
          max="1000"
          step="10"
          value={priceLimit}
          onChange={(e) => setPriceLimit(Number(e.target.value))}
          className={styles.rangeInput}
        />
        <div className={styles.priceLabels}>
          <span>$0</span>
          <span className={styles.currentPrice}>${priceLimit}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

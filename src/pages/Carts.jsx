import React, { useState, useEffect } from "react";
import styles from "./Carts.module.css";

const Carts = () => {
  const [carts, setCarts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCarts = async () => {
      setIsLoading(true);

      try {
        const res = await fetch("https://fakestoreapi.com/carts");

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const json = await res.json();
        setCarts(json);
      } catch (err) {
        console.error("Loading error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <p>Loading carts...</p>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ maxWidth: "800px" }}>
      <h1 style={{ marginBottom: "24px" }}>Active Carts</h1>
      {carts.map((cart) => (
        <div key={cart.id} className={styles.cartRow}>
          <div>
            <div style={{ fontWeight: "600" }}>Order #{cart.id}</div>
            <div className={styles.date}>
              {new Date(cart.date).toLocaleDateString()}
            </div>
          </div>
          <div className={styles.badge}>{cart.products.length} Items</div>
        </div>
      ))}
    </div>
  );
};

export default Carts;

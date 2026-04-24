import React, { useState } from "react";
import { toast } from "react-toastify";
import styles from "./Card.module.css";

const Card = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!item) return null;

  const handleAddToCart = (e) => {
    e.stopPropagation();

    toast.success(`Added ${item.title.slice(0, 15)}... to cart!`);
  };

  return (
    <>
      <div className={styles.card} onClick={() => setIsModalOpen(true)}>
        <div className={styles.imageContainer}>
          <img src={item.image} alt={item.title} className={styles.image} />
        </div>

        <h3 className={styles.title}>{item.title.slice(0, 25)}...</h3>

        <div className={styles.cardFooter}>
          <div className={styles.price}>${item.price}</div>
          <button
            className={styles.addBtn}
            onClick={handleAddToCart}
            title="Add to cart"
          >
            +
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div
          className={styles.modalOverlay}
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeBtn}
              onClick={() => setIsModalOpen(false)}
            >
              &times;
            </button>

            <div className={styles.modalBody}>
              <div className={styles.modalImageWrapper}>
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.modalImage}
                />
              </div>

              <div className={styles.modalInfo}>
                <span className={styles.category}>{item.category}</span>
                <h2 className={styles.modalTitle}>{item.title}</h2>

                {item.rating && (
                  <div className={styles.rating}>
                    ⭐️ {item.rating.rate}{" "}
                    <span className={styles.reviews}>
                      ({item.rating.count} reviews)
                    </span>
                  </div>
                )}

                <div className={styles.scrollableDesc}>
                  <p className={styles.description}>{item.description}</p>
                </div>

                <div className={styles.modalFooter}>
                  <span className={styles.modalPrice}>${item.price}</span>
                  <button
                    className={styles.modalAddToCartBtn}
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;

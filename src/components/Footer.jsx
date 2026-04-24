import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.brand}>
          <h2 className={styles.logo}>
            Fake<span>Store</span>
          </h2>
          <p className={styles.desc}>
            Modern e-commerce experience with clean design and smooth shopping.
          </p>
        </div>

        <div className={styles.links}>
          <div>
            <h4>Shop</h4>
            <Link to="/products">All Products</Link>
            <Link to="/carts">Cart</Link>
          </div>

          <div>
            <h4>Company</h4>
            <Link to="/">Home</Link>
            <Link to="/users">Users</Link>
          </div>

          <div>
            <h4>Support</h4>
            <a href="#">Help Center</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} FakeStore. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

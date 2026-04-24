import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/products", label: "Products" },
  { to: "/users", label: "Users" },
  { to: "/carts", label: "Carts" },
  { to: "/profile", label: "Profile" },
];

const CartIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
    <line x1="3" y1="6" x2="21" y2="6" />
    <path d="M16 10a4 4 0 01-8 0" />
  </svg>
);

const Header = ({ cartCount = 0 }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <Link
            to="/"
            className={styles.logo}
            style={{ fontWeight: "bold", fontSize: "1.2rem" }}
          >
            Fake<span className={styles.logoAccent}>Store</span>
          </Link>

          <div className={styles.desktopLinks}>
            {NAV_LINKS.map(({ to, label }) => {
              const isActive = location.pathname === to;
              return (
                <Link
                  key={to}
                  to={to}
                  className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                >
                  {label}
                  {isActive && <span className={styles.activeDot} />}
                </Link>
              );
            })}
          </div>

          <div className={styles.right}>
            <Link to="/carts" className={styles.cartBtn} aria-label="Cart">
              <CartIcon />
              {cartCount > 0 && (
                <span className={styles.cartBadge}>
                  {cartCount > 99 ? "99+" : cartCount}
                </span>
              )}
            </Link>

            <Link to="/profile" className={styles.avatar} />

            <button
              className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ""}`}
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={`${styles.overlay} ${menuOpen ? styles.overlayVisible : ""}`}
        onClick={() => setMenuOpen(false)}
      />
      <div
        className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ""}`}
      >
        {NAV_LINKS.map(({ to, label }) => {
          const isActive = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`${styles.mobileLink} ${isActive ? styles.mobileLinkActive : ""}`}
            >
              {label}
              {isActive && <span className={styles.mobileActiveDot} />}
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default Header;

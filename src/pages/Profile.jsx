import styles from "./Profile.module.css";

const ORDERS = [
  { id: "#1024", item: "Leather Jacket", price: "$120", status: "Delivered" },
  { id: "#1025", item: "Smart Watch", price: "$89", status: "Shipped" },
  { id: "#1026", item: "Sneakers", price: "$64", status: "Processing" },
];

const Profile = () => {
  return (
    <div className={styles.profile}>
      <div className={styles.header}>
        <div className={styles.avatar} />
        <h2>John Doe</h2>
        <p className={styles.email}>johndoe@email.com</p>

        <span className={styles.badge}>Premium Member</span>
      </div>

      <div className={styles.stats}>
        <div>
          <span>Orders</span>
          <b>12</b>
        </div>
        <div>
          <span>Spent</span>
          <b>$1,240</b>
        </div>
        <div>
          <span>Wishlist</span>
          <b>7</b>
        </div>
      </div>

      <div className={styles.section}>
        <h3>Recent Orders</h3>

        <div className={styles.orders}>
          {ORDERS.map((o) => (
            <div key={o.id} className={styles.orderCard}>
              <div>
                <p className={styles.orderId}>{o.id}</p>
                <p className={styles.orderItem}>{o.item}</p>
              </div>

              <div className={styles.orderRight}>
                <span className={styles.price}>{o.price}</span>
                <span className={styles.status}>{o.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.section}>
        <h3>Settings</h3>

        <div className={styles.settings}>
          <button>Account Settings</button>
          <button>Shipping Address</button>
          <button>Payment Methods</button>
        </div>
      </div>

      <button className={styles.logout}>Log out</button>
    </div>
  );
};

export default Profile;

import React, { useState, useEffect } from "react";
import Cards from "../components/Cards";
import styles from "./Users.module.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch("https://fakestoreapi.com/users");

        if (!res.ok) {
          throw new Error(`HTTP error!: ${res.status}`);
        }

        const json = await res.json();
        setUsers(json);
      } catch (err) {
        console.log("Loading erroe".err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <p>Loading users...</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 style={{ marginBottom: "24px" }}>Platform Users</h1>
      <Cards>
        {users.map((user) => (
          <div key={user.id} className={styles.userCard}>
            <div className={styles.avatar}>👤</div>
            <div className={styles.userName}>
              {user.name.firstname} {user.name.lastname}
            </div>
            <p style={{ color: "#86868b", fontSize: "14px" }}>{user.email}</p>
          </div>
        ))}
      </Cards>
    </div>
  );
};

export default Users;

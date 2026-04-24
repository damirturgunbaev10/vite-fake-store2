import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const Dashboard = () => {
  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <Header />
      <div style={{ display: "flex", flex: 1 }}>
        <main style={{ flex: 1, padding: "32px", backgroundColor: "#f5f5f7" }}>
          <Outlet />
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;

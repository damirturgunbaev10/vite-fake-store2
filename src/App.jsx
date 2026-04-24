import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Users from "./pages/Users";
import Carts from "./pages/Carts";
import Profile from "./pages/Profile";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Dashboard />}>
            <Route index element={<Home />} />

            <Route path="/products" element={<Products />} />
            <Route path="/users" element={<Users />} />
            <Route path="/carts" element={<Carts />} />

            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer position="bottom-right" autoClose={2000} theme="light" />
    </div>
  );
};

export default App;

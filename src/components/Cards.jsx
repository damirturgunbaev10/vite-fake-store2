import React from "react";

const Cards = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
        gap: "24px",
        padding: "20px",
      }}
    >
      {children}
    </div>
  );
};

export default Cards;

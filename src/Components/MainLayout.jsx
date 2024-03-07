import React from "react";
import Headers from "../headers/header";

const MainLayout = ({ children }) => {
  return (
    <div className="">
      <Headers />
      {children}
    </div>
  );
};

export default MainLayout;
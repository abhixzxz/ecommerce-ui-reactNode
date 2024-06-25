import React from "react";
import { Outlet } from "react-router-dom";

const FullWidthLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default FullWidthLayout;

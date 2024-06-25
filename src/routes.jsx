import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import AboutPage from "./pages/about/about.jsx";
import LoginPage from "./authentication/login/login.jsx";
import RegisterPage from "./authentication/register/register.jsx";
import HeaderLayout from "./layouts/headerLayout/headerLayout.jsx";
import FullWidthLayout from "./layouts/fullwidthLayout/fullwidthLayout.jsx";
import PrivateRoute from "./authentication/PrivateRoute.jsx";
import Profile from "./user/profile/profile.jsx";

// Adjust the import path as needed

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<PrivateRoute element={Dashboard} />} />
          <Route path="/about" element={<PrivateRoute element={AboutPage} />} />
          <Route path="/profile" element={<PrivateRoute element={Profile} />} />
        </Route>

        <Route element={<FullWidthLayout />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

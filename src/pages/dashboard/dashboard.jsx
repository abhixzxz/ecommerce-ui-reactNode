// pages/dashboard/dashboard.jsx

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice"; // Adjust path as per your project structure
import ImgBg1 from "../../assets/images/curly-dark-skinned-woman-uses-credit-card-modern-mobile-phone.jpg";

function Dashboard() {
  const user = useSelector((state) => state.auth?.user);
  const dispatch = useDispatch();
  console.log("userData=>", user);
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <>
        <div className="w-screen h-screen overflow-hidden relative before:block before:absolute before:bg-black before:h-full before:w-full before:top-0 before:left-0 before:z-10 before:opacity-30">
          <img
            src={ImgBg1}
            className="absolute top-0 left-0 min-h-full object-cover"
            alt=""
          />
          <div className="relative z-20 max-w-screen-lg mx-auto grid grid-cols-12 h-full items-center">
            <div className="col-span-6">
              <span className="uppercase text-white text-xs font-bold mb-2 block">
                WE ARE EXPERTS
              </span>
              <h1 className="text-white font-extrabold text-5xl mb-8 uppercase">
                Welcome to Hyper Cartz! Enjoy seamless shopping. Discover
                products, fill your cart, and manage orders effortlessly. Happy
                shopping!
              </h1>
              <p className="text-stone-100 text-base">
                Discover great products, fill your cart easily, and manage
                orders effortlessly. Enjoy a seamless and delightful shopping
                experience with us...
              </p>
              <button className="mt-8 text-white uppercase py-4 text-base font-light px-10 border border-white hover:bg-yellow-800 hover:bg-opacity-30">
                Get started
              </button>
            </div>
          </div>
        </div>
      </>
    </div>
  );
}

export default Dashboard;

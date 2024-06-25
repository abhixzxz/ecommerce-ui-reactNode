import React, { useState } from "react";
import coverImage from "../../assets/images/5708180.jpg";
import { useSelector } from "react-redux";
const Profile = () => {
  const user = useSelector((state) => state.auth?.user);
  console.log("userData=>", user);

  return (
    <div className="bg-white shadow-xl pb-3">
      <div className="w-full ">
        <img
          src={coverImage}
          className="w-full h-[250px] object-cover border-[2px] border-white"
          alt="Profile Background"
        />
      </div>
      <div className="flex flex-col items-center -mt-20">
        <img
          src={user?.user_image}
          className="w-40 h-40 object-cover bg-red-300 border-[10px] border-white rounded-full"
          alt="Profile"
        />
        <div className="flex items-center space-x-2 mt-2">
          <p className="text-2xl">{user?.name}</p>
          <span className="bg-blue-500 rounded-full p-1" title="Verified">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="text-gray-100 h-2.5 w-2.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="4"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </span>
        </div>
        <p className="text-gray-700">Ecom,Customer</p>
        <p className="text-gray-700">{user?.gender}</p>
        <p className="text-sm text-gray-500">New York, USA</p>
        <p className="text-sm text-gray-500">{user?.phone_number}</p>
      </div>
      <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
        <div className="flex items-center space-x-4 mt-2"></div>
      </div>
    </div>
  );
};

export default Profile;

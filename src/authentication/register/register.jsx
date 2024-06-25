import React from "react";
import RegisterVectorImg from "../../assets/images/registerImg.jpg";
import { Link } from "react-router-dom";

function RegisterPage() {
  return (
    <div>
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form className="space-y-4">
                <div className="mb-8">
                  <h3 className="text-gray-800 text-3xl font-extrabold uppercase mx-auto flex items-center justify-center">
                    Register
                  </h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed uppercase">
                    Create your account and join us.
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Name
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="name"
                          type="text"
                          required
                          className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                          placeholder="Enter your name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Email
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="email"
                          type="email"
                          required
                          className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                          placeholder="Enter your email"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Password
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="password"
                          type="password"
                          required
                          className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                          placeholder="Enter your password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Gender
                      </label>
                      <div className="relative flex items-center">
                        <select
                          name="gender"
                          required
                          className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                        >
                          <option value="" disabled selected>
                            Select your gender
                          </option>
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Date of Birth
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="dob"
                          type="date"
                          required
                          className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-gray-800 text-sm mb-2 block">
                        Phone Number
                      </label>
                      <div className="relative flex items-center">
                        <input
                          name="phone_number"
                          type="tel"
                          required
                          className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                          placeholder="Enter your phone number"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <label className="text-gray-800 text-sm mb-2 block">
                    Profile Image URL
                  </label>
                  <div className="relative flex items-center w-full">
                    <input
                      name="user_image"
                      type="url"
                      className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                      placeholder="Enter image URL (optional)"
                    />
                  </div>
                </div>

                <div className="!mt-8">
                  <button
                    type="submit"
                    className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
                  >
                    Register
                  </button>
                </div>

                <p className="text-sm !mt-8 text-center text-gray-800">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-yellow-700 font-semibold hover:underline ml-1 whitespace-nowrap"
                  >
                    Sign in here
                  </Link>
                </p>
              </form>
            </div>
            <div className="lg:h-[600px] w-full md:h-[300px] max-md:mt-8 left-0 float-right mr-auto">
              <img
                src={RegisterVectorImg}
                className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
                alt="Registration Experience"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

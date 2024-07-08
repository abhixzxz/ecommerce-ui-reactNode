import { useNavigate } from "react-router-dom";
// src/authentication/login/LoginPage.jsx
import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { customPost } from "../../api/api";
import { setUser } from "../../features/auth/authSlice";
import Swal from "sweetalert2";
import LoginVectorImg from "../../assets/images/login.jpg";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const user = await customPost("/users/login", values);
        dispatch(setUser(user?.data));

        console.log("LOGIN RESPONSE===>", user);
        setSubmitting(false);
        navigate("/");
      } catch (error) {
        // toast.error(error.message, {
        //   position: "top-right",
        // });
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="font-sans-serif">
      <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
        <div className="grid md:grid-cols-2 items-center gap-4 max-w-6xl w-full">
          <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
            <form onSubmit={formik.handleSubmit} className="space-y-4">
              <div className="mb-8">
                <h3 className="text-3xl font-extrabold uppercase flex justify-center text-yellow-600">
                  Sign in
                </h3>
                <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                  Sign in to your account and explore a world of possibilities.
                </p>
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                    placeholder="Enter Email"
                  />
                </div>
                {formik.touched.email && formik.errors.email ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.email}
                  </div>
                ) : null}
              </div>

              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                    required
                    className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                    placeholder="Enter password"
                  />
                </div>
                {formik.touched.password && formik.errors.password ? (
                  <div className="text-red-500 text-sm">
                    {formik.errors.password}
                  </div>
                ) : null}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 shrink-0 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-3 block text-sm text-gray-800"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-yellow-700 hover:underline font-semibold"
                  >
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={formik.isSubmitting}
                  className="w-full shadow-xl py-3 px-4 text-sm tracking-wide rounded-lg text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none"
                >
                  {formik.isSubmitting ? "Logging in..." : "Log in"}
                </button>
              </div>

              <p className="text-sm !mt-8 text-center text-gray-800">
                Don't have an account{" "}
                <Link
                  to="/register"
                  className="text-yellow-700 font-semibold hover:underline ml-1 whitespace-nowrap"
                >
                  Register here
                </Link>
              </p>
            </form>
          </div>

          <div className="lg:h-[600px] w-full md:h-[300px] max-md:mt-8 left-0 float-right mr-auto">
            <img
              src={LoginVectorImg}
              className="w-full h-full max-md:w-4/5 mx-auto block object-cover"
              alt="Dining Experience"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

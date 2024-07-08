import React from "react";
import RegisterVectorImg from "../../assets/images/registerImg.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useFormik, FieldArray, FormikProvider, Field } from "formik";
import Swal from "sweetalert2";
import { customPost, customPostUpload } from "../../api/api";
import { setUser } from "../../features/auth/authSlice";
import { FaUpload } from "react-icons/fa";
import Loader from "../../components/common/loader";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
      dob: "",
      phone_number: "",
      user_image: null,
      addresses: [
        {
          street: "",
          city: "",
          state: "",
          country: "",
          postal_code: "",
        },
      ],
    },
    onSubmit: async (values, { setSubmitting }) => {
      console.log("values:", values);
      if (!values.user_image) {
        toast.error("Please select an image to upload.", {
          position: "top-right",
        });
        setSubmitting(false);
        return;
      }

      const formData = new FormData();
      formData.append("user_image", values.user_image);
      formData.append("name", values.name);
      formData.append("email", values.email);
      formData.append("password", values.password);
      formData.append("gender", values.gender);
      formData.append("dob", values.dob);
      formData.append("phone_number", values.phone_number);
      formData.append("role_id", 1);
      formData.append("addresses", JSON.stringify(values.addresses));

      for (let [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      try {
        const user = await customPostUpload("/users/create-user", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("User created:", user);
        dispatch(setUser(user?.data));
        setSubmitting(false);
        navigate("/");
      } catch (error) {
        console.error("Error during registration:", error);
        setSubmitting(false);
      }
    },
  });

  return (
    <FormikProvider value={formik}>
      {formik.isSubmitting && <Loader />}
      <div className="font-[sans-serif]">
        <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
          <div className="grid md:grid-cols-2 items-center gap-2 max-w-6xl w-full">
            <div className="border border-gray-300 rounded-lg p-6  shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
              <form onSubmit={formik.handleSubmit} className="space-y-4">
                <div className="mb-8">
                  <h3 className=" text-3xl font-extrabold uppercase mx-auto flex items-center justify-center text-yellow-700">
                    Register
                  </h3>
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed uppercase">
                    Create your account and join us Hyper Cartz
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                          onChange={formik.handleChange}
                          value={formik.values.name}
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
                          onChange={formik.handleChange}
                          value={formik.values.email}
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
                          onChange={formik.handleChange}
                          value={formik.values.password}
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
                          onChange={formik.handleChange}
                          value={formik.values.gender}
                        >
                          <option value="" disabled>
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
                          onChange={formik.handleChange}
                          value={formik.values.dob}
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
                          onChange={formik.handleChange}
                          value={formik.values.phone_number}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-gray-800 text-sm mb-2 block">
                    Profile Image
                  </label>
                  <div className="relative">
                    <input
                      name="user_image"
                      type="file"
                      className="hidden"
                      id="user_image"
                      onChange={(event) =>
                        formik.setFieldValue(
                          "user_image",
                          event.currentTarget.files[0]
                        )
                      }
                    />
                    <label
                      htmlFor="user_image"
                      className="cursor-pointer w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 hover:bg-gray-100 focus:bg-gray-100 outline-none"
                    >
                      <span className="ml-3">
                        {formik?.values?.user_image?.name ? (
                          <span className="text-green-500">
                            {" "}
                            <div className="flex gap-2 items-center">
                              <FaUpload />
                              <span>{`Uploaded  -${formik?.values?.user_image?.name}`}</span>
                            </div>
                          </span>
                        ) : (
                          <span>Upload Image</span>
                        )}
                      </span>
                    </label>

                    {/* {formik.values.user_image && (
                      <p className="text-sm text-gray-600 mt-2">
                        {formik.values.user_image.name}
                      </p>
                    )} */}
                  </div>
                </div>

                <FieldArray name="addresses">
                  {({ push, remove }) => (
                    <div>
                      {formik.values.addresses.map((address, index) => (
                        <div
                          key={index}
                          className="border border-gray-300 p-4 mb-4 rounded-lg"
                        >
                          <h4 className="text-gray-800 text-lg font-bold mb-2">
                            Address {index + 1}
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-4">
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                  Street
                                </label>
                                <Field
                                  name={`addresses[${index}].street`}
                                  type="text"
                                  required
                                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                                  placeholder="Enter street"
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                  City
                                </label>
                                <Field
                                  name={`addresses[${index}].city`}
                                  type="text"
                                  required
                                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                                  placeholder="Enter city"
                                />
                              </div>
                            </div>
                            <div className="space-y-4">
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                  State
                                </label>
                                <Field
                                  name={`addresses[${index}].state`}
                                  type="text"
                                  required
                                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                                  placeholder="Enter state"
                                />
                              </div>
                              <div>
                                <label className="text-gray-800 text-sm mb-2 block">
                                  Country
                                </label>
                                <Field
                                  name={`addresses[${index}].country`}
                                  type="text"
                                  required
                                  className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                                  placeholder="Enter country"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="w-full">
                            <label className="text-gray-800 text-sm mb-2 block">
                              Postal Code
                            </label>
                            <Field
                              name={`addresses[${index}].postal_code`}
                              type="text"
                              required
                              className="w-full text-sm text-gray-800 border border-gray-300 px-4 py-3 rounded-lg outline-yellow-600"
                              placeholder="Enter postal code"
                            />
                          </div>
                          <div className="flex justify-end mt-4">
                            {index > 0 && (
                              <button
                                type="button"
                                className="text-red-600 text-sm font-bold"
                                onClick={() => remove(index)}
                              >
                                Remove Address
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                      <button
                        type="button"
                        className="bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
                        onClick={() =>
                          push({
                            street: "",
                            city: "",
                            state: "",
                            country: "",
                            postal_code: "",
                          })
                        }
                      >
                        Add Address
                      </button>
                    </div>
                  )}
                </FieldArray>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-yellow-500 hover:bg-yellow-700 text-white px-4 py-2 rounded-lg text-sm font-bold"
                    disabled={formik.isSubmitting}
                  >
                    Register
                  </button>
                </div>

                <p className="text-gray-500 text-sm mt-4">
                  Already have an account?{" "}
                  <Link to="/login" className="text-yellow-700 font-bold">
                    Login here
                  </Link>
                </p>
              </form>
            </div>
            <div className="hidden md:block">
              <img
                src={RegisterVectorImg}
                alt="Registration"
                className="max-w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </FormikProvider>
  );
}

export default RegisterPage;

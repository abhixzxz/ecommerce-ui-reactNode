import React, { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams } from "react-router-dom";
import { customGet, customPost } from "../../../../api/api";
import { FaRupeeSign } from "react-icons/fa";
import { useSelector } from "react-redux";
import Loader from "../../../../components/common/loader";

const ProductSection = () => {
  const [mainImage, setMainImage] = useState("");
  const [selectedSubscription, setSelectedSubscription] = useState("4 Months");
  const { productId } = useParams();
  const userId = useSelector((state) => state.auth?.user?.id);
  const queryClient = useQueryClient();

  const mutation = useMutation(
    (newData) => customPost("/cart/createCart", newData, false),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllCartItems");
      },
    }
  );

  const handleAddToCart = () => {
    const cartData = {
      user_id: userId,
      product_id: productId,
      quantity: 1,
    };
    mutation.mutate(cartData);
  };

  const {
    data: getAllProductsById,
    error,
    isLoading,
    isError,
  } = useQuery("getAllProductsByIdHome", () =>
    customGet(`/products/getProductById/${productId}`)
  );

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (!mainImage && getAllProductsById?.data?.image_url?.length > 0) {
    setMainImage(getAllProductsById.data.image_url[0]);
  }

  console.log("getAllProductsById=>", getAllProductsById?.data?.image_url);

  return (
    <section className="py-12 sm:py-16">
      {isLoading && <Loader />}

      <div className="container mx-auto px-4">
        <div className="mt-8 grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <div className="lg:col-span-3 lg:row-end-1">
            <div className="flex flex-col lg:flex-row lg:items-start">
              <div className="lg:order-2 lg:ml-5">
                <div className="max-w-xl overflow-hidden rounded-lg">
                  <img
                    className="h-full w-full max-w-full object-cover"
                    src={mainImage}
                    alt="Selected product"
                  />
                </div>
              </div>
              <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                <div className="flex flex-row items-start lg:flex-col lg:space-y-3">
                  {getAllProductsById.data.image_url.map((image, index) => (
                    <button
                      key={index}
                      type="button"
                      className={`flex w-20 h-20 overflow-hidden rounded-lg border-2 text-center mb-3 ${
                        mainImage === image
                          ? "border-yellow-500"
                          : "border-white"
                      }`}
                      onClick={() => setMainImage(image)}
                    >
                      <img
                        className="h-full w-full object-cover"
                        src={image}
                        alt={`Product thumbnail ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
            <h1 className="text-2xl font-bold text-gray-900 uppercase sm:text-3xl">
              {getAllProductsById?.data?.name}
            </h1>

            <div className="mt-5 flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="block h-4 w-4 align-middle text-yellow-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <div className="flex items-center">
                <p className="ml-2 text-sm font-medium text-gray-500">
                  1,209 Reviews
                </p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">
              {getAllProductsById?.data?.description}
            </p>
            <h1
              className={`font-bold uppercase mt-2 ${
                getAllProductsById?.data?.stock_level < 20
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              Stock available: {getAllProductsById?.data?.stock_level}
            </h1>

            <h2 className="mt-8 text-base text-yellow-800">Choose Emi</h2>
            <div className="mt-3 flex select-none flex-wrap items-center gap-1">
              {["4 Months", "8 Months", "12 Months"].map((subscription) => (
                <label
                  key={subscription}
                  className="flex flex-col items-center"
                >
                  <input
                    type="radio"
                    name="subscription"
                    value={subscription}
                    className="peer sr-only"
                    checked={selectedSubscription === subscription}
                    onChange={() => setSelectedSubscription(subscription)}
                  />
                  <p
                    className={`peer-checked:bg-yellow-500 peer-checked:text-white rounded-lg border border-black px-6 py-2 font-bold ${
                      selectedSubscription === subscription
                        ? "bg-yellow-500 text-white"
                        : "bg-white text-black"
                    }`}
                  >
                    {subscription}
                  </p>
                  <span className="mt-1 block text-center text-xs">
                    {subscription === "4 Months"
                      ? "1080/mo"
                      : subscription === "8 Months"
                      ? "2060/mo"
                      : "4040/mo"}
                  </span>
                </label>
              ))}
            </div>

            <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
              <div className="flex items-center text-yellow-800">
                <FaRupeeSign className="inline text-3xl" />
                <h1 className="text-3xl font-bold">
                  {getAllProductsById?.data?.price}
                </h1>
              </div>

              <button
                onClick={handleAddToCart}
                type="button"
                className="inline-flex items-center justify-center rounded-md bg-yellow-500 text-white font-bold px-12 py-3 "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="shrink-0 mr-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;

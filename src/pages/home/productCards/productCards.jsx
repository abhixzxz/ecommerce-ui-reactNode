import React, { useState } from "react";
import { FaRupeeSign } from "react-icons/fa";
import { MdOutlineShoppingCartCheckout } from "react-icons/md";
import { FaCartShopping } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import { customPost } from "../../../api/api";
import { useSelector } from "react-redux";

const ProductCard = ({ product }) => {
  const {
    name,
    price,
    description,
    image_url: imageUrl,
    stock_level: stockLevel,
    product_id: productId,
  } = product;

  const [isExpanded, setIsExpanded] = useState(false);
  const userId = useSelector((state) => state.auth?.user?.id);
  const queryClient = useQueryClient();

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

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

  const navigate = useNavigate();
  return (
    <div className="relative m-10 flex w-full max-w-xs flex-col overflow-hidden rounded-lg border border-gray-100 bg-white shadow-md">
      <div
        onClick={() => navigate(`/products-details/${name}/${productId}`)}
        className="relative mx-3 mt-3 flex  h-60 overflow-hidden rounded-xl"
      >
        <img
          className="object-cover bg-red-500 mx-auto cursor-pointer"
          src={imageUrl[0]}
          alt={name}
        />
        <span className="absolute top-0 left-0 m-1 rounded-full bg-gray-300 px-2 text-center text-sm font-medium text-black">
          {stockLevel > 0 ? "In Stock" : "Out of Stock"}
        </span>
      </div>
      <div className="mt-4 px-5 pb-5 uppercase">
        <a href="#">
          <h5 className="text-[15px] font-bold tracking-tight text-yellow-900">
            {name}
          </h5>
        </a>
        <div className="text-sm mt-1 text-yellow-800">
          <p className={isExpanded ? "" : "line-clamp-3"}>{description}</p>
        </div>
        <div className="mt-2 mb-5 flex items-center justify-between">
          <p>
            <span className="text-1xl font-bold text-yellow-900 flex items-center justify-center">
              <FaRupeeSign className="inline" />
              {price}
            </span>
          </p>
        </div>
        <button className="flex w-full items-center font-bold uppercase justify-center rounded-md bg-yellow-400 px-5 py-2.5 text-center text-sm  text-yellow-800 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-blue-300 mt-2">
          <MdOutlineShoppingCartCheckout className="mr-2 text-[22px] font-bold uppercase" />
          Buy Now
        </button>
        <button
          onClick={handleAddToCart}
          className="flex mt-2 w-full items-center font-bold uppercase justify-center rounded-md bg-yellow-400 px-5 py-2.5 text-center text-sm  text-yellow-800 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          <FaCartShopping className="mr-2 text-[20px] font-bold uppercase" />
          Add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

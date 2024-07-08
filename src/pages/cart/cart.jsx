import { useQueryClient } from "react-query";
import React, { useMemo } from "react";
import { FaRupeeSign, FaPlus } from "react-icons/fa";
import { TiMinus } from "react-icons/ti";
import { useMutation, useQuery } from "react-query";
import { customDelete, customGet, customPut } from "../../api/api";
import { useSelector } from "react-redux";
import Loader from "../../components/common/loader";

function ShoppingCart() {
  const userId = useSelector((state) => state.auth?.user?.id);
  const queryClient = useQueryClient();

  const {
    data: getAllCartitems,
    error,
    isLoading,
    isError,
  } = useQuery("getAllCartItems", () => customGet(`/cart/getCart/${userId}`));

  const dataCarts = getAllCartitems?.data;

  const deleteMutation = useMutation(
    (cartId) => customDelete(`/cart/delete/${cartId}`),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllCartItems");
      },
    }
  );

  const updateMutation = useMutation(
    ({ cartId, quantity }) =>
      customPut(`/cart/updateCart`, { cart_id: cartId, quantity }, false),
    {
      onSuccess: () => {
        queryClient.invalidateQueries("getAllCartItems");
      },
    }
  );

  const handleDelete = (cartId) => {
    deleteMutation.mutate(cartId);
  };

  const handleQuantityChange = (cartId, quantity) => {
    console.log(cartId, quantity);
    updateMutation.mutate({ cartId, quantity });
  };

  const handleIncrement = (cartId, currentQuantity) => {
    if (currentQuantity < 10) {
      handleQuantityChange(cartId, currentQuantity + 1);
    }
  };

  const handleDecrement = (cartId, currentQuantity) => {
    if (currentQuantity > 1) {
      handleQuantityChange(cartId, currentQuantity - 1);
    }
  };

  // Calculate the total price
  const totalPrice = useMemo(() => {
    return dataCarts?.reduce((acc, item) => {
      return acc + item.quantity * item.Product.price;
    }, 0);
  }, [dataCarts]);

  return (
    <>
      {isLoading && <Loader />}

      <div className="flex flex-col md:flex-row w-full px-2 md:px-4 lg:px-1 gap-2 ">
        <div className="w-full md:w-9/12 mb-4 md:mb-0 ml-2">
          <div className="w-full">
            {dataCarts?.map((item, index) => (
              <div
                key={index}
                className="md:flex items-center py-2 border-t border-b border-gray-200"
              >
                <div className="w-full md:w-1/4">
                  <img
                    src={item?.product_image}
                    alt={item?.Product?.name}
                    className="w-full h-32 md:w-[200px] md:h-[200px] rounded object-contain"
                  />
                </div>
                <div className="w-full mt-2 md:mt-0">
                  <p className="text-sm md:text-xs leading-3 text-gray-800">
                    {item?.Product?.name}
                  </p>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between w-full pt-1">
                    <p className="text-lg md:text-base font-black leading-none uppercase text-yellow-800">
                      {item?.Product?.name}
                    </p>
                    <select
                      className="py-2 px-1 border border-yellow-200 mr-6 focus:outline-none"
                      value={item.quantity}
                      onChange={(e) =>
                        handleQuantityChange(
                          item.cart_id,
                          Number(e.target.value)
                        )
                      }
                    >
                      {[...Array(10).keys()].map((num) => (
                        <option key={num + 1} value={num + 1}>
                          {num + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <div
                      className="p-2 h-7 w-7 bg-gray-200 flex items-center justify-center text-[15px] border-[1px] cursor-pointer border-gray-400 rounded-full"
                      onClick={() =>
                        handleDecrement(item.cart_id, item.quantity)
                      }
                    >
                      <TiMinus />
                    </div>
                    <div className="p-2 h-7 w-14 bg-gray-200 flex items-center justify-center text-[15px] border-[1px] text-center border-gray-400">
                      {item.quantity}
                    </div>
                    <div
                      className="p-2 h-7 w-7 bg-gray-200 flex items-center justify-center text-[15px] border-[1px] cursor-pointer border-gray-400 rounded-full"
                      onClick={() =>
                        handleIncrement(item.cart_id, item.quantity)
                      }
                    >
                      <FaPlus />
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-5 pr-6">
                    <div className="flex items-center">
                      <p className="text-sm md:text-xs leading-3 underline text-yellow-800 cursor-pointer">
                        Add to favorites
                      </p>
                      <p
                        onClick={() => handleDelete(item?.cart_id)}
                        className="text-sm md:text-xs leading-3 underline text-red-500 pl-5 cursor-pointer"
                      >
                        Remove
                      </p>
                    </div>
                    <p className="text-lg md:text-base font-black leading-none flex items-center text-yellow-800 mt-2 md:mt-0">
                      <FaRupeeSign className="inline" />
                      {item?.Product?.price}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px",
          }}
          className="w-full md:w-3/12 rounded p-1 md:ml-0 text-yellow-800 flex flex-col justify-between h-[50vh]"
        >
          <h1 className="font-bold uppercase text-[17px] text-center mb-3">
            Price Details of{" "}
            <span>
              {dataCarts?.length < 1
                ? `${dataCarts?.length} item`
                : `${dataCarts?.length} items`}
            </span>
          </h1>
          <div>
            <h2 className="text-[13px] font-semibold mb-4">Payment Method</h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-700">
                Subtotal
              </label>
              <p className="text-[12px] font-semibold">
                <FaRupeeSign className="inline" /> {totalPrice}
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-700">
                GST
              </label>
              <p className="text-[12px] font-semibold">
                <FaRupeeSign className="inline" /> 0.00
              </p>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-yellow-700">
                Total
              </label>
              <p className="text-[12px] font-semibold">
                <FaRupeeSign className="inline" /> {totalPrice}
              </p>
            </div>
          </div>
          <button className="w-full text-[14px] py-2 px-4 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600 mt-auto">
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
}

export default ShoppingCart;

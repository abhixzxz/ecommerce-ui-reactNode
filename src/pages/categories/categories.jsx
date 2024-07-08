import React from "react";
import { customGet } from "../../api/api";
import { useQuery } from "react-query";

function Categories() {
  const {
    data: categories,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: () => customGet("/products/getAllCategory"),
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchInterval: false,
    onSuccess: (data) => {},
  });
  console.log(categories);

  return (
    <div>
      <div className="">
        <div className="flex items-center p-2 gap-3  justify-center mt-2">
          {categories?.slice(0, 9).map((item, index) => (
            <div
              key={item?.category_id}
              className="flex-col item?s-center justify-center"
            >
              <img
                className="h-[150px] rounded-full w-[150px] cursor-pointer object-cover border-[4px] border-yellow-500 "
                src={item?.category_image}
                alt={item?.category_name || "imgcategory"}
              />
              <p className="mx-auto text-center capitalize cursor-pointer">
                {item?.category_name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Categories;

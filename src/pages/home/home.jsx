import React, { useState } from "react";
import { useQuery } from "react-query";
import { customGet } from "../../api/api";
import ProductCard from "./productCards/productCards";
import Loader from "../../components/common/loader";
import SearchBar from "./searchPrducts/searchProducts";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limit = 5;

  const {
    data: productsData,
    error,
    isLoading,
    isError,
    refetch,
  } = useQuery(
    ["getAllProductsHome", searchQuery, page],
    () =>
      customGet(
        `/products/search-products?query=${searchQuery}&page=${page}&limit=${limit}`
      ),
    {
      keepPreviousData: true,
    }
  );

  const handleSearch = (query) => {
    setSearchQuery(query);
    setPage(1);
    refetch();
  };

  const handleNextPage = () => {
    if (page < productsData.pagination.totalPages) {
      setPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      <div className="flex flex-wrap justify-start">
        {isLoading && <Loader />}
        {productsData?.data?.map((product) => (
          <ProductCard key={product.product_id} product={product} />
        ))}
      </div>
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          disabled={page === 1}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span>
          Page {page} of {productsData?.pagination?.totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={page === productsData?.pagination?.totalPages}
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </>
  );
}

export default HomePage;

import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { listProduct } from "../services/api";

export default function Orders() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);

  const fetchData = async (value) => {
    try {
      const response = await listProduct();
      const products = response.data;
      if (Array.isArray(products)) {
        const filteredResults = products.filter((product) => {
          return (
            value &&
            product &&
            product.name &&
            product.name.toLowerCase().includes(value.toLowerCase())
          );
        });
        setResults(filteredResults);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };

  return (
    <div className="flex w-full justify-center flex-col items-center my-5">
      <div className="relative">
        <input
          className="py-2 px-3 w-48 lg:w-[27rem] text-md text-gray-900 border border-gray-300 rounded-full pl-10 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-offset-1 focus:ring focus:ring-violet-500"
          type="text"
          placeholder="Search Products"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <BiSearch className="absolute left-3 top-2.5 text-2xl text-gray-500" />
      </div>

      {results.length > 0 ? (
        <ul className="py-2 px-7 mt-3 w-48 lg:w-[27rem] text-md max-h-72 overflow-y-auto text-gray-900 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white custom-scrollbar">
          {results.map((result) => (
            <li
              key={result.id}
              className="p-3 flex justify-between items-center border-none rounded-lg dark:text-gray-400 hover:bg-gray-500 transition-colors"
            >
              <span> {result.name}</span>
              <button className="text-white  bg-violet-500 hover:bg-violet-800 px-3 py-1 rounded-md">
                Add
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-3">No results found</p>
      )}
    </div>
  );
}

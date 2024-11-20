import { BiSearch } from "react-icons/bi";
import { useState } from "react";
import { listProduct } from "../services/api";
import Tooltip from "../components/tools/Tooltip";

export default function Orders() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);

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

  const handleAddProduct = (product) => {
    const existingProduct = selectedProducts.find((p) => p.id === product.id);
    if (existingProduct) {
      setSelectedProducts(
        selectedProducts.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        )
      );
    } else {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = (id) => {
    setSelectedProducts(
      selectedProducts.map((p) =>
        p.id === id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  };

  const handleDecreaseQuantity = (id) => {
    setSelectedProducts(
      selectedProducts
        .map((p) => (p.id === id ? { ...p, quantity: p.quantity - 1 } : p))
        .filter((p) => p.quantity > 0)
    );
  };

  const calculateTotalPerProduct = (price, quantity) => {
    return price * quantity;
  };

  const calculateTotalPrice = () => {
    return selectedProducts.reduce(
      (total, product) => total + product.price * product.quantity,
      0
    );
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
        <ul className="py-2 px-3 mt-3 w-48 lg:w-[27rem] text-md max-h-72 overflow-y-auto text-gray-900 border border-gray-300 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white custom-scrollbar">
          {results.map((result) => (
            <li
              key={result.id}
              className="p-3 flex justify-between cursor-pointer items-center border-none rounded-lg dark:text-gray-400 dark:hover:bg-gray-600 transition-colors hover:bg-gray-100"
            >
              <span> {result.name}</span>
              <button
                className="text-white bg-violet-500 hover:bg-violet-800 px-3 py-1 rounded-md"
                onClick={() => handleAddProduct(result)}
              >
                Add
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center text-gray-500 mt-3"></p>
      )}

      {selectedProducts.length > 0 && (
        <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 shadow-md m-5 mb-2 w-full">
          <table className="w-full border-collapse bg-white text-left text-gray-700">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                <th className="px-6  py-4 font-bold text-gray-700 dark:text-gray-400">
                  Product Name
                </th>
                <th className="px-6  py-4 font-bold text-gray-700 dark:text-gray-400">
                  Price
                </th>
                <th className="px-6  py-4 font-bold text-gray-700 dark:text-gray-400">
                  Quantity
                </th>
                <th className="px-6  py-4 font-bold text-gray-700 dark:text-gray-400">
                  Total Price
                </th>
                <th className="px-6  py-4 font-bold text-gray-700 dark:text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t border-gray-100 dark:border-gray-600">
              {selectedProducts.map((product) => (
                <tr
                  key={product.id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-650 dark:text-white"
                >
                  <td className="px-6 py-4 dark:text-gray-400">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 dark:text-gray-400">
                    {product.price.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 dark:text-gray-400">
                    {product.quantity}
                  </td>
                  <td className="px-6 py-4 dark:text-gray-400">
                    {calculateTotalPerProduct(
                      product.price,
                      product.quantity
                    ).toFixed(2)}
                  </td>
                  <td className="px-6 py-4 flex justify-start items-center">
                    <Tooltip position="left" content="Add">
                      <button
                        className="bg-emerald-600 text-white px-2 py-1 rounded-md hover:bg-emerald-800"
                        onClick={() => handleIncreaseQuantity(product.id)}
                      >
                        +
                      </button>
                    </Tooltip>
                    <Tooltip position="right" content="Delete">
                      <button
                        className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-700"
                        onClick={() => handleDecreaseQuantity(product.id)}
                      >
                        -
                      </button>
                    </Tooltip>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="py-3 text-right pr-10 text-lg font-semibold bg-gray-100 dark:bg-gray-700  border-t border-gray-100 dark:border-gray-600">
            <span className="text-gray-700 dark:text-gray-400">
              Total Order Price:
            </span>
            <span className="text-gray-700 dark:text-gray-400">
              {calculateTotalPrice().toFixed(2)}DA
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

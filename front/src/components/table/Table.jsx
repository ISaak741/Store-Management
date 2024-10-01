/* eslint-disable react/prop-types */
import { BiEdit, BiTrash } from "react-icons/bi";
import Tooltip from "../tools/Tooltip";

const Table = ({
  products,
  columns,
  currentPage,
  handlePageChange,
  totalProducts,
  productsPerPage,
  handleUpdateClick,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200  dark:border-gray-600 shadow-md m-5 mb-2 w-full">
        <table className="w-full border-collapse bg-white text-left text-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {columns.map((col) => (
                <th
                  key={col.accessor}
                  scope="col"
                  className="px-6 py-4 font-bold text-gray-700"
                >
                  {col.Header}
                </th>
              ))}
              <th scope="col" className="px-6 py-4  font-bold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t border-gray-100 dark:border-gray-600">
            {products.map((product) => (
              <tr
                key={product.id}
                // className={`text-center ${
                //   product.id % 2 === 0
                //     ? "bg-violet-200 dark:text-gray-900"
                //     : "bg-violet-100 dark:text-gray-900"
                // } hover:bg-violet-200`}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-650"
              >
                {columns.map((col) => (
                  <td key={col.accessor} className="px-6 py-4">
                    {product[col.accessor]}
                  </td>
                ))}
                <td className="px-6 py-4  flex justify-start items-center">
                  <Tooltip position="left" content=" Update">
                    <BiEdit
                      className="text-green-600 text-2xl cursor-pointer"
                      onClick={() => handleUpdateClick(product)}
                    />{" "}
                  </Tooltip>
                  <Tooltip position="right" content=" Delete">
                    <BiTrash className="text-red-600 ml-2 text-2xl cursor-pointer" />
                  </Tooltip>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination flex flex-row mt-5 justify-center">
        <button
          className="block rounded-lg bg-gradient-to-tr from-violet-800 to-violet-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Previous
        </button>
        <span className="text-lg mx-2">
          Page {currentPage} of {totalPages}
        </span>
        <button
          className="block rounded-lg bg-gradient-to-tr from-violet-800 to-violet-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Table;

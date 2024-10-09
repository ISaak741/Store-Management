/* eslint-disable react/prop-types */
import { BiTrash } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import Tooltip from "../tools/Tooltip";
import { useState } from "react";
import { deleteProduct } from "../../services/api";
import DeleteModal from "./DeleteModal";
import { IoMdArrowDropup } from "react-icons/io";
import { IoMdArrowDropdown } from "react-icons/io";

const Table = ({
  products,
  columns,
  currentPage,
  handlePageChange,
  totalProducts,
  productsPerPage,
  handleUpdateClick,
  fetchProducts,
  showSuccessMessage,
}) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: "id",
    direction: "ascending",
  });

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteProduct(productToDelete.id);
      fetchProducts();
      setShowDeleteModal(false);
      showSuccessMessage("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
      showSuccessMessage("Failed to delete product.");
    }
  };

  const requestSort = (key) => {
    let direction = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  return (
    <>
      <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 shadow-md m-5 mb-2 w-full">
        <table className="w-full border-collapse bg-white text-left text-gray-700">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              {columns.map(({ accessor, Header }) => (
                <th
                  key={accessor}
                  scope="col"
                  className="px-6  relative py-4 font-bold text-gray-700 dark:text-gray-400 cursor-pointer"
                  onClick={() => requestSort(accessor)}
                >
                  {Header}
                  {sortConfig.key === accessor ? (
                    sortConfig.direction === "ascending" ? (
                      <IoMdArrowDropup className="absolute right-3 top-5" />
                    ) : (
                      <IoMdArrowDropdown className="absolute right-3 top-5" />
                    )
                  ) : null}
                </th>
              ))}
              <th
                scope="col"
                className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t border-gray-100 dark:border-gray-600">
            {sortedProducts.map((product) => (
              <tr
                key={product.id}
                className="hover:bg-gray-50 dark:hover:bg-gray-700 dark:bg-gray-650 dark:text-white"
              >
                {columns.map(({ accessor }) => (
                  <td key={accessor} className="px-6 py-4  dark:text-gray-400">
                    {product[accessor]}
                  </td>
                ))}
                <td className="px-6 py-4 flex justify-start items-center">
                  <Tooltip position="left" content="Update">
                    <MdOutlineModeEditOutline
                      className="text-emerald-600 text-xl cursor-pointer"
                      onClick={() => handleUpdateClick(product)}
                    />
                  </Tooltip>
                  <Tooltip position="right" content="Delete">
                    <BiTrash
                      className="text-red-600 ml-2 text-xl cursor-pointer"
                      onClick={() => handleDeleteClick(product)}
                    />
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

      {showDeleteModal && (
        <DeleteModal
          title="Delete Product"
          content={`Are you sure you want to delete ${productToDelete?.name}?`}
          onClose={() => setShowDeleteModal(false)}
          onConfirm={confirmDelete}
        />
      )}
    </>
  );
};

export default Table;

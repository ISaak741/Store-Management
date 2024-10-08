import { useEffect, useState } from "react";
import { listProduct, setAuthToken, add, updateProduct } from "../services/api";
import { BiSearch } from "react-icons/bi";
import Table from "../components/table/Table";
import Modal from "../components/table/Modal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductUpdate, setShowProductUpdate] = useState(false);
  const [showProductAdd, setShowProductAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Product Name", accessor: "name" },
    { Header: "Price", accessor: "price" },
    { Header: "Quantity", accessor: "quantity" },
  ];

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setAuthToken(token);
    } else {
      setLoading(false);
      return;
    }

    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await listProduct();
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setError("Failed to fetch products.");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateClick = (product) => {
    setSelectedProduct(product);
    setShowProductUpdate(true);
  };

  const handleAddClick = () => {
    setShowProductAdd(true);
  };

  const handleCloseModal = () => {
    setShowProductUpdate(false);
    setShowProductAdd(false);
    setSelectedProduct(null);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleProductsPerPageChange = (e) => {
    setProductsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleAddProduct = async (formData) => {
    try {
      await add(formData.name, formData.quantity, formData.price);
      setShowProductAdd(false);
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      setError("Failed to add product.");
    }
  };

  const handleUpdateProduct = async (formData) => {
    try {
      await updateProduct(
        selectedProduct.id,
        formData.name,
        formData.price,
        formData.quantity
      );
      setShowProductUpdate(false);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product.");
    }
  };
  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.price.toString().includes(searchTerm) ||
      product.quantity.toString().includes(searchTerm)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  if (loading) {
    return (
      <div className="text-center absolute m-auto left-0 top-0 right-0 bottom-0 grid place-items-center">
        <div className="flex-col gap-4 w-full flex items-center justify-center">
          <p className="text-xl text-violet-400">Loading products</p>
          <div className="w-28 h-28 border-8 animate-spin border-violet-200 flex items-center justify-center border-t-violet-600 rounded-full"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex flex-col justify-center items-center">
      {successMessage && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg">
            <div className="  text-green-700 p-4">{successMessage}</div>
          </div>
        </div>
      )}
      <button
        onClick={handleAddClick}
        className="text-white flex mr-2 items-center bg-violet-500 hover:bg-violet-800 px-4 py-2 rounded-md self-end"
      >
        Add Product
      </button>

      <div className="flex w-full justify-center items-center my-5">
        <div className="mr-32 relative">
          <input
            className="py-2 px-3 w-48 lg:w-80 text-md text-gray-900 border border-gray-300 rounded-full pl-9 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-offset-1 focus:ring focus:ring-violet-500"
            type="text"
            placeholder="Search anything"
            onChange={handleSearch}
          />
          <BiSearch className="absolute left-3 top-2.5 text-2xl text-gray-500" />
        </div>

        <div className="flex items-center">
          <label className="text-md font-light text-gray-700 mr-5 dark:text-gray-400">
            Products Per Page :
          </label>
          <select
            className="text-lg bg-white px-3 py-1 focus:outline-none text-gray-500 dark:text-gray-400 dark:bg-gray-700 focus:ring-offset-1 focus:ring focus:ring-violet-500 border-gray-300 dark:border-gray-600 border rounded-lg"
            value={productsPerPage}
            onChange={handleProductsPerPageChange}
          >
            {[5, 10, 20, 30, 50, 100].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
      </div>

      <Table
        products={currentProducts}
        columns={columns}
        currentPage={currentPage}
        handlePageChange={handlePageChange}
        totalProducts={filteredProducts.length}
        productsPerPage={productsPerPage}
        handleUpdateClick={handleUpdateClick}
        fetchProducts={fetchProducts}
        showSuccessMessage={showSuccessMessage}
      />
      {showProductUpdate && (
        <Modal
          product={selectedProduct}
          handleCloseModal={handleCloseModal}
          title="Update Product"
          onSubmit={handleUpdateProduct}
        />
      )}

      {showProductAdd && (
        <Modal
          handleCloseModal={handleCloseModal}
          title="Add Product"
          onSubmit={handleAddProduct}
        />
      )}
    </div>
  );
};

export default Products;

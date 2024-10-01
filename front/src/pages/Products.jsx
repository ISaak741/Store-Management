import { useState } from "react";
import productsdata from "../data/Productsdata.json";
import { BiSearch } from "react-icons/bi";
import Table from "../components/table/Table";
import Modal from "../components/table/Modal";
const Products = () => {
  // eslint-disable-next-line no-unused-vars
  const [products, setProducts] = useState(productsdata);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductUpdate, setShowProductUpdate] = useState(false);
  const [showProductAdd, setShowProductAdd] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(10);
  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "Product Name", accessor: "productsName" },
    { Header: "Price", accessor: "price" },
    { Header: "Quantity", accessor: "quantity" },
  ];
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

  const filteredProducts = products.filter(
    (product) =>
      product.productsName.toLowerCase().includes(searchTerm) ||
      product.price.toLowerCase().includes(searchTerm) ||
      product.quantity.toLowerCase().includes(searchTerm)
  );

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <div className="flex flex-col justify-center items-center">
      <button
        onClick={handleAddClick}
        className="text-white flex mr-2 items-center bg-violet-500 hover:bg-violet-800 px-4 py-2 rounded-md self-end"
      >
        Add Product
      </button>
      <div className="flex w-full justify-center items-center my-5">
        <div className="mr-32">
          <input
            className="py-2 px-3 w-48 lg:w-80 text-md text-gray-900 border border-gray-300 rounded-full pl-9 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-offset-1 focus:ring focus:ring-violet-500"
            type="text"
            placeholder="Search anything"
            onChange={handleSearch}
          />
          <BiSearch className="absolute left-3 top-3 text-2xl text-gray-500" />
        </div>
        <div className="flex items-center">
          <label htmlFor="ProductsPerPage" className="text-md font-light text-gray-700 mr-5">
            Products Per Page :
          </label>
          <select
            id="ProductsPerPage"
            className="text-lg bg-white px-3 py-1 focus:outline-none text-gray-500 dark:text-gray-400 dark:bg-gray-700 focus:ring-offset-1 focus:ring focus:ring-violet-500 border-gray-300 dark:border-gray-600 border rounded-lg"
            value={productsPerPage}
            onChange={handleProductsPerPageChange}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={30}>30</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
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
      />

      {showProductUpdate && (
        <Modal
          product={selectedProduct}
          handleCloseModal={handleCloseModal}
          title="Update Product"
        />
      )}

      {showProductAdd && (
        <Modal handleCloseModal={handleCloseModal} title="Add Product" />
      )}
    </div>
  );
};

export default Products;

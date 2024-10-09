/* eslint-disable react/prop-types */
import { useState } from "react";

const Modal = ({ product, handleCloseModal, title, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: product?.name || "",
    price: product?.price || "",
    quantity: product?.quantity || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 overflow-y-auto flex items-center justify-center">
      <div className="modal-overlay fixed inset-0 bg-black opacity-80"></div>
      <div className="modal-content relative bg-white w-96 pl-6 pb-6 pr-8 rounded-lg shadow-lg">
        <span
          className="close cursor-pointer relative text-3xl top-[1px] left-full text-red-500"
          onClick={handleCloseModal}
        >
          &times;
        </span>
        <h3 className="text-xl relative text-center inset-0 text-black font-semibold mb-4">
          {title}
        </h3>
        <form onSubmit={handleSubmit}>
          <label className="text-gray-900" htmlFor="productName">
            Product Name
          </label>
          <input
            id="productName"
            name="name"
            type="text"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            className="relative mb-3 bg-gray-50 ring-0 w-full outline-none border border-neutral-500 text-neutral-900 placeholder-violet-500 text-sm rounded-lg focus:ring-violet-500 focus:ring-offset-1 focus:ring-2 block p-2.5"
          />

          <label className="text-gray-900" htmlFor="price">
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            min="0"
            placeholder="Enter product price"
            value={formData.price}
            onChange={handleChange}
            className="relative mb-3 bg-gray-50 ring-0 w-full outline-none border border-neutral-500 text-neutral-900 placeholder-violet-500 text-sm rounded-lg focus:ring-violet-500 focus:ring-offset-1 focus:ring-2 block p-2.5"
          />

          <label className="text-gray-900" htmlFor="quantity">
            Quantity
          </label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            placeholder="Enter product quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="relative mb-3 bg-gray-50 ring-0 w-full outline-none border border-neutral-500 text-neutral-900 placeholder-violet-500 text-sm rounded-lg focus:ring-violet-500 focus:ring-offset-1 focus:ring-2 block p-2.5"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
            >
              {product ? "Update" : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Modal;

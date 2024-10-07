/* eslint-disable react/prop-types */
const Modal = ({ product, handleCloseModal, title }) => (
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
      <form>
        <label htmlFor="productName">Product Name</label>
        <input
          id="productName"
          type="text"
          defaultValue={product?.name || ""}
          placeholder={product ? "" : "Enter product name"}
          className="relative mb-3 bg-gray-50 ring-0 w-full outline-none border border-neutral-500 text-neutral-900 placeholder-violet-500 text-sm rounded-lg focus:ring-violet-500 focus:ring-offset-1 focus:ring-2 block p-2.5"
        />

        <label htmlFor="price">Price</label>
        <input
          id="price"
          type="number"
          min="0"
          defaultValue={product?.price || ""}
          placeholder={product ? "" : "Enter product price"}
          className="relative mb-3 bg-gray-50 ring-0 w-full outline-none border border-neutral-500 text-neutral-900 placeholder-violet-500 text-sm rounded-lg focus:ring-violet-500 focus:ring-offset-1 focus:ring-2 block p-2.5"
        />

        <label htmlFor="quantity">Quantity</label>
        <input
          id="quantity"
          type="number"
          min="0"
          defaultValue={product?.quantity || ""}
          placeholder={product ? "" : "Enter product quantity"}
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

export default Modal;

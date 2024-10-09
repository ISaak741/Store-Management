/* eslint-disable react/prop-types */
const DeleteModal = ({ title, content, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800">{title}</h2>
        <p className="mb-6 text-gray-800">{content}</p>
        <div className="flex justify-end">
          <button
            className="bg-gray-400 text-white px-4 py-2 rounded-md mr-2"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;

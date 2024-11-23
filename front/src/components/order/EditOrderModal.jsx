import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import Tooltip from "../tools/Tooltip";

export default function EditOrderModal({ order, onClose, onUpdate }) {
    const [orderProducts, setOrderProducts] = useState(
        order.products || [
            { id: 1, name: "Product 1", price: 100, quantity: 2 },
            { id: 2, name: "Product 2", price: 150, quantity: 1 },
        ]
    );

    const handleRemoveProduct = (productId) => {
        setOrderProducts((products) =>
            products.filter((p) => p.id !== productId)
        );
    };

    const handleQuantityChange = (productId, newQuantity) => {
        setOrderProducts((products) =>
            products.map((p) =>
                p.id === productId
                    ? { ...p, quantity: parseInt(newQuantity) || 0 }
                    : p
            )
        );
    };

    const calculateTotal = () => {
        return orderProducts.reduce(
            (sum, product) => sum + product.price * product.quantity,
            0
        );
    };

    const handleUpdate = () => {
        onUpdate({
            ...order,
            products: orderProducts,
            total: calculateTotal(),
        });
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                        Edit Order #{order.id}
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        ×
                    </button>
                </div>

                <div className="mb-6">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Customer
                            </label>
                            <p className="mt-1 text-gray-900 dark:text-white">
                                {order.customer}
                            </p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Date
                            </label>
                            <p className="mt-1 text-gray-900 dark:text-white">
                                {order.date}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600">
                    <table className="w-full">
                        <thead className="bg-gray-100 dark:bg-gray-700">
                            <tr>
                                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                                    Product
                                </th>
                                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                                    Price
                                </th>
                                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                                    Quantity
                                </th>
                                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                                    Total
                                </th>
                                <th className="px-4 py-3 text-left text-gray-700 dark:text-gray-300">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                            {orderProducts.map((product) => (
                                <tr
                                    key={product.id}
                                    className="dark:bg-gray-800"
                                >
                                    <td className="px-4 py-3 dark:text-gray-300">
                                        {product.name}
                                    </td>
                                    <td className="px-4 py-3 dark:text-gray-300">
                                        ${product.price}
                                    </td>
                                    <td className="px-4 py-3">
                                        <input
                                            type="number"
                                            min="1"
                                            value={product.quantity}
                                            onChange={(e) =>
                                                handleQuantityChange(
                                                    product.id,
                                                    e.target.value
                                                )
                                            }
                                            className="w-20 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white"
                                        />
                                    </td>
                                    <td className="px-4 py-3 dark:text-gray-300">
                                        $
                                        {(
                                            product.price * product.quantity
                                        ).toFixed(2)}
                                    </td>
                                    <td className="px-4 py-3">
                                        <Tooltip
                                            position="left"
                                            content="Remove"
                                        >
                                            <button
                                                onClick={() =>
                                                    handleRemoveProduct(
                                                        product.id
                                                    )
                                                }
                                                className="text-red-600 hover:text-red-800"
                                            >
                                                <BiTrash className="text-xl" />
                                            </button>
                                        </Tooltip>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 flex justify-between items-center">
                    <div className="text-lg font-semibold dark:text-white">
                        Total: ${calculateTotal().toFixed(2)}
                    </div>
                    <div className="space-x-3">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleUpdate}
                            className="px-4 py-2 text-white bg-violet-500 rounded-md hover:bg-violet-600"
                        >
                            Update Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

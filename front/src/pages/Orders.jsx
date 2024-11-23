import { useState } from "react";
import { Link } from "react-router-dom";
import { BiSearch } from "react-icons/bi";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { BiTrash } from "react-icons/bi";
import Tooltip from "../components/tools/Tooltip";
import EditOrderModal from "../components/order/EditOrderModal";
import DeleteModal from "../components/table/DeleteModal";

export default function Orders() {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [ordersPerPage, setOrdersPerPage] = useState(5);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    // Dummy data for demonstration
    const [orders, setOrders] = useState([
        {
            id: 1,
            date: "2024-01-15",
            total: 1500,
            status: "Completed",
            customer: "John Doe",
        },
        {
            id: 2,
            date: "2024-01-16",
            total: 2300,
            status: "Pending",
            customer: "Jane Smith",
        },
        {
            id: 3,
            date: "2024-01-17",
            total: 890,
            status: "Processing",
            customer: "Mike Johnson",
        },
        {
            id: 4,
            date: "2024-01-18",
            total: 1750,
            status: "Completed",
            customer: "Sarah Williams",
        },
        {
            id: 5,
            date: "2024-01-19",
            total: 3200,
            status: "Cancelled",
            customer: "Tom Brown",
        },
        {
            id: 6,
            date: "2024-01-19",
            total: 3200,
            status: "Cancelled",
            customer: "said",
        },
    ]);

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "processing":
                return "bg-blue-100 text-blue-800";
            case "cancelled":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const handleEditClick = (order) => {
        setSelectedOrder(order);
    };

    const handleDeleteClick = (order) => {
        setOrderToDelete(order);
        setShowDeleteModal(true);
    };

    const handleUpdateOrder = (updatedOrder) => {
        setOrders(
            orders.map((order) =>
                order.id === updatedOrder.id ? updatedOrder : order
            )
        );
        setSelectedOrder(null);
    };

    const handleDeleteOrder = () => {
        setOrders(orders.filter((order) => order.id !== orderToDelete.id));
        setShowDeleteModal(false);
        setOrderToDelete(null);
    };

    const filteredOrders = orders.filter(
        (order) =>
            order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.status.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastOrder = currentPage * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = filteredOrders.slice(
        indexOfFirstOrder,
        indexOfLastOrder
    );
    const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

    return (
        <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                    Order Management
                </h1>
                <Link
                    className="text-white flex items-center bg-violet-500 hover:bg-violet-800 px-4 py-2 rounded-md transition-colors"
                    to="/AddOrder"
                >
                    Add Order
                </Link>
            </div>

            <div className="flex justify-between items-center mb-6">
                <div className="relative">
                    <input
                        className="py-2 px-3 w-48 lg:w-80 text-md text-gray-900 border border-gray-300 rounded-full pl-9 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white focus:outline-none focus:ring-offset-1 focus:ring focus:ring-violet-500"
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <BiSearch className="absolute left-3 top-2.5 text-2xl text-gray-500" />
                </div>

                <div className="flex items-center">
                    <label className="text-md font-light text-gray-700 mr-5 dark:text-gray-400">
                        Orders Per Page:
                    </label>
                    <select
                        className="text-lg bg-white px-3 py-1 focus:outline-none text-gray-500 dark:text-gray-400 dark:bg-gray-700 focus:ring-offset-1 focus:ring focus:ring-violet-500 border-gray-300 dark:border-gray-600 border rounded-lg"
                        value={ordersPerPage}
                        onChange={(e) =>
                            setOrdersPerPage(Number(e.target.value))
                        }
                    >
                        {[5, 10, 20, 30, 50].map((num) => (
                            <option key={num} value={num}>
                                {num}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-600 shadow-md">
                <table className="w-full border-collapse bg-white text-left text-gray-700 dark:bg-gray-800">
                    <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400">
                                Order ID
                            </th>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400">
                                Date
                            </th>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400">
                                Customer
                            </th>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400">
                                Total
                            </th>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400">
                                Status
                            </th>
                            <th className="px-6 py-4 font-bold text-gray-700 dark:text-gray-400">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 dark:divide-gray-600 border-t border-gray-100 dark:border-gray-600">
                        {currentOrders.map((order) => (
                            <tr
                                key={order.id}
                                className="hover:bg-gray-100 dark:hover:bg-gray-700 dark:bg-gray-650 dark:text-white"
                            >
                                <td className="px-6 py-4 dark:text-gray-400">
                                    #{order.id}
                                </td>
                                <td className="px-6 py-4 dark:text-gray-400">
                                    {order.date}
                                </td>
                                <td className="px-6 py-4 dark:text-gray-400">
                                    {order.customer}
                                </td>
                                <td className="px-6 py-4 dark:text-gray-400">
                                    ${order.total.toFixed(2)}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 flex items-center space-x-3">
                                    <Tooltip position="left" content="Edit">
                                        <button
                                            className="text-emerald-600 hover:text-emerald-800"
                                            onClick={() =>
                                                handleEditClick(order)
                                            }
                                        >
                                            <MdOutlineModeEditOutline className="text-xl" />
                                        </button>
                                    </Tooltip>
                                    <Tooltip position="right" content="Delete">
                                        <button
                                            className="text-red-600 hover:text-red-800"
                                            onClick={() =>
                                                handleDeleteClick(order)
                                            }
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

            <div className="flex justify-center mt-6">
                <div className="flex space-x-2">
                    <button
                        className="block rounded-lg bg-gradient-to-tr from-violet-800 to-violet-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        onClick={() =>
                            setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <span className="text-lg mx-2">
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        className="block rounded-lg bg-gradient-to-tr from-violet-800 to-violet-500 py-2 px-4 font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-500/20 transition-all hover:shadow-lg hover:shadow-gray-500/40 active:opacity-85 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
                        onClick={() =>
                            setCurrentPage((prev) =>
                                Math.min(prev + 1, totalPages)
                            )
                        }
                        disabled={currentPage === totalPages}
                    >
                        Next
                    </button>
                </div>
            </div>

            {selectedOrder && (
                <EditOrderModal
                    order={selectedOrder}
                    onClose={() => setSelectedOrder(null)}
                    onUpdate={handleUpdateOrder}
                />
            )}

            {showDeleteModal && (
                <DeleteModal
                    title="Delete Order"
                    content={`Are you sure you want to delete order #${orderToDelete.id}?`}
                    onClose={() => setShowDeleteModal(false)}
                    onConfirm={handleDeleteOrder}
                />
            )}
        </div>
    );
}

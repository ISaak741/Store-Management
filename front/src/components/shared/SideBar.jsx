import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { FaSignOutAlt, FaProductHunt } from "react-icons/fa";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import Tooltip from "../tools/Tooltip";

export default function SideBar() {
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
  };

  return (
    <aside className="z-40 w-16 lg:w-64 h-full bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 transition-transform">
      <div className="flex flex-col h-full px-3 pb-4">
        <ul className="space-y-2 font-semibold flex-1 flex flex-col">
          <div className="flex flex-col flex-1 gap-1 mt-4">
            <li>
              <Link
                to="."
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                <Tooltip position="right" content="Products">
                  <FaProductHunt className="lg:mr-2 text-violet-500 text-xl" />
                </Tooltip>
                <span className="hidden lg:inline-flex items-center justify-center px-2 ms-3 text-lg font-medium rounded-full">
                  Products
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="order"
                className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700"
              >
                <Tooltip position="right" content="Orders">
                  <MdOutlineLocalGroceryStore className="lg:mr-2 text-violet-500 text-xl" />
                </Tooltip>
                <span className="hidden lg:inline-flex items-center justify-center px-2 ms-3 text-lg font-medium rounded-full">
                  Orders
                </span>
              </Link>
            </li>
          </div>
          <div className="flex flex-col gap-0.5 border-t border-neutral-20 dark:border-gray-700">
            <li>
              <button
                onClick={handleLogout}
                className="flex items-center p-2 mt-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-300 dark:hover:bg-gray-700 w-full text-left"
              >
                <Tooltip position="right" content="Logout">
                  <FaSignOutAlt className="lg:mr-2 text-violet-500 text-xl" />
                </Tooltip>
                <span className="hidden lg:inline-flex items-center justify-center px-2 ms-3 text-lg font-medium rounded-full">
                  Logout
                </span>
              </button>
            </li>
          </div>
        </ul>
      </div>
    </aside>
  );
}

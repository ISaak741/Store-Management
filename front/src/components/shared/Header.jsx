/* eslint-disable react/prop-types */
import { FaMoon, FaSun } from "react-icons/fa";
import { MdStore } from "react-icons/md";
export default function Header({ darkMode, toggledarkMode }) {
    return (
        <nav className="z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rlt:jutify-end">
                        <a href="#" className="flex ms-3 md:me-24">
                            <MdStore className="h-8 me-3 text-2xl  text-violet-500" />
                            <span className="self-center text-wl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                                Store Management
                            </span>
                        </a>
                    </div>
                    <button
                        className="dark:bg-slate-50 text-violet-500 rounded-full p-2"
                        onClick={toggledarkMode}
                    >
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                </div>
            </div>
        </nav>
    );
}

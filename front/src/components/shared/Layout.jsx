import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./Header";
import SideBar from "./SideBar";

export default function Layout() {
  const [darkMode, setDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme === "dark" : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  return (
    <div
      className={`h-screen w-screen overflow-hidden grid grid-cols-[64px_1fr] lg:grid-cols-[256px_1fr] grid-rows-[auto_1fr] font-quickSand ${
        darkMode ? "dark" : ""
      }`}
    >
      <div className="col-span-2">
        <Header toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
      </div>
      <div className="row-start-2">
        <SideBar />
      </div>
      <div className="row-start-2 col-start-2 dark:text-gray-50 text-gray-900 bg-gray-50 dark:bg-gray-800 p-4 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
}

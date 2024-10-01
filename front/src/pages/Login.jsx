import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import { login } from "../services/api";
import { FaSignInAlt } from "react-icons/fa";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login: loginContext } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ username, password });
      if (response.success) {
        loginContext();
      } else {
        setError(response.message);
      }
      // eslint-disable-next-line no-unused-vars
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };
  return (
    <div className=" max-w-lg mx-auto mt-36 border border-gray-200 bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
      <div className="text-center">
        <h1 className="text-4xl font-medium">Login</h1>
        <p className="text-slate-500">Hi, Welcome back 👋</p>
      </div>
      <form onSubmit={handleSubmit} className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Username</p>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter Username"
            />
          </label>
          <label htmlFor="password">
            <p className="font-medium text-slate-700 pb-2">Password</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter your password"
            />
          </label>
          {error && <p className="text-red-600 text-lg">{error}</p>}
          <button
            type="submit"
            className="w-full py-3 text-xl font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg border-violet-500 hover:shadow inline-flex space-x-2 items-center justify-center"
          >
            <FaSignInAlt />
            <span>Login</span>
          </button>
        </div>
      </form>
    </div>
  );
}

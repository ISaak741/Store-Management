import { FaSignInAlt } from "react-icons/fa";

export default function Login() {
    return (
        <div className=" max-w-lg mx-auto mt-36 border border-gray-200 bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
            <div className="text-center">
                <h1 className="text-4xl font-medium">Login</h1>
                <p className="text-slate-500">Hi, Welcome back 👋</p>
            </div>
            <form action="" className="my-10">
                <div className="flex flex-col space-y-5">
                    <label htmlFor="email">
                        <p className="font-medium text-slate-700 pb-2">
                            Username
                        </p>
                        <input
                            type="text"
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder="Enter Username"
                        />
                    </label>
                    <label htmlFor="password">
                        <p className="font-medium text-slate-700 pb-2">
                            Password
                        </p>
                        <input
                            type="password"
                            className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                            placeholder="Enter your password"
                        />
                    </label>
                    <button className="w-full py-3 text-xl font-medium text-white bg-violet-600 hover:bg-violet-500 rounded-lg border-violet-500 hover:shadow inline-flex space-x-2 items-center justify-center">
                        <FaSignInAlt />
                        <span>Login</span>
                    </button>
                </div>
            </form>
        </div>
    );
}

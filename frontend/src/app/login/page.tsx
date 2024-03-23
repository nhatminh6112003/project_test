"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Login = () => {
  const [data, setData] = useState({});
  const router = useRouter();
  useEffect(() => {
    console.log(data);
  }, [data]);
  const loginSubmit = async (e: any) => {
    e.preventDefault();
    const loginCustomers = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/customers/login`,
      {
        ...data,
      }
    );

    if (loginCustomers.data?.status == 200) {
      alert(loginCustomers?.data?.message);
      localStorage.setItem("user", JSON.stringify(loginCustomers?.data?.user));
      window.location.href = "/";
      return;
    }
    alert("Login Failed");
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={loginSubmit}
          id="loginForm"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder=""
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  username: e.target.value,
                }));
              }}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              placeholder=""
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }));
              }}
            />
          </div>

          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

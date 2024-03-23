"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Register = () => {
  const [data, setData] = useState({});
  const router = useRouter();

  const registerSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const createCustomers = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_URL}/customers/register`,
        {
          ...data,
        }
      );
      console.log(createCustomers?.status);
      if (createCustomers?.status == 409) {
        alert("Username already exists ");
      }
      if (createCustomers.status == 201) {
        setData({
          username: "",
          last_name: "",
          first_name: "",
        });
        alert("Register success !");
        router.push("/login");
      }
    } catch (error) {
      // console.log(error?.data?.message);
    }
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-xs mx-auto">
        <form
          onSubmit={registerSubmit}
          id="loginForm"
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              FirstName
            </label>
            <input
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  first_name: e.target.value,
                }));
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=""
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              LastName
            </label>
            <input
              onChange={(e) => {
                setData((prev) => ({
                  ...prev,
                  last_name: e.target.value,
                }));
              }}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              placeholder=""
            />
          </div>
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
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

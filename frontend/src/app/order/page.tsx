"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import useCurrentUser from "@/hooks/useCurrentUser";
const Order = () => {
  const { currentUser } = useCurrentUser();
  const [data, setData] = useState([]);

  const handleCancelOrder = async (orderId: number) => {
    const action = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/cancel/${orderId}`
    );
  };
  useEffect(() => {
    if (currentUser) {
      getMyOrder();
    }
  }, [currentUser]);
  const getMyOrder = async () => {
    const data = (
      await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/orders/user/${currentUser?.id}`
      )
    )?.data;
    setData(data);
  };
  return currentUser ? (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Order Id
            </th>
            {/* <th scope="col" className="px-6 py-3">
          Ngày đặt hàng
        </th> */}

            {/* <th scope="col" className="px-6 py-3">
          Quantity
        </th> */}
            <th scope="col" className="px-6 py-3">
              Total Point Payment
            </th>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any) => (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {item?.id}
              </th>
              {/* <td className="px-6 py-4">
         <p className="text-red-500">14:17 22/03/2024</p>
       </td> */}

              <td className="px-6 py-4">{item?.amount}</td>
              <td className="px-6 py-4">
                {item?.status === 1 ? "Pending" : "Cancel"}
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-3">
                  <Link
                    href={`/order/detail?order_id=${item?.id}`}
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    {" "}
                    Detail
                  </Link>
                  {item?.status === 1 ? (
                    <button
                      onClick={() => {
                        handleCancelOrder(item?.id);
                        getMyOrder();
                      }}
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                      Cancel Order
                    </button>
                  ) : (
                    <button></button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    ""
  );
};

export default Order;

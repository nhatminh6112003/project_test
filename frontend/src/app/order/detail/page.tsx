"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
interface OrderItem {
  product_id: number;
  order_id: number;
  point: number;
  quantity: number;
}
const Detail = () => {
  const searchParam = useSearchParams();
  const order_id = searchParam.get("order_id");
  const [data, setData] = useState<OrderItem[] | []>([]);

  useEffect(() => {
    const getOrderItem = async () => {
      const data = (
        await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/orderItem/${order_id}`)
      )?.data;
      setData(data);
    };
    getOrderItem();
  }, []);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            {/* <th scope="col" className="px-6 py-3">
            Ngày đặt hàng
          </th> */}
            <th scope="col" className="px-6 py-3">
              Title
            </th>
            <th scope="col" className="px-6 py-3">
              Writer
            </th>
            <th scope="col" className="px-6 py-3">
              Cover Image
            </th>
            <th scope="col" className="px-6 py-3">
              Tag
            </th>
            <th scope="col" className="px-6 py-3">
              Quantity
            </th>
            <th scope="col" className="px-6 py-3">
              Point
            </th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item: any) => (
            <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
              <td className="px-6 py-4">
                <h1>{item?.books?.title} </h1>
              </td>
              <td className="px-6 py-4">
                <h1>{item?.books?.writer} </h1>
              </td>
              <td className="px-6 py-4">
                <img src={item?.books?.coverImage} alt="" className="h-[60px] w-[60px]" />
              </td>
              <td>
                <div className="flex gap-2 mt-2 ">
                  {item?.books?.tag?.map((tagItem: string) => (
                    <div className="p-1 text-xs  flex items-center h-4 border-2 bg-discount_label discount_label border-[#FF424E] text-[#ff424e] bg-[#fff0f1] rounded-sm">
                      {tagItem}
                    </div>
                  ))}
                </div>
              </td>
              <td className="px-6 py-4">{item?.quantity}</td>
              <td className="px-6 py-4">{item?.point}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Detail;

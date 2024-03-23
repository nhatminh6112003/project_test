"use client";
import { Book } from "@/types";
import React from "react";
import { useCarts } from "@/hooks/useCarts";
export interface BooksProps {
  books: Book[] | null;
}

const Books = ({ books }: BooksProps) => {
  const { addCart } = useCarts();
  return (
    <div
      className="grid grid-cols-1 gap-4 my-2  md:grid-cols-2  lg:grid-cols-3  bg-white product_2 "
      id="product"
    >
      {books?.map((item) => (
        <div className="hover:shadow-[#0000001a_0px_0px_20px] px-3 py-4 cursor-pointer border-[1px] rounded-xl ">
          <div className="2xl:px-3 xl:px-3 lg:px-3 px-1 py-4 item_product ">
            <div>
              <img
                className=" h-[180px] sm:max-h-[200px] md:max-h-[200px]  lg:max-h-[168px] xl:max-h-[200px] 2xl:max-h-[200px] object-contain  max-w-[100%] mx-auto getHeightImg"
                src={item?.coverImage}
                alt=""
              />
              <div className="my-2 line-clamp-2 flex justify-center text-center">
                {item?.title}
              </div>
              <div className="my-2 flex justify-center items-center gap-1 ">
                <p className="text-[#007185]">{item?.writer} </p>
                <span>(Writer)</span>
              </div>
            </div>

            <div className="flex rounded-sm items-center justify-center ">
              <div className="new_price mr-1.5 font-medium text-[#B12704] 2xl:text-base xl:text-base lg:text-base text-sm">
                ${item?.point}
              </div>
            </div>
            <div className="flex gap-2 mt-2 justify-center">
              {item?.tag?.map((tagItem) => (
                <div className="p-1 text-xs  flex items-center h-4 border-2 bg-discount_label discount_label border-[#FF424E] text-[#ff424e] bg-[#fff0f1] rounded-sm">
                  {tagItem}
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center">
              <button
                onClick={() => addCart(item)}
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Books;

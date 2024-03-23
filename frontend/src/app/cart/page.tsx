"use client";
import React, { useEffect, useState } from "react";
import { useCarts } from "@/hooks/useCarts";
import { CartItem } from "@/hooks/useCarts";
import Link from "next/link";
import axios from "axios";
import useCurrentUser from "@/hooks/useCurrentUser";
import { useRouter } from "next/navigation";
import useMyPoint from "@/hooks/useMyPoint";
const Cart = () => {
  const router = useRouter();
  const { myPoint, setMyPoint, getPoint } = useMyPoint();

  // const [myPoint, setMyPoint] = useState<number>(0);
  const { currentUser } = useCurrentUser();
  const { carts, getCarts, removeCart, setCarts } = useCarts();
  const [totalCart, setTotalCart] = useState<number | null>();

  useEffect(() => {
    if (carts) {
      const totalItemInCart = (carts: CartItem[]) => {
        const arrPriceProduct = [];
        for (const item of carts) {
          arrPriceProduct.push(item?.point * item?.quantity);
        }
        let sum = 0;
        for (const a of arrPriceProduct) {
          sum += a;
        }

        setTotalCart(sum);
      };
      totalItemInCart(carts);
    }
  }, [totalCart, carts]);

  // useEffect(() => {
  //   if (currentUser) {
  //     getPoint();
  //   }
  // }, [currentUser]);
  // const getPoint = async () => {
  //   const data = await axios.get(
  //     `${process.env.NEXT_PUBLIC_BASE_URL}/customers/profile?username=${currentUser?.username}`
  //   );
  //   setMyPoint(data?.data?.user?.point);
  // };
  const buyBook = async () => {
    const createOrder = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/orders/create`,
      {
        user_id: currentUser?.id,
        amount: totalCart,
      }
    );
    if (createOrder?.data?.status === 200) {
      localStorage.removeItem("carts");
      setCarts([]);
      await getPoint();
      window.location.href = "/order";
    }
    if (createOrder?.data?.order_id) {
      const handleAddOrderItem = carts?.map(async (item) => {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_URL}/orderItem/create`,
          {
            order_id: createOrder?.data?.order_id,
            product_id: item?.id,
            point: item?.point,
            quantity: item?.quantity,
          }
        );
      });
    }

    alert(createOrder?.data?.message);
  };
  return currentUser ? (
    <div className="bg-[#f5f5fa] pb-16 rounded-[4px]">
      <div className="2xl:container xl:container lg:container 2xl:mx-auto xl:mx-auto lg:mx-auto 2xl:px-16 xl:px-16 lg:px-16 px-3">
        <h4 className="py-10 font-medium text-[#000000] text-xl">CART</h4>
        <div className="my-3">My point : {myPoint}</div>
        <div className="bg-white  2xl:p-5 xl:p-5 lg:p-5 p-3  ">
          {carts && carts?.length > 0 ? (
            <div className="render_product">
              <table className="w-full p-[10px]" cellSpacing={0}>
                <thead className=" ">
                  <tr>
                    <td>Product</td>
                    <td>Point</td>
                    <td>Quantity</td>
                    <td>Total Point</td>
                    <td>
                      <img
                        className="mx-auto"
                        src="https://frontend.tikicdn.com/_desktop-next/static/img/icons/trash.svg"
                        alt="deleted"
                      />
                    </td>
                  </tr>
                </thead>
                <tbody className="before:content['.'] before:block before:h-5 p-5 render_content">
                  {carts?.map((item: CartItem) => (
                    <tr
                      className="2xl:p-5 xl:p-5 lg:p-5 pt-4 px-3 my-6"
                      key={item?.id}
                    >
                      <td>
                        <div className="flex items-center">
                          <img
                            src={item?.coverImage}
                            className="max-h-[80px] max-w-[80px] "
                            alt=""
                          />
                          <h1 className="pl-[10px]">
                            {item?.title} ({item?.writer})
                          </h1>
                        </div>
                      </td>
                      <td>
                        <p className="flex items-center"> {item?.point}</p>
                      </td>
                      <td>
                        <div>{item?.quantity}</div>
                      </td>
                      <td>
                        <div>{item?.quantity * item?.point}</div>
                      </td>
                      <td
                        onClick={() => {
                          removeCart(item?.id);
                        }}
                        data-id={4}
                        style={{ cursor: "pointer", textAlign: "center" }}
                        className="delete hover:text-[#ff424e]"
                      >
                        Delete
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between mt-10 pl-5 pt-5 bg-white border-t-[1px]  rounded-[4px]   ">
                Total Point:
                <div className="flex text-[#ff424e] font-medium">
                  <span className=" product_final_prices">{totalCart} </span>
                </div>
              </div>
              <div className="text-end mt-[25px] cursor-pointer ">
                <button
                  className="bg-[#ff424e] py-[13px] px-[10px] text-white w-[300px] "
                  onClick={() => {
                    buyBook();
                    // localStorage.removeItem("carts");
                  }}
                >
                  Order
                </button>
              </div>
            </div>
          ) : (
            <div className="empty text-center  p-8 ">
              <img
                src="https://salt.tikicdn.com/desktop/img/mascot@2x.png"
                alt=""
                className="empty__img mx-auto max-w-[190px]"
              />
              <p className="empty__note mt-[15px] mb-8">Empty Cart</p>
              <Link
                href="/"
                className=" text-sm empty__btn bg-[#fdd835] font-medium text-[#4a4a4a] rounded-[4px] py-[10px] px-[55px]"
              >
                Continue
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  ) : (
    <div className="text-center mt-4 ">
      <Link
        href={"/login"}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Please Login
      </Link>
    </div>
  );
};

export default Cart;

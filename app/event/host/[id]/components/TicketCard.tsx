import React, { useState } from "react";
import Image from "next/image";

import { FiPlusCircle } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";

import { TicketArray } from "./HostSideBar";

interface TicketMockupProps {
  image: string;
  typeId: string;
  price: number;
  key: string;
  totalPrice: number;
  setTotalPrice: React.Dispatch<React.SetStateAction<number>>;
  setTicketArray: React.Dispatch<React.SetStateAction<TicketArray[]>>;
  ticketArray: TicketArray[];
  type: string;
}
export default function TicketCard({
  image,
  typeId,
  price,
  key,
  totalPrice,
  setTotalPrice,
  setTicketArray,
  ticketArray,
  type,
}: TicketMockupProps) {
  const [visible, setVisible] = useState(false);

  // const updateQuantity = (): void => {
  //   setTotalPrice(totalPrice + price);

  // const ticket = {
  //   typeId,
  //   type,
  // };

  //   setTicketArray((prev) => [...prev, ticket]);
  // };

  const updateQuantity = (): void => {
    const ticket = {
      typeId,
      type,
    };
    setVisible(true);
    setTotalPrice(totalPrice + price);
    setTicketArray((prev) => [...prev, ticket]);
  };

  const removeQuantity = (): void => {
    //   totalPrice !== 0 ? setTotalPrice(totalPrice - price) : setTotalPrice(0);
    //   setTicketArray((prevTicketArray) => {
    //     const updatedTicketArray = [...prevTicketArray];
    //     const ticketIndex = updatedTicketArray.indexOf(type);
    //     if (ticketIndex !== -1) {
    //       // Decrement quantity if the ticket exists
    //       updatedTicketArray[ticketIndex] =
    //         updatedTicketArray[ticketIndex] === "1"
    //           ? ""
    //           : String(Number(updatedTicketArray[ticketIndex]) - 1);
    //     }
    //     return updatedTicketArray;
    //   });
  };

  return (
    <div className=" rounded-[10px] border-2 border-[#E2E2E2] pb-4">
      <div className=" w-64 h-60 p-4 overflow-hidden object-cover">
        <Image
          src={image}
          width={250}
          height={250}
          alt="Picture of ticket"
          className="rounded-xl shadow-md"
        />
      </div>
      <div className="px-4 flex space-x-12">
        <div className="space-y-2">
          <div className="text-black text-xl font-bold text-start">{type}</div>
          <div className="text-black text-base text-start font-normal ">
            Rs {price} /=
          </div>

          {/* {visible && (
            <div className="text-sm font-normal">
              Quantity :{" "}
              {ticketArray.indexOf(type) !== -1
                ? ticketArray.filter((item) => item === type).length
                : 0}
            </div>
          )} */}
        </div>

        <div className="space-y-2 pt-2">
          <button
            className=" w-24 rounded border-[1px] border-[#37A234] px-2 my-auto text-sm font-semibold text-[#37A234] flex  gap-2 "
            onClick={updateQuantity}
          >
            <div className="py-1">
              <FiPlusCircle />
            </div>
            Add
          </button>

          <button
            className="w-24 rounded border-[1px] border-[#A23434] px-2 my-auto text-sm font-semibold text-[#A23434] flex  gap-2 "
            onClick={removeQuantity}
          >
            <div className="py-1">
              <MdDeleteOutline />
            </div>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

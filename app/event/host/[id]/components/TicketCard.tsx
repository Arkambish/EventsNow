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
  amount: number;
  count: number;
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
  amount,
  count
}: TicketMockupProps) {
  const [visible, setVisible] = useState(false);

  
  const updateQuantity = (): void => {
    const ticket = {
      typeId,
      type,
    };
    
    setTotalPrice(totalPrice + price);
    setTicketArray((prev) => [...prev, ticket]);
  };

  const removeQuantity = (): void => {
    const ticket = {
      typeId,
      type,
    };
    //check if the ticket is already in the array
    const index = ticketArray.findIndex((item) => item.typeId === typeId);
    //if the ticket is in the array then remove it from the array
    if (index !== -1) {
      setTotalPrice(totalPrice - price);
      // setTicketArray(ticketArray.filter((item) => item.typeId !== typeId));
      ticketArray.splice(index, 1);
    }
   
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

          
            <div className="text-sm font-normal">
              Quantity :{" "}
              {ticketArray.filter((item) => item.type === type).length}
                
            </div>
            <div className="text-sm font-normal">
              Remaining  :{" "}
              {amount-count-ticketArray.filter((item) => item.type === type).length}
                
            </div>
    
        </div>

        <div className="space-y-2 pt-2">

          {count+ticketArray.filter((item) => item.type === type).length<amount &&
          <button
            className=" w-24 rounded border-[1px] border-[#37A234] px-2 my-auto text-sm font-semibold text-[#37A234] flex  gap-2 button "
            onClick={updateQuantity}
          >
            <div className="py-1">
              <FiPlusCircle />
            </div>
            Add
          </button>
}

            {(ticketArray.findIndex((item) => item.typeId === typeId) !== -1)&&<button
            className="button w-24 rounded border-[1px] border-[#A23434] px-2 my-auto text-sm font-semibold text-[#A23434] flex  gap-2 "
            onClick={removeQuantity}
          >
            <div className="py-1">
              <MdDeleteOutline />
            </div>
            Remove
          </button>}
          
        </div>
      </div>
    </div>
  );
}


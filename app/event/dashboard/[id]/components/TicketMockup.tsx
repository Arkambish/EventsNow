"use client";
import React from "react";
import Image from "next/image";
import { EventContextType, UseEventContext } from "../EventDashContext";
import { error, success } from "@/util/Toastify";

interface TicketMockupProps {
  image: string;
  type: string;
  price: number;
  id: string;
}

export default function TicketMockup({
  image,
  type,
  price,
  id,
}: TicketMockupProps) {
  const { allTickets, setAllTickets } = UseEventContext() as EventContextType;
  async function deleteTicket() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/ticket/deleteTicket/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      error("Failed to delete ticket");
      return;
    }
    success("Ticket deleted successfully");
    setAllTickets(allTickets.filter((ticket) => ticket._id !== id));
  }

  return (
    <div className=" bg-gray-200 hover:border border-gray-400  w-[14rem]  rounded-xl  shadow-inner ">
      <div className="p-4 text-center w-[14rem] h-[9rem] overflow-hidden object-cover">
        <Image
          src={image}
          width={250}
          height={250}
          alt="Picture of ticket"
          className="rounded-xl shadow-md"
        />
      </div>
      <div className="flex flex-row">
        <div className="text-black text-center font-semibold">Type: {type}</div>
        <div className="text-black text-center pb-2 font-semibold">
          Price: {price} /=
        </div>
        <button onClick={deleteTicket}>
          <div className=" button text-end text-lg font-semibold text-white bg-red-600 rounded-lg px-1 ">
            Delete
          </div>
        </button>
      </div>
    </div>
  );
}

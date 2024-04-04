import { set } from "mongoose";
import React, { Dispatch, useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import TicketCard from "./TicketCard";
import { Ticket } from "@/app/Type";

export default function ShowTicketsForUserModal({
  setIsActiveTicketModal,
  setIsActiveProceedTicketModal,
  ticketArrayTemp,
  setTicketArrayTemp,
  ticketTypes,
  totalPrice,
  setTotalPrice,
}: {
  setIsActiveTicketModal: Dispatch<boolean>;
  setIsActiveProceedTicketModal: any;
  ticketArrayTemp: string[];
  setTicketArrayTemp: any;
  ticketTypes: Ticket[];
  totalPrice: number;
  setTotalPrice: any;
}) {
  const handleVisible = () => {
    setIsActiveTicketModal(false);
    setIsActiveProceedTicketModal(true);
  };
  const handleBackArrowClick = () => {
    setIsActiveTicketModal(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#D9D9D9CC",
      }}
      id="static-modal"
      data-modal-backdrop="static"
      aria-hidden="true"
      className=" overflow-y-auto overflow-x-hidden p-4 fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full"
    >
      <div className="border-[1px] border-custom-orange rounded-md bg-white  w-3/5 relative top-[20%] left-[20%]">
        <div className="flex justify-between bg-slate-300">
          <button
            className="text-slate-400 ml-3"
            onClick={handleBackArrowClick}
          >
            <IoMdArrowRoundBack size={25} />
          </button>
        </div>
        <div className="pl-6">Select Your Tickets from Here</div>
        <div className="flex flex-wrap gap-3 m-6 ">
          {ticketTypes ? (
            ticketTypes.map((ticket) => (
              <TicketCard
                image={ticket.image}
                type={ticket.classType}
                price={ticket.price}
                key={ticket._id}
                totalPrice={totalPrice}
                setTotalPrice={setTotalPrice}
                setTicketArray={setTicketArrayTemp}
                ticketArray={ticketArrayTemp}
              />
            ))
          ) : (
            <div>No Tickets Available</div>
          )}
        </div>
        {ticketTypes && ticketArrayTemp.length > 0 && (
          <div className="w-full flex justify-between">
            <div className="pl-6">Total Price : {totalPrice} </div>
            <button
              onClick={handleVisible}
              type="button"
              className=" rounded-md border border-transparent shadow-sm py-1 px-2 my-auto  bg-custom-orange  text-base font-medium text-white hover:opacity-70  button  sm:ml-3 sm:w-auto sm:text-sm mr-10 mb-5"
            >
              Proceed
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

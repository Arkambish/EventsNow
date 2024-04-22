import React, { Dispatch, SetStateAction, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import TicketCard from "./TicketCard";
import { Ticket } from "@/app/Type";
import { TicketArray } from "./HostSideBar";
import WidthChangeModal from "@/components/WidthChangeModal";
import { Dialog } from "@headlessui/react";

export default function ShowTicketsForUserModal({
  setIsActiveTicketModal,
  setIsActiveProceedTicketModal,
  ticketArrayTemp,
  setTicketArrayTemp,
  ticketTypes,
  totalPrice,
  setTotalPrice,
  isActiveTicketModal,
}: {
  setIsActiveTicketModal: Dispatch<SetStateAction<boolean>>;
  setIsActiveProceedTicketModal: any;
  ticketArrayTemp: TicketArray[];
  setTicketArrayTemp: any;
  ticketTypes: Ticket[];
  totalPrice: number;
  setTotalPrice: any;
  isActiveTicketModal: boolean;
}) {
  const handleVisible = () => {
    setIsActiveTicketModal(false);
    setIsActiveProceedTicketModal(true);
  };
  const handleBackArrowClick = () => {
    setIsActiveTicketModal(false);
  };

  return (
    <>
      <WidthChangeModal
        isOpen={isActiveTicketModal}
        setIsOpen={setIsActiveTicketModal}
      >
        <div className="flex justify-end ">
          <button
            className="w-8 text-slate-600 p-1 bg-slate-400 rounded-full"
            onClick={handleBackArrowClick}
          >
            <IoCloseSharp size={25} />
          </button>
        </div>
        <div className="pl-6">
          <Dialog.Title
            as="h3"
            className="text-lg font-medium leading-6 text-gray-900"
          >
            Select Your Tickets from Here
          </Dialog.Title>
        </div>
        <div className="flex flex-wrap gap-3 m-6 ">
          {ticketTypes ? (
            ticketTypes.map((ticket) => (
              <>
                <TicketCard
                  image={ticket.image}
                  typeId={ticket._id}
                  type={ticket.classType}
                  price={ticket.price}
                  key={ticket._id}
                  totalPrice={totalPrice}
                  setTotalPrice={setTotalPrice}
                  setTicketArray={setTicketArrayTemp}
                  ticketArray={ticketArrayTemp}
                />
              </>
            ))
          ) : (
            <div>No Tickets Available</div>
          )}
        </div>
        {ticketTypes && ticketArrayTemp.length > 0 && (
          <>
            <div className="w-full border-2 mb-2"></div>
            <div className="w-full flex justify-between">
              <div className="pl-6">
                <span className="font-bold mr-2">Total Price :</span> Rs.{" "}
                {totalPrice}{" "}
              </div>
              <button
                onClick={handleVisible}
                type="button"
                className=" rounded-md border border-transparent shadow-sm py-1 px-2 my-auto  bg-custom-orange  text-base font-medium text-white hover:opacity-70  button  sm:ml-3 sm:w-auto sm:text-sm mr-10 mb-5"
              >
                Proceed
              </button>
            </div>
          </>
        )}
      </WidthChangeModal>
    </>
  );
}

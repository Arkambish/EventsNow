"use client";
import React from "react";
import { useState } from "react";
import Modal from "./ModalContext";
import TicketDetailmodalContent from "./modals/TicketDetailModal";
import { EventContextProvider } from "../EventDashContext";
import Image from "next/image";

export default function GetTicketDatils() {
  const [showTicketDetail, setTicketDetail] = useState(false);
  return (
    <div className=" justify-items-start flex ">
      <button
        onClick={() => setTicketDetail(true)}
        className="flex button mt-8 bg-custom-orange text-white rounded-md items-center  px-4 py-2 gap-2   "
      >
        <Image
          src="/images/eventDash/icons8-new-ticket.png"
          width={28}
          height={28}
          alt="Picture of the author"
        />

        <div className="font-medium xl:text-lg text-md text-white text-center leading-tight mx-auto">
          Create tickets
        </div>
      </button>

      {showTicketDetail && (
        <Modal title="Ticket Details" onClose={() => setTicketDetail(false)}>
          {/* <EventContextProvider> */}
          <TicketDetailmodalContent setTicketDetail={setTicketDetail} />
          {/* </EventContextProvider> */}
        </Modal>
      )}
    </div>
  );
}

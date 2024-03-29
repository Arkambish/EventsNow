"use client";
import React from 'react'
import { useState } from 'react';
import Modal from "./ModalContext";
import TicketDetailmodalContent from './modals/TicketDetailModal';
import { EventContextProvider } from "../EventDashContext";


export default function GetTicketDatils() {
  const [showTicketDetail, setTicketDetail] = useState(false);
  return (
    <>
    <button
    onClick={() => setTicketDetail(true)}
        className="flex button xl:w-72 w-64 xl:h-16 h-12  bg-[#D47151] rounded-2xl items-center xl:px-4  "
      >
        <div className=" w-10 h-8 mt-2 ml-2 xl:ml-0">
        </div>
        <div className="font-medium xl:text-lg text-md text-white text-left leading-tight ml-4">
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
    </>
  )
}
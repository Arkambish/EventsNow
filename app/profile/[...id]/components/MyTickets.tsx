import React, { useState } from "react";

import EmptyStateComponent from "@/components/EmptyStateComponent";
import TicketMockup from "@/app/event/dashboard/[id]/components/TicketMockup";
import { useProf } from "../ProfContext";
import { Ticket } from "@/app/Type";
import { RiH1 } from "react-icons/ri";
export type TicketType = {
  ticket: any[];
};
export default function MyTickets() {
  const { ticket } = useProf() as any as TicketType;
  return (
    <div className="flex flex-col md:flex-row rounded-lg shadow-3xl bg-[#fff] pt-8  justify-start items-start">
      <div className="w-fit ml-0">
        <div className="text-3xl font-semibold text-custom-orange font-IBM ml-[55px]">
          My Tickets
        </div>
        <div className="mt-10 mx-10">
          {ticket.length > 0 ? (
            ticket.map((ticket: any) => (
              <TicketMockup
                key={ticket._id}
                image={ticket.image}
                type={ticket.classType}
                price={ticket.price}
                id={ticket._id}
              />
            ))
          ) : (
            <EmptyStateComponent message="No ticket created yet" />
          )}
        </div>
      </div>
    </div>
  );
}

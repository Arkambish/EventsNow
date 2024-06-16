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
    <div className="flex flex-col md:flex-row rounded-lg pt-8  h-full w-full  ">
      <div className="ml-0 w-full p-6">
        <div className="text-3xl font-semibold text-stone-600 font-IBM ml-[55px]">
          My Tickets
        </div>
        <div className="w-full  overflow-y-scroll sm:max-h-80 xl:max-h-96 scroll-smooth">
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
            <EmptyStateComponent message="No ticket available" />
          )}
        </div>
      </div>
    </div>
  );
}

import React from "react";
import Container from "./Container";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import GetTicketDatils from "./GetTicketDetails";
import { UseEventContext, EventContextType } from "../EventDashContext";
import TicketMockup from "./TicketMockup";

export default function Tickets() {
  const { allTickets } = UseEventContext() as EventContextType;

  return (
    <Container>
      <div className="mb-5 grid gap-2 lg:px-6 mt-8 lg:mr-16 pb-20">
        <div className="">
          <div className="   content-start   pb-4 ">
            <div className=" text-stone-600 font-IBM font-medium text-3xl">
              TICKETS
            </div>

            <div className="text-[#455273]  md:mr-8">
              You can create tickets for your event here. You can create
              multiple tickets with different prices and class types.
            </div>
            <div className="w-full flex justify-end">
              <GetTicketDatils />
            </div>

            <div className="mt-2 flex flex-wrap">
              {!allTickets || allTickets.length == 0 ? (
                <EmptyStateComponent message="You have not created any tickets yet" />
              ) : (
                allTickets.map((ticket) => (
                  <div className="m-2" key={ticket._id}>
                    <TicketMockup
                      id={ticket._id}
                      image={ticket.image}
                      price={ticket.price}
                      type={ticket.classType}
                      key={ticket._id}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

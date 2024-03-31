import React from "react";
import { useState } from "react";
import Container from "./Container";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import GetTicketDatils from "./GetTicketDetails";
import { UseEventContext, EventContextType } from "../EventDashContext";
import TicketMockup from "./TicketMockup";
export default function Tickets() {
  const { allTickets } = UseEventContext() as EventContextType;

  return (
    <Container>
      <div className=" lg:ml-16 mb-5 grid gap-2 lg:px-6 mt-8 lg:mr-16 pb-20">
        <div className="">
          <div className="   content-start  font-mono pb-4 ">
            <div className=" text-custom-orange font-medium text-3xl">
              TICKETS
            </div>
            
            <div className="">
              
            </div>

            <div className="mt-20 xl:flex">
              {!allTickets || allTickets.length==0 ? (
                <EmptyStateComponent message="You have not created any tickets yet" />
              ):allTickets.map((ticket) => 
              <div className="m-4" key={ticket._id}>
              <TicketMockup 
              image={ticket.image}
              price={ticket.price}
              type={ticket.classType}
              key={ticket._id}
               />
            </div>)}
            </div>
            <div className="w-full">
              <GetTicketDatils />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

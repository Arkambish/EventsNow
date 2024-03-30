import React from "react";
import { useState } from "react";
import Container from "./Container";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import GetTicketDatils from "./GetTicketDetails";

export default function Tickets() {
  const [isTicket, setIsTicket] = useState(false);
  return (
    <Container>
      <div className=" lg:ml-16 mb-5 grid gap-2 lg:px-6 mt-8 lg:mr-16 pb-20">
        <div className="">
          <div className="   content-start  font-mono pb-4 ">
            <div className=" text-custom-orange font-medium text-3xl">
              TICKETS
            </div>

            <div className="mt-20">
              {isTicket ? null : (
                <EmptyStateComponent message="You have not created any tickets yet" />
              )}
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

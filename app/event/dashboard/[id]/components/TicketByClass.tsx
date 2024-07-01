import React, { useEffect, useState } from "react";
import Image from "next/image";
import ContainerWithStroke from "./ContainerWithStroke";
import DetailsModal from "./modals/TicketByClass";
import { EventContextType, UseEventContext } from "../EventDashContext";
import TicketByClassModal from "./modals/TicketByClass";

interface OverviewSubComponentProps {
  image: string;
  text: string;
  eventId: string;
}

export interface TicketSalesData {
  _id: string;
  count: number;
}

export default function TicketSalesByClass({
  image,
  text,
  eventId,
}: OverviewSubComponentProps) {
  const [ticketSales, setTicketSales] = useState<TicketSalesData[]>([]);
  const { totalTicketSale } = UseEventContext() as EventContextType;
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchTicketSales = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/ticket/countTicketById/${eventId}`
        );
        const data = await response.json();
        if (data.success) {
          setTicketSales(data.data);
        } else {
          console.error("Error fetching ticket sales:", data.error);
        }
      } catch (error) {
        console.error("Error fetching ticket sales:", error);
      }
    };

    fetchTicketSales();
  }, [eventId]);

  return (
    <ContainerWithStroke>
      <div className="py-4 sm:px-4 lg:px-0 grid gap-3 justify-center text-sm lg:text-base">
        <Image
          className="justify-self-center"
          src={`/images/eventDash/${image}`}
          alt="tickets"
          width={80}
          height={80}
        />
        <div className="text-[#273B4A] tracking-tight">{text}</div>
        <div
          className="pl-0.5 flex justify-center  text-[#455273] font-normal hover:text-sky-600 cursor-pointer"
          onClick={() => setIsOpen(true)}
        >
          {totalTicketSale}
        </div>
        <TicketByClassModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          ticketSales={ticketSales}
          totalTicketSale={totalTicketSale}
        />
      </div>
    </ContainerWithStroke>
  );
}

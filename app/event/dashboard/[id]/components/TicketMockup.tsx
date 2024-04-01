"use client";
import React from "react";
import Image from "next/image";
import { EventContextType, UseEventContext } from "../EventDashContext";
import { error, success } from "@/util/Toastify";

interface TicketMockupProps {
  image: string;
  type: string;
  price: number;
  id: string;
}

export default function TicketMockup({
  image,
  type,
  price,
  id,
}: TicketMockupProps) {
  const { allTickets, setAllTickets } = UseEventContext() as EventContextType;
  async function deleteTicket() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/ticket/deleteTicket/${id}`,
      {
        method: "DELETE",
      }
    );
    if (!res.ok) {
      error("Failed to delete ticket");
      return;
    }
    success("Ticket deleted successfully");
    setAllTickets(allTickets.filter((ticket) => ticket._id !== id));
  }

  return (
    <div className=" bg-gray-200 hover:border border-gray-400  w-[14rem]  rounded-xl  shadow-inner ">
      <button onClick={deleteTicket}>
        <div className=" button text-end text-lg font-semibold text-white bg-red-600 rounded-lg px-1 ">
          Delete
        </div>
      </button>
      <div className="p-4 text-center w-[14rem] h-[9rem] overflow-hidden object-cover">
        <Image
          src={image}
          width={250}
          height={250}
          alt="Picture of ticket"
          className="rounded-xl shadow-md"
        />
      </div>

      <div className="text-black text-center font-semibold">Type: {type}</div>
      <div className="text-black text-center pb-2 font-semibold">
        Price: {price} /=
      </div>
    </div>
  );
}

// import React from "react";
// import {Card, CardHeader, CardBody, Image} from "@nextui-org/react";

// export default function App() {
//   return (
//     <Card className="py-4">
//       <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
//         <p className="text-tiny uppercase font-bold">Daily Mix</p>
//         <small className="text-default-500">12 Tracks</small>
//         <h4 className="font-bold text-large">Frontend Radio</h4>
//       </CardHeader>
//       <CardBody className="overflow-visible py-2">
//         <Image
//           alt="Card background"
//           className="object-cover rounded-xl"
//           src="/images/hero-card-complete.jpeg"
//           width={270}
//         />
//       </CardBody>
//     </Card>
//   );
// }

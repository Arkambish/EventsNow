"use client";
import React from "react";
import Image from "next/image";

interface TicketMockupProps {
  image: string;
  type: string;
  price: string;
}

export default function TicketMockup({
  image,
  type,
  price,
}: TicketMockupProps) {
  return (
    <div className=" bg-gray-200 hover:border border-gray-400 w-[18rem] rounded-lg  shadow-inner button">
      <div className="p-4 text-center w-[17.7rem] h-[13rem] overflow-hidden object-cover">
        <Image
          src={image}
          width={250}
          height={250}
          alt="Picture of ticket"
          className="rounded-lg shadow-md"
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

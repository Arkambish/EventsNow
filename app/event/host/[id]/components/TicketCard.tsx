import React,{useState} from "react";
import Image from "next/image";


interface TicketMockupProps {
  image: string;
  typeId: string;
  price: number;
  key: string;
    totalPrice:number;
    setTotalPrice:React.Dispatch<React.SetStateAction<number>>;
    setTicketArray:React.Dispatch<React.SetStateAction<string[]>>;
    ticketArray:string[];
    type:string
}
export default function TicketCard({
  image,
  typeId,
  price,
  key,
  totalPrice,
  setTotalPrice,
  setTicketArray,
  ticketArray,
  type
}: TicketMockupProps) {
    const updateQuantity = (): void => {
        setTotalPrice(totalPrice+price);
        
        setTicketArray((prev) => [...prev, typeId]);

    }
  return (
    <div className=" bg-gray-200 hover:border border-gray-400  w-[14rem]  rounded-xl  shadow-inner  pb-4">
      
      <div className="p-4 text-center w-[14rem] h-[9rem] overflow-hidden object-cover">
        <Image
          src={image}
          width={250}
          height={250}
          alt="Picture of ticket"
          className="rounded-xl shadow-md"
        />
      </div>
      <div className="px-4">
        <div className="text-black text-start font-semibold">Type: {type}</div>
        <div className="text-black text-start  font-semibold ">
          Price: {price} /=
        </div>
        <div className="flex justify-between">
            <button className="rounded-md border border-transparent shadow-sm  px-2 my-auto  bg-custom-orange  text-base font-medium text-white hover:opacity-70  button flex  gap-2 " onClick={updateQuantity}>
                <Image
                    src={`/images/reusableComponents/createevent.svg`}
                    alt="Picture of the button"
                    width={18}
                    height={18}
                    className="m-auto"
                />
                Add
            </button>
            <div className="">Quantity:{ticketArray.length==0 ?0 :ticketArray.filter(
                          (item) => item === typeId
                        ).length}</div>
        </div>
      </div>
    </div>
  );
}

import React, { memo } from "react";

import { useParams, useRouter } from "next/navigation";
import { IoMdArrowRoundBack } from "react-icons/io";
import PaymentModal from "@/components/PaymentModal";

import { Ticket } from "@/app/Type";

export default memo(function TicketModal({
  setIsActiveProceedTicketModal,
  ticketArrayTemp,
  setTicketArrayTemp,
  ticketTypes,
  totalPrice,
  setIsActiveTicketModal,
}: {
  setIsActvieTicketModal: React.Dispatch<React.SetStateAction<boolean>>;

  setIsActiveProceedTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
  ticketArrayTemp: string[];
  ticketTypes: Ticket[];
  totalPrice: number;
  setIsActiveTicketModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTicketArrayTemp: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const paymentDetails = {
    items: "test",
    oder_id: "test",
    currency: "LKR",
    first_name: "test",
    last_name: "test",
    fullAmount: 200,
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
  };
  return (
    <>
      <div
        style={{
          backgroundColor: "#D9D9D9CC",
        }}
        id="static-modal"
        data-modal-backdrop="static"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden p-4 fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="border-[1px] border-custom-orange rounded-md bg-white  w-3/5 relative top-[20%] left-[20%]">
          <div className="flex justify-between bg-slate-300">
            <button
              className="text-slate-400 ml-3"
              onClick={() => {
                setIsActiveProceedTicketModal(false);
                setIsActiveTicketModal(true);
              }}
            >
              <IoMdArrowRoundBack size={25} />
            </button>
            <div className="text-lg text-bold">Ticket Details</div>

            <div className="mr-4">
              <button
                onClick={() => setIsActiveProceedTicketModal(false)}
                type="button"
                className="text-gray-400 w-full   bg-transparent  rounded-lg text-sm  h-8 ms-auto inline-flex justify-end items-center "
                data-modal-hide="static-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center px-4 py-2"></div>
            <div className="h-full overflow-auto">
              <table className="w-full text-left text-sm font-light">
                <thead className="border-b w-full font-medium ">
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Ticket Name
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Ticket Price
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Ticket Quantity
                    </th>
                    <th scope="col" className="px-6 py-4">
                      Total Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ticketTypes.map((ticket, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4">{ticket.classType}</td>
                      <td className="px-6 py-4">{ticket.price}</td>
                      <td className="px-6 py-4">
                        {
                          ticketArrayTemp.filter(
                            (item) => item === ticket.classType
                          ).length
                        }
                      </td>
                      <td className="px-6 py-4">
                        {ticketArrayTemp.filter(
                          (item) => item === ticket.classType
                        ).length * ticket.price}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Total Amount
                    </th>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 font-bold">{totalPrice}</td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      <PaymentModal
                        setIsActiveProceedTicketModal={
                          setIsActiveProceedTicketModal
                        }
                        totalPrice={totalPrice}
                        ticketArrTemp={ticketArrayTemp}
                        setTicketArrTemp={setTicketArrayTemp}
                        item={paymentDetails?.items}
                        orderId={paymentDetails?.oder_id}
                        amount={totalPrice}
                        currency={paymentDetails?.currency}
                        first_name={paymentDetails?.first_name}
                        last_name={paymentDetails?.last_name}
                        email={paymentDetails?.email}
                        phone={paymentDetails?.phone}
                        address={paymentDetails?.address}
                        city={paymentDetails?.city}
                        country={paymentDetails?.country}
                      />
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

import React, { memo, useState } from "react";
// import { UseEventContext } from "../../EventDashContext";
import { EventContextType } from "@/app/Type";
import { FaPrint } from "react-icons/fa6";
import { UseEventContext } from "@/app/event/dashboard/[id]/EventDashContext";
import { IoMdArrowRoundBack } from "react-icons/io";
import PaymentModal from "@/components/PaymentModal";

export default memo(function TicketModal({
  setIsActvieTicketModal,
}: {
  setIsActvieTicketModal: any;
}) {
  // const [isActive, setIsActvie] = useState(false);

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
            <button className="text-slate-400 ml-3">
              <IoMdArrowRoundBack size={25} />
            </button>
            <div className="text-lg text-bold">Ticket Details</div>

            <div className="mr-4">
              <button
                onClick={() => setIsActvieTicketModal(false)}
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
            <div className="h-60 overflow-auto">
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
                  <tr>
                    <td className="px-6 py-4">General</td>
                    <td className="px-6 py-4">1000</td>
                    <td className="px-6 py-4">10</td>
                    <td className="px-6 py-4">10000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">VIP</td>
                    <td className="px-6 py-4">5000</td>
                    <td className="px-6 py-4">5</td>
                    <td className="px-6 py-4">25000</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4">VVIP</td>
                    <td className="px-6 py-4">10000</td>
                    <td className="px-6 py-4">2</td>
                    <td className="px-6 py-4">20000</td>
                  </tr>

                  <tr>
                    <th scope="col" className="px-6 py-4">
                      Total Amount
                    </th>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4"></td>
                    <td className="px-6 py-4 font-bold">LKR 2000</td>
                  </tr>
                  <tr>
                    <th scope="col" className="px-6 py-4">
                      <PaymentModal
                        item={paymentDetails?.items}
                        orderId={paymentDetails?.oder_id}
                        amount={paymentDetails.fullAmount}
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

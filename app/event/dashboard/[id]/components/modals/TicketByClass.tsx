import React from "react";
import { Dialog } from "@headlessui/react";
import { MdCancel } from "react-icons/md";
import { TicketSalesData } from "../TicketByClass";

interface TicketByClassProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  ticketSales: TicketSalesData[];
  totalTicketSale: number | null;
}

const TicketByClassModal: React.FC<TicketByClassProps> = ({
  isOpen,
  setIsOpen,
  ticketSales,
  totalTicketSale,
}) => {
  return (
    <div>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          <div className="min-h-screen px-4 text-center">
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
              >
                Ticket Sales Details
                <MdCancel
                  size={24}
                  className="hover:cursor-pointer"
                  onClick={() => setIsOpen(false)}
                />
              </Dialog.Title>
              <div className="mt-4 flex flex-col justify-center">
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Class Type
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Count
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {ticketSales.map((ticket) => (
                        <tr key={ticket._id}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                            {ticket._id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {ticket.count}
                          </td>
                        </tr>
                      ))}
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#003585]">
                          Total
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-bold text-[#003585]">
                          {totalTicketSale}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default TicketByClassModal;

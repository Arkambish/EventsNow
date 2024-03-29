import React from 'react'
import { useState } from 'react';
import { Event } from '@/app/admin/Type';
import Image from 'next/image';
import Modal from '../ModalContext';

interface TicketDetailProps {
    // event: Event;
    setTicketDetail: React.Dispatch<React.SetStateAction<boolean>>;
  }

const TicketDetailmodalContent = ({setTicketDetail}: TicketDetailProps) => {
  const[ticketPrice, setTicketPrice] = useState<number>(0)
    return (
        <div className="sm:flex sm:items-start mb-2">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <div className="mt-2 mb-4">
              <div className="flex flex-col">
                <div className="mb-4">Enter Ticket Details</div>

                <label htmlFor="price">Price:</label>
                <input type="text"
                 id="price"
                 value={ticketPrice}
                 className='border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500' 
                 onChange={(e)=>{
                  setTicketPrice(Number(e.target.value))
                }} />
               
                <label htmlFor="class">Class Type:</label>
                <select className="block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-500">
                  <option value="option1">A class</option>
                  <option value="option2">B class</option>
                  <option value="option3">C class</option>
                </select>
          
                <label htmlFor="image" className="flex items-center">Upload Image:</label>
                  <input type="file"
                   id="image"
                   className="hidden"/>
                  <label htmlFor="image" 
                  className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer">Choose file</label>
            

                <div className="absolute right-4 bottom-4">
                  <button
                    onClick={() => setTicketDetail(false)}
                    type="button"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-900 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Create
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default TicketDetailmodalContent;
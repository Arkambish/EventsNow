import React from "react";
import { useState } from "react";
import { Event } from "@/app/admin/Type";
import { UseEventContext, EventContextType } from "../../EventDashContext";
import Image from "next/image";
import Modal from "../ModalContext";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { FaCloudUploadAlt } from "react-icons/fa";

interface TicketDetailProps {
  // event: Event;
  setTicketDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const TicketDetailmodalContent = ({ setTicketDetail }: TicketDetailProps) => {
  const [ticketPrice, setTicketPrice] = useState<number>(0);
  const [ticketClass, setTicketClass] = useState<string>("");
  const [ticketImage, setTicketImage] = useState<string>("");
  const createTicketHandlerLocal = () => {
    console.log("ticketPrice", ticketPrice);
    console.log("ticketClass", ticketClass);
    console.log("ticketImage", ticketImage);
    setTicketDetail(false);
  }

  const {
    newTicketPrice,
newTicketClass,
newTicketImage,
setNewTicketPrice,
setNewTicketClass ,
setNewTicketImage } = UseEventContext() as EventContextType;

  // const handleCreateTicket = async () => {
  //   try {

  //     const response = await fetch('/api/v1/', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         price: ticketPrice,
  //         classType: classType,
  //         // Add other fields like image, eventId if needed
  //       }),
  //     });

  //     if (response.ok) {
  //       // Ticket created successfull
  //       console.log('Ticket created successfully');
  //     } else {
  //       // Failed to create ticket
  //       console.error('Failed to create ticket');
  //     }
  //   } catch (error) {
  //     console.error('Error creating ticket:', error);
  //   }
  // };

  return (
    <div className="sm:flex sm:items-start mb-2">
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <div className="mt-2 mb-4">
          <div className="flex flex-col space-y-4">
            <div className="mb-4">Enter Ticket Details</div>

            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={ticketPrice}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => {
                setTicketPrice(Number(e.target.value));
              }}
            />

            <label htmlFor="ticketclass">Class Type:</label>
            <input
              type="text"
              id="ticketclass"
              value={ticketClass}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => {
                setTicketClass(e.target.value);
              }}
            />

            {/* <label htmlFor="image" className="flex items-center">
              Upload Image:
            </label>
            <input
              type="file"
              id="image"
              onChange={handleImageChange}
              className="hidden"
            />
            <label
              htmlFor="image"
              className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
            >
              Choose file
            </label>

            {image && (
              // <img src={image} alt="Uploaded" className="mt-2 w-40" />
              <Image
                src={image}
                alt="Uploaded"
                width={100}
                height={100}
                className="mt-2 w-40"
              />
            )} */}
            <CldUploadWidget
              uploadPreset="events"
              onOpen={() => {
                console.log("isPhotographer");
              }}
              onSuccess={(results: CloudinaryUploadWidgetResults) => {
                const uploadedResult =
                  results.info as CloudinaryUploadWidgetInfo;
                const profileImageURL = {
                  image: uploadedResult.secure_url,
                };
                setTicketImage(profileImageURL.image);
              }}
              options={{
                tags: ["ticket image"],
                // publicId: `${organizationName}/${Date.now()}`,
                // publicId: "b2c",

                sources: ["local"],
                googleApiKey: "<image_search_google_api_key>",
                showAdvancedOptions: false,
                // cropping: true,
                multiple: false,
                showSkipCropButton: false,
                croppingAspectRatio: 0.75,
                croppingDefaultSelectionRatio: 0.75,
                croppingShowDimensions: true,
                croppingCoordinatesMode: "custom",
                // maxImageHeight: 100,
                // croppingValidateDimensions: true,
                defaultSource: "local",
                resourceType: "image",
                folder: "events",

                styles: {
                  palette: {
                    window: "#ffffff",
                    sourceBg: "#f4f4f5",
                    windowBorder: "#90a0b3",
                    tabIcon: "#000000",
                    inactiveTabIcon: "#555a5f",
                    menuIcons: "#555a5f",
                    link: "#000000",
                    action: "#000000",
                    inProgress: "#464646",
                    complete: "#000000",
                    error: "#cc0000",
                    textDark: "#000000",
                    textLight: "#fcfffd",
                    theme: "white",
                  },
                },
              }}
            >
              {({ open }) => {
                return (
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      open();
                    }}
                  >
                    <div className="p-1 text-white font-semibold flex items-center justify-center gap-2 bg-slate-400 rounded-2xl">
                      <FaCloudUploadAlt />
                      upload image
                    </div>
                  </button>
                );
              }}
            </CldUploadWidget>
            <div className="flex">
              {ticketImage.length > 0 && (
                <div className=" mt-5 border-2 w-auto border-solId rounded-xl   ">
                  <Image
                    className=" p-4"
                    src={ticketImage}
                    width={500}
                    height={500}
                    alt="event cover image"
                  />
                </div>
              )}

              <div className="flex justify-end w-full ">
                <button
                 
                  onClick={createTicketHandlerLocal}
                  type="button"
                  className=" rounded-md border border-transparent shadow-sm py-1 px-2 my-auto  bg-custom-orange  text-base font-medium text-white hover:opacity-70  button  sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Create
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketDetailmodalContent;

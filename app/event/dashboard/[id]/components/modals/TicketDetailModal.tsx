import React from "react";
import { UseEventContext, EventContextType } from "../../EventDashContext";
import Image from "next/image";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { FaCloudUploadAlt } from "react-icons/fa";
import { error, success } from "@/util/Toastify";
import { FetchPost } from "@/hooks/useFetch";

interface TicketDetailProps {
  setTicketDetail: React.Dispatch<React.SetStateAction<boolean>>;
}

const TicketDetailmodalContent = ({ setTicketDetail }: TicketDetailProps) => {
  const [newTicketPrice, setNewTicketPrice] = React.useState<number>(0);
  const [newTicketClass, setNewTicketClass] = React.useState<string>("");
  const [newTicketImage, setNewTicketImage] = React.useState<string>("");
  const [newTicketAmount, setNewTicketAmount] = React.useState<number>(0);
  const { setAllTickets, id } = UseEventContext() as EventContextType;

  const createTicketHandlerLocal = async () => {
    if (newTicketPrice === 0 || newTicketClass === "" || newTicketImage === "" || newTicketAmount === 0) {
      return error("Please fill all fields");
    }
    
    try {
      const newData = await FetchPost({
        endpoint: "ticket/addTicket",
        body: {
          price: newTicketPrice,
          image: newTicketImage,
          eventId: id,
          classType: newTicketClass,
          amount: newTicketAmount
        },
      });

      

      if (!newData || !newData.ticket) {
        
        return error("Failed to create ticket");
      }

      setAllTickets((prev) => {
        if (!prev) return [newData.ticket];
        else return [...prev, newData.ticket];
      });

      success("Ticket created successfully");
      setTicketDetail(false);
      setNewTicketPrice(0);
      setNewTicketClass("");
      setNewTicketImage("");
      setNewTicketAmount(0);
    } catch (err) {
      console.error("Failed to create ticket:", err);
      error("Failed to create ticket");
    }
  };

  return (
    <div className="sm:flex sm:items-start mb-2 ">
      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
        <div className="mt-2 mb-4">
          <div className="flex flex-col space-y-4">
            <label htmlFor="price">Price:</label>
            <input
              type="text"
              id="price"
              value={newTicketPrice}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) return;
                setNewTicketPrice(Number(e.target.value));
              }}
            />

            <label htmlFor="ticketclass">Class Type:</label>
            <input
              type="text"
              id="ticketclass"
              value={newTicketClass}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => {
                setNewTicketClass(e.target.value);
              }}
            />
            <label htmlFor="amount">Ticket Amount:</label>
            <input
              type="text"
              id="amount"
              value={newTicketAmount}
              className="border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-500"
              onChange={(e) => {
                if (isNaN(Number(e.target.value))) return;
                setNewTicketAmount(Number(e.target.value));
              }}
            />
            <CldUploadWidget
              uploadPreset="events"
              onOpen={() => {
                console.log("isPhotographer");
              }}
              onSuccess={(results: CloudinaryUploadWidgetResults) => {
                const uploadedResult = results.info as CloudinaryUploadWidgetInfo;
                const profileImageURL = {
                  image: uploadedResult.secure_url,
                };
                setNewTicketImage(profileImageURL.image);
              }}
              options={{
                tags: ["ticket image"],
                sources: ["local"],
                googleApiKey: "<image_search_google_api_key>",
                showAdvancedOptions: false,
                cropping: true,
                multiple: false,
                showSkipCropButton: false,
                croppingAspectRatio: 1.1,
                croppingDefaultSelectionRatio: 0.75,
                croppingShowDimensions: true,
                croppingCoordinatesMode: "custom",
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
                    <div className="p-1 text-dashBtnBlue font-semibold flex items-center justify-center gap-2 border-2 border-dashBtnBlue rounded-2xl">
                      <FaCloudUploadAlt />
                      upload image
                    </div>
                  </button>
                );
              }}
            </CldUploadWidget>

            <div className="flex">
              {newTicketImage.length > 0 && (
                <div className="mt-5 border-2 w-auto border-solid rounded-xl">
                  <Image
                    className="p-4"
                    src={newTicketImage}
                    width={500}
                    height={500}
                    alt="event cover image"
                  />
                </div>
              )}

              <div className="flex justify-end w-full">
                <button
                  onClick={createTicketHandlerLocal}
                  type="button"
                  className="rounded-md border border-transparent shadow-sm py-1 px-2 my-auto bg-custom-orange text-base font-medium text-white hover:opacity-70 sm:ml-3 sm:w-auto sm:text-sm"
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

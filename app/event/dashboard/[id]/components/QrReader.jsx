import React, { useState, useEffect, useRef } from "react";
import Container from "./Container";
import Switch from "react-switch";
import QRScanner from "./QRcodeScanner";
import QrScanner from "qr-scanner";
import { error, success } from "@/util/Toastify";
import { FetchPost } from "@/hooks/useFetch";
import { UseEventContext } from "../EventDashContext";
import QrCode from "./QrCode";
import Code from "./Code";

const QrReader = () => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState("");
  const [scannedEvent, setScannedEvent] = useState("");
  const [scannedUser, setScannedUser] = useState("");
  const [quantity, setQuantity] = useState();
  const [ticketType, setTicketType] = useState();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isActiveMark, setIsActiveMark] = useState(false);
  const [activeButton, setActiveButton] = useState(1);
  const [activeComponent, setActiveComponent] = useState("QrCode");
  //set active component

  const handleClick = (buttonNumber) => {
    setActiveButton(buttonNumber);
  };

  const handleComponentChange = (component) => {
    setActiveComponent(component);
  };

  const { id } = UseEventContext();

  function handleChange() {
    setIsVideoOn(!isVideoOn);
  }

  useEffect(() => {
    if (isVideoOn) {
      const video = videoElementRef.current;
      const qrScanner = new QrScanner(
        video,
        (result) => {
          const cleanedDataString = result.data
            .replace(/\\/g, "")
            .replace(/^"|"$/g, ""); // Remove backslashes and surrounding quotation marks
          const dataObject = JSON.parse(cleanedDataString);

          setScannedText(result.data);
          setScannedEvent(dataObject.eventId);
          setScannedUser(dataObject.useId);

          setTicketType(dataObject.classType);

          setIsActiveMark(true);
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );
      qrScanner.start();

      return () => {
        qrScanner.stop();
        qrScanner.destroy();
      };
    }
  }, [isVideoOn]);

  async function handleMarkAttendance() {
    if (!scannedEvent.length > 0 || !scannedUser.length > 0 || !quantity > 0) {
      return;
    }

    if (id !== scannedEvent) error("wrong qr code");

    const data = await FetchPost({
      endpoint: "attendant/markAttendant",
      body: {
        eventId: scannedEvent,
        userId: scannedUser,
        ticketType: quantity,
      },
    });

    if (data.message === "User Already Attending") {
      error("User Already Attending");
      return;
    }

    success("Attendance marked successfully");
    setScannedEvent("");
    setScannedUser("");
    setQuantity();
  }

  return (
    <Container>
      <div className="grid lg:pl-10 mb-5 gap-2 mt-8 md:mr-10 pb-8">
        <div className="x  ">
          <div className="  text-stone-600 font-medium text-3xl m-4 ">
            Mark Attendence
          </div>

          <div className="flex items-end  ">
            <div className="flex w-100 xl:h-10 md:h-10 rounded-3xl bg-[#F9EBE9] items-center ">
              <button
                className={`md:text-sm button font-medium ml-2 w-40 h-6 xl:h-8 rounded-3xl  ${
                  activeButton === 1
                    ? "bg-[#D47151] text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                    : "hover:bg-gray-200 text-[#D47151] bg-[#F9EBE9]"
                }`}
                onClick={() => {
                  if (activeComponent !== "QrCode") {
                    handleComponentChange("QrCode");
                    handleClick(1);
                  }
                }}
              >
                Qr Reader
              </button>
              <button
                className={` md:text-sm button cursor-pointer font-medium mr-2 w-40 h-6 xl:h-8 rounded-3xl  ${
                  activeButton === 2
                    ? "bg-[#D47151] text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                    : "hover:bg-gray-200 text-[#D47151] bg-[#F9EBE9]"
                }`}
                onClick={() => {
                  if (activeComponent !== "Code") {
                    handleComponentChange("Code");
                    handleClick(2);
                  }
                }}
              >
                Code Reader
              </button>
            </div>
          </div>
        </div>

        {activeComponent === "QrCode" && <QrCode />}
        {activeComponent === "Code" && <Code />}
      </div>
    </Container>
  );
};

export default QrReader;

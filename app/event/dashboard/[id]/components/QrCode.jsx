import React, { useState, useEffect, useRef } from "react";
import Container from "./Container";
import Switch from "react-switch";
import QRScanner from "./QRcodeScanner";
import QrScanner from "qr-scanner";
import { error, success } from "@/util/Toastify";
import { FetchPost } from "@/hooks/useFetch";
import { UseEventContext } from "../EventDashContext";
import Image from "next/image";

const QrReader = () => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState("");
  const [scannedEvent, setScannedEvent] = useState("");
  const [scannedUser, setScannedUser] = useState("");
  const [quantity, setQuantity] = useState();
  const [ticketType, setTicketType] = useState();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isActiveMark, setIsActiveMark] = useState(false);
  const [ticketCode, setTicketCode] = useState();
  const [markAttendenceLoading, setMarkAttendenceLoading] = useState(false);

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
          setTicketCode(dataObject.ticketCode);
        
          
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

    if (!scannedEvent || !scannedUser || !ticketType || !ticketCode) {
      error("Enter the QR code");
      return;
    }

    setMarkAttendenceLoading(true);
    if (!scannedEvent.length > 0 || !scannedUser.length > 0) {
      return;
    }

    if (id !== scannedEvent) error("wrong qr code");

    const data = await FetchPost({
      endpoint: "attendant/markAttendant",
      body: {
        eventId: scannedEvent,
        userId: scannedUser,
        ticketType: ticketType,
        ticketCode: ticketCode,
        
      },
    });

    setMarkAttendenceLoading(false);
    
    if (data?.message === "User Already Attending" || data?.message === "invalid ticket code" || data?.message === "This ticket is  Already Marked" || data?.message === "attendant Creation Failed") {
      error(data.message);
      return;
    }

    success("Attendance marked successfully");
    setScannedEvent("");
    setScannedUser("");
    setTicketType();
    setTicketCode();
  }

  return (
    <div>
      <Container>
        <div className=" text-[#455273]  mr-8">
          Turn on the camera and scan the qr code
        </div>

        <div className="flex gap-10 items-center">
          <div className="flex flex-col gap-5 justify-center items-center">
            <Switch
              className="grid  self-center"
              onChange={handleChange}
              checked={isVideoOn}
              offColor="#E9E9E9"
              onColor="#394855"
              offHandleColor="#394855"
              onHandleColor="#E9E9E9"
              height={20}
              width={40}
            />
            <div className="flex align items-center justify-center mb-3 ">
              <video
                className="object-cover border-2 border-solid w-64 h-64"
                ref={videoElementRef}
              />
            </div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <p className="scannedText font-bold text-lg">
                Event id:<span className="text-slate-400"> {scannedEvent}</span>
              </p>
              <p className="scannedText font-bold text-lg">
                User id:<span className="text-slate-400"> {scannedUser}</span>
              </p>
              <p className="scannedText font-bold text-lg">
                Ticket Type:
                <span className="text-slate-400"> {ticketType}</span>
              </p>
              <p className="scannedText font-bold text-lg">
                Ticket Code:
                <span className="text-slate-400"> {ticketCode}</span>
              </p>
            </div>

            {markAttendenceLoading ? (
              <button 
                className={`button px-4 py-1.5 rounded-lg  text-white bg-slate-400`}>
                <div className="flex gap-2 justify-center items-center">
                  <div>Loading</div>
                  <Image 
                    src="/images/createEvent/LoadingBtnIcon.svg"
                    alt="loading"
                    width={20} 
                    height={20} 
                  />
                </div>
              </button>
            ) : (
              <button
              onClick={handleMarkAttendance}
              className={`button px-4 py-1.5 rounded-lg  text-white bg-slate-400`}>
              Check In
            </button>
            )}    
          </div>
        </div>
      </Container>
    </div>
  );
};

export default QrReader;

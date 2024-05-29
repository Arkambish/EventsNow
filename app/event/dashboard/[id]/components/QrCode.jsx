import React, { useState, useEffect, useRef } from "react";
import Container from "./Container";
import Switch from "react-switch";
import QRScanner from "./QRcodeScanner";
import QrScanner from "qr-scanner";
import { error, success } from "@/util/Toastify";
import { FetchPost } from "@/hooks/useFetch";
import { UseEventContext } from "../EventDashContext";

const QrReader = () => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState("");
  const [scannedEvent, setScannedEvent] = useState("");
  const [scannedUser, setScannedUser] = useState("");
  const [quantity, setQuantity] = useState();
  const [ticketType, setTicketType] = useState();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isActiveMark, setIsActiveMark] = useState(false);

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

          console.log(dataObject);

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
    console.log(scannedEvent, scannedUser);
    if (!scannedEvent.length > 0 || !scannedUser.length > 0) {
      console.log("non");
      return;
    }

    if (id !== scannedEvent) error("wrong qr code");
    console.log(scannedEvent, ticketType, scannedUser);

    const data = await FetchPost({
      endpoint: "attendant/markAttendant",
      body: {
        eventId: scannedEvent,
        userId: scannedUser,
        ticketType: ticketType,
      },
    });

    if (data.message === "User Already Attending") {
      error("User Already Attending");
      return;
    }

    success("Attendance marked successfully");
    setScannedEvent("");
    setScannedUser("");
    setTicketType();
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
              onColor="#D47151"
              offHandleColor="#D47151"
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
                Ticket Type:{" "}
                <span className="text-slate-400"> {ticketType}</span>
              </p>
            </div>
            <button
              onClick={handleMarkAttendance}
              className={`button p-2 rounded-full  text-white font-bold ${
                isActiveMark ? "bg-custom-orange" : "bg-slate-400"
              }`}
            >
              Mark the attendance
            </button>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default QrReader;

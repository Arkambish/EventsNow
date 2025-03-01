import React, { useState, useEffect, useRef } from "react";
import Container from "./Container";
import Switch from "react-switch";
import QRScanner from "./QRcodeScanner";
import QrScanner from "qr-scanner";
import { error, success } from "@/util/Toastify";

const QrReader = () => {
  const videoElementRef = useRef(null);
  const [scanned, setScannedText] = useState("");
  const [scannedEvent, setScannedEvent] = useState("");
  const [scannedUser, setScannedUser] = useState("");
  const [quantity, setQuantity] = useState();
  const [isVideoOn, setIsVideoOn] = useState(false);
  const [isActiveMark, setIsActiveMark] = useState(false);

  // if (scannedEvent.length > 0 || scannedUser.length > 0 || quantity > 0) {
  //   setIsActiveMark(true);
  // }

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
          setQuantity(dataObject.class.ticket);
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

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/attendant/markAttendant`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventId: scannedEvent,
          userId: scannedUser,
          ticketType: quantity,
        }),
      }
    );

    if (!res.ok) {
      error("Failed to mark attendance");
      return;
    }

    const data = await res.json();
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
    <div>
      <Container>
        <div className="lg:pl-10 mb-5 grid gap-2 mt-8 md:mr-10 pb-8">
          <div className=" font-mono text-custom-orange font-medium text-3xl ">
            QR READER
          </div>
          <div className=" text-[#455273] font-mono mr-8">
            Turn on the camera and scan the qr code
          </div>
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
              <p className="quantity font-bold text-lg">
                Ticket Type: <span className="text-slate-400"> {quantity}</span>
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

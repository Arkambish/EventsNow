import Image from "next/image";
import React, { memo, useEffect, useState } from "react";

import { IoClose } from "react-icons/io5";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { error, success } from "@/util/Toastify";
import { useParams } from "next/navigation";
import { FetchPost } from "@/hooks/useFetch";
import WidthChangeModal from "@/components/WidthChangeModal";
import { Dialog } from "@headlessui/react";
import Modal from "@/components/Modal";

interface Props {
  setGenaralUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  generalUpdate: boolean;
}

export default memo(function GenaralUpdate({
  setGenaralUpdate,
  generalUpdate,
}: Props) {
  const params = useParams();

  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const [isDissableBtn, setIsDissableBtn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostButton = async () => {
    setIsSubmitting(true);

    try {
      const res = await FetchPost({
        endpoint: "event/sendGenaralUpdate",
        body: {
          eventId: params.id,
          subject: subject,
          message: message,
        },
      });

      // if (!res.ok) {
      //   error("Error sending email");
      //   setIsSubmitting(false);
      //   return;
      // }

      // const returnMessage = await res.json();

      if (res.message === "No users registered for the event") {
        error("No users registered for the event");
        setIsSubmitting(false);
        return;
      }

      if (res.message === "Email sent successfully") {
        success("Email sent successfully");
        setIsSubmitting(false);
        setMessage("");
        setSubject("");
        setGenaralUpdate(false);
        return;
      }
    } catch (err) {
      console.error(err);
      error("Error sending email");
      setIsSubmitting(false);
    }
  };

  function handleSubject(e: any) {
    setSubject(e.target.value);
    if (e.target.value.length > 0 && message.length > 0) {
      setIsDissableBtn(false);
    } else {
      setIsDissableBtn(true);
    }
  }

  function handleMessage(e: any) {
    setMessage(e.target.value);
    if (e.target.value.length > 0 && subject.length > 0) {
      setIsDissableBtn(false);
    } else {
      setIsDissableBtn(true);
    }
  }

  return (
    <>
      <Modal isOpen={generalUpdate} setIsOpen={setGenaralUpdate}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Send Email
        </Dialog.Title>
        <div className="p-5">
          <div className="font-semibold	text-lg">Subject</div>
          <input
            value={subject}
            onChange={(e) => handleSubject(e)}
            type="text"
            className="w-full border-2 rounded-xl mt-2 p-1 focus:border-slate-600 focus:outline-none"
          />
        </div>

        <div className="px-5">
          <div className="font-semibold	text-lg">Message</div>
          <textarea
            value={message}
            onChange={(e) => handleMessage(e)}
            className="w-full border-2 rounded-xl mt-2 p-1 focus:border-slate-600 focus:outline-none"
          />
        </div>
        {/* <button className="w-full">
            <div className="border-[2px] items-center full m-2 rounded-2xl font-medium p-3 flex justify-between ">
              Add to your post
              <Image
                src={`/images/event/post/add-post-btn.png`}
                alt="profile picture"
                width={20}
                height={20}
              />
            </div>
          </button> */}

        <div className="w-full flex justify-center items-center">
          {isSubmitting ? (
            <button
              onClick={handlePostButton}
              disabled={isDissableBtn ? true : false}
              className={`w-full m-2  button rounded-2xl flex justify-center items-center p-1  text-bold text-lg bg-dashBtnBlue text-white `}
            >
              <div className="flex gap-2 justify-center items-center">
                <div> Sending</div>
                <Image
                  src="/images/createEvent/LoadingBtnIcon.svg"
                  alt="loading btn"
                  width={40}
                  height={40}
                />
              </div>
            </button>
          ) : (
            <button
              onClick={handlePostButton}
              disabled={isDissableBtn ? true : false}
              className={`w-full m-2  button rounded-2xl flex justify-center items-center p-1  text-bold text-lg ${
                isDissableBtn
                  ? "cursor-not-allowed bg-gray-200 text-gray-400"
                  : "bg-dashBtnBlue text-white"
              } `}
            >
              Send
            </button>
          )}
          {/*  */}
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={() => setGenaralUpdate(false)}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
});

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
import { MdCancel } from "react-icons/md";

interface Props {
  setGenaralUpdate: React.Dispatch<React.SetStateAction<boolean>>;
  generalUpdate: boolean;
}

export default memo(function EventChangeUpdate({
  setGenaralUpdate,
  generalUpdate,
}: Props) {
  const params = useParams();



  const [isDissableBtn, setIsDissableBtn] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handlePostButton = async () => {
    setIsSubmitting(true);

    try {
      const res = await FetchPost({
        endpoint: "event/sendEmailOfEventChanges",
        body: {
          eventId: params.id,
        //   subject: subject,
        //   message: message,
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
        
        setGenaralUpdate(false);
        return;
      }
    } catch (err) {
      console.error(err);
      error("Error sending email");
      setIsSubmitting(false);
    }
  };




  return (
    <>
      <Modal isOpen={generalUpdate} setIsOpen={setGenaralUpdate}>
        <Dialog.Title
          as="h3"
          className=" flex justify-between text-lg font-medium leading-6 text-gray-900"
        >
          Send Email about event changes
          <div className="  grid ">
          <button
            type="button"
            className="justify-center mr-1"
            onClick={() => setGenaralUpdate(false)}
          >
            <MdCancel />
          </button>
        </div>
        </Dialog.Title>
        <Dialog.Description className="text-sm my-2 text-gray-500">
          Are you sure want to send email about event changes?
        </Dialog.Description>
       

     
      

        
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
                  width={30}
                  height={30}
                />
              </div>
            </button>
          ) : (
            <button
              onClick={handlePostButton}
              
              className={`w-full m-2  button rounded-2xl flex justify-center items-center p-1  text-bold text-lg bg-dashBtnBlue text-white
               `}
            >
              Send
            </button>
          )}
          {/*  */}
        </div>
        
      
      </Modal>
    </>
  );
});

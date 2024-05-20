import React, { useState } from "react";
import Container from "./Container";
import ContainerWithStroke from "./ContainerWithStroke";
import Image from "next/image";
import Template from "./hostPage/Template";
import Template1 from "./hostPage/Template1";
import { UseEventContext } from "../EventDashContext";
import { EventContextType } from "@/app/Type";
import Modal from "@/components/Modal";
import { Dialog } from "@headlessui/react";
// import S3UploadForm from "@/components/S3UploadForm";
import { useParams } from "next/navigation";
import S3UploadForm from "@/components/S3UploadForm";
import { error, success } from "@/util/Toastify";
import WidthChangeModal from "@/components/WidthChangeModal";

export default function Hostpage() {
  const [file, setFile] = React.useState<File | null>(null);
  const [upload, setUpload] = React.useState(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    console.log(file);
    setUpload(true);
    e.preventDefault();
    if (!file) return;

    const fileType = file.type;
    if (fileType !== "text/html") {
      console.error("Invalid file type. Only HTML files are allowed.");
      error("Invalid file type. Only HTML files are allowed.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    console.log(formData);

    try {
      const response = await fetch("/api/v1/aws/s3-upload/uploadPage", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      const objectUrl = data.objectUrl;
      console.log(objectUrl);

      const updateEvent = await fetch("/api/v1/event/publishOwnHostPage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, uploadPage: objectUrl }),
      });

      const updateEventRes = await updateEvent.json();

      console.log(updateEventRes);

      if (updateEventRes.message != "pageBuilder update faild") {
        success("Host page updated successfully");
      }

      success("File uploaded successfully");
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setUpload(false);
    }
  };

  const { setIsPageBuilder } = UseEventContext() as EventContextType;

  const { id } = useParams();

  const [showTemplate, setShowTemplate] = useState<boolean>(false);
  const [openPageBuilder, setOpenPageBuilder] = useState<boolean>(false);
  const [uploadingPage, setUploadingPage] = useState<boolean>(false);
  const [isTemplate1, setIsTemplate1] = useState<boolean>(false);
  function handleTemplate1() {
    setIsTemplate1(true);
    setShowTemplate(false);
  }

  const handleDownload = () => {
    const url = "https://eventnow.s3.amazonaws.com/eventnow.pdf"; // PDF file URL
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "Ruchith_Nusara.pdf"); // Set the file name to be downloaded
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return (
    <div>
      <Container>
        <div className="mt-5">
          <div className="sm:pl-10 mb-5 grid gap-2 mt-3 ">
            <div className="  text-stone-600 font-IBM font-medium text-3xl ">
              Host page
            </div>
            <div className=" text-[#848484] ">
              You can upload host page or design your own host page
            </div>
          </div>
          <div className="w-full font-Inter lg:text-base grid gap-8 py-16 font-semibold text-dashBtnBlue rounded-lg sm:px-24 px-4 md:px-8 text-xs xl:px-24 mb-20 ">
            <ContainerWithStroke>
              <button onClick={() => setUploadingPage(true)} className="w-full">
                <div className=" py-2 flex justify-between mx-4 sm:mx-10">
                  <div className=" flex items-center ">UPLOAD EVENT PAGE</div>
                  <Image
                    className="mt-1"
                    src="/images/eventDash/Arrow_left.svg"
                    alt="arrow"
                    width={25}
                    height={25}
                  />
                </div>
              </button>
            </ContainerWithStroke>
            <ContainerWithStroke>
              <button onClick={() => setShowTemplate(true)} className="w-full">
                <div className=" py-2 flex justify-between  mx-4 sm:mx-10">
                  <div className=" flex items-center">USING TEMPLATE</div>
                  <Image
                    className="mt-1"
                    src="/images/eventDash/Arrow_left.svg"
                    alt="arrow"
                    width={25}
                    height={25}
                  />
                </div>
              </button>
            </ContainerWithStroke>
            <ContainerWithStroke>
              <button
                onClick={() => setOpenPageBuilder(true)}
                className="w-full"
              >
                <div className=" py-3 flex justify-between mx-4  sm:mx-10">
                  <div className=" flex items-center "> PAGE BUILDER</div>
                  <Image
                    className="mt-1"
                    src="/images/eventDash/Arrow_left.svg"
                    alt="arrow"
                    width={25}
                    height={25}
                  />
                </div>
              </button>
            </ContainerWithStroke>
            {showTemplate && (
              <WidthChangeModal
                setIsOpen={setShowTemplate}
                isOpen={showTemplate}
              >
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  select template
                </Dialog.Title>
                <div className="flex gap-5 mb-10 p-5">
                  <button onClick={handleTemplate1}>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <Image
                        src={"/images/createEvent/eventRegFormImg.png"}
                        alt="template1"
                        width={40}
                        height={40}
                      />
                      template 1
                    </div>
                  </button>
                  <button>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <Image
                        src={"/images/createEvent/eventRegFormImg.png"}
                        alt="template1"
                        width={40}
                        height={40}
                      />
                      template 2
                    </div>
                  </button>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setShowTemplate(false)}
                  >
                    Cancel
                  </button>
                </div>
              </WidthChangeModal>
            )}

            {openPageBuilder && (
              <Modal setIsOpen={setOpenPageBuilder} isOpen={openPageBuilder}>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Page builder
                </Dialog.Title>
                <div className="mt-2 text-slate-600">
                  Use our Page Builder to create and customize your host page
                  just the way you like it. Easily drag and drop elements,
                  adjust settings, and preview your design in real-time
                </div>
                <div className="flex gap-5 mb-10 p-5">
                  <button onClick={handleDownload}>
                    <div className="flex flex-col justify-center items-center gap-3">
                      <Image
                        src={"/images/createEvent/eventRegFormImg.png"}
                        alt="template1"
                        width={40}
                        height={40}
                      />
                      Doc
                    </div>
                  </button>
                  <button>
                    <button
                      onClick={() => setIsPageBuilder(true)}
                      className="flex flex-col justify-center items-center gap-3"
                    >
                      <Image
                        src={"/images/createEvent/eventRegFormImg.png"}
                        alt="template1"
                        width={40}
                        height={40}
                      />
                      Builder
                    </button>
                  </button>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setOpenPageBuilder(false)}
                  >
                    Cancel
                  </button>
                </div>
              </Modal>
            )}

            {uploadingPage && (
              <Modal setIsOpen={setUploadingPage} isOpen={uploadingPage}>
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Upload Event hostpage
                </Dialog.Title>
                <div className="my-3 text-slate-400">
                  Design your host page manually according to your preferences.
                  Once your design is complete, you can upload it as an HTML
                  file. Please note that only one HTML file can be uploaded
                </div>
                <div className="  mb-10 p-5">
                  <form onSubmit={handleSubmit}>
                    <input type="file" onChange={handleFileChange} />
                  </form>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => setUploadingPage(false)}
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md border border-transparent bg-green-500 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-green-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={handleSubmit}
                  >
                    upload
                  </button>
                </div>
              </Modal>
            )}

            {isTemplate1 && <Template1 setIsTemplate1={setIsTemplate1} />}
          </div>
        </div>
      </Container>
    </div>
  );
}

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
export default function Hostpage() {
  const { setIsPageBuilder } = UseEventContext() as EventContextType;

  const [showTemplate, setShowTemplate] = useState<boolean>(false);
  const [isTemplate1, setIsTemplate1] = useState<boolean>(false);
  function handleTemplate1() {
    setIsTemplate1(true);
    setShowTemplate(false);
  }
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
          <div className="w-full font-Inter lg:text-base grid gap-8 py-16 font-semibold text-custom-orange rounded-lg sm:px-24 px-4 md:px-8 text-xs xl:px-24 mb-20 ">
            <ContainerWithStroke>
              <button onClick={() => setIsPageBuilder(true)} className="w-full">
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
              <button className="w-full">
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
              <Modal setIsOpen={setShowTemplate} isOpen={showTemplate}>
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
              </Modal>
              // <Template
              //   setShowTemplate={setShowTemplate}
              //   handleTemplate1={handleTemplate1}
              // />
            )}

            {isTemplate1 && <Template1 setIsTemplate1={setIsTemplate1} />}
          </div>
        </div>
      </Container>
    </div>
  );
}

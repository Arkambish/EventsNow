import React, { Dispatch, SetStateAction, memo, useState } from "react";
import { RiAddCircleFill } from "react-icons/ri";

import { useOrg } from "../../OrgContext";
import { EventType, OrgContext } from "@/app/Type";
import Modal from "@/components/Modal";
import { Dialog } from "@headlessui/react";
import PermissionOneEvent from "./PermissionOneEvent";

type AllPermissionProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleBackButton: () => void;
  setIsSelectEventPermission: Dispatch<SetStateAction<boolean>>;
  // handleSelectEventPermissionBackButton: () => void;
};

export default memo(function SelectOneEvent({
  isOpen,
  setIsOpen,
  handleBackButton,
  setIsSelectEventPermission,
}: // handleSelectEventPermissionBackButton,
AllPermissionProps) {
  const { events, modalUserName } = useOrg() as OrgContext;
  // const [isSelectEventPermission, setIsSelectEventPermission] =
  //   useState<boolean>(false);

  // function handleBack() {
  //   setIsOpen(true);
  //   setIsSelectEventPermission(false);
  // }

  return (
    <>
      <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
        <Dialog.Title
          as="h3"
          className="text-lg font-medium leading-6 text-gray-900"
        >
          Change permissions for {modalUserName}
        </Dialog.Title>
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            <div className="flex w-full  justify-center ">
              <button>
                <div className="flex rounded-md gap-2 px-3 py-1 items-center bg-custom-orange text-white">
                  <RiAddCircleFill />
                  <div>Chose Events</div>
                </div>
              </button>
            </div>
            <div className="w-full flex flex-col gap-2 mt-3">
              {events?.map((event) => (
                <EvntsDetails
                  name={event.eventName}
                  key={event._id}
                  event={event}
                  setIsOpen={setIsOpen}
                  setIsSelectEventPermission={setIsSelectEventPermission}
                />
              ))}
            </div>
            {/* <div className="flex w-11/12  justify-end  ">
              <button className="button">
                <div className="flex rounded-md gap-2 px-3 py-1 items-center bg-custom-orange text-white">
                  <RiAddCircleFill />
                  <div>Done</div>
                </div>
              </button>
            </div> */}
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <button
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            onClick={handleBackButton}
          >
            Back
          </button>
        </div>
      </Modal>
    </>
  );
});

const EvntsDetails = memo(function EvntsDetails({
  name,
  event,
  setIsOpen,
  setIsSelectEventPermission,
}: {
  name: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  event: EventType;
  setIsSelectEventPermission: Dispatch<SetStateAction<boolean>>;
}) {
  const { setModal, setSelectEventForPermission, events } =
    useOrg() as OrgContext;

  function editButton(event: EventType) {
    setSelectEventForPermission(event);
    setIsSelectEventPermission(true);
    setIsOpen(false);
  }
  return (
    <div>
      <div className="justify-between bg-[#D9D9D9] flex  w-10/12">
        <div className="ml-2">{name} </div>
        <div className="">
          <button
            onClick={() => editButton(event)}
            className={`bg-custom-orange h-[30px] justify-self-end rounded-[5px] `}
          >
            <div className="flex ml-2 gap-2 items-center justify-center">
              <svg
                width="21"
                height="21"
                viewBox="0 0 21 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <svg id="Edit_fill">
                  <path
                    id="Subtract"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.145 9.35497L16.6248 7.87519C16.9368 7.56316 17.0928 7.40715 17.1982 7.25268C17.6624 6.57267 17.6624 5.67771 17.1982 4.99769C17.0928 4.84322 16.9368 4.68721 16.6248 4.37519L16.6248 4.37518L16.6247 4.37516C16.3127 4.06316 16.1567 3.90715 16.0023 3.80172C15.3223 3.33758 14.4273 3.33758 13.7473 3.80172C13.5928 3.90715 13.4368 4.06316 13.1248 4.37519L11.6249 5.87508C12.4636 7.32289 13.6776 8.52761 15.145 9.35497ZM10.1703 7.32963L4.35615 13.1438C3.93109 13.5689 3.71856 13.7814 3.57883 14.0425C3.43909 14.3036 3.38015 14.5983 3.26226 15.1878L2.77186 17.6398C2.70534 17.9724 2.67208 18.1387 2.76668 18.2333C2.86129 18.3279 3.0276 18.2946 3.36021 18.2281L5.81219 17.7377L5.8122 17.7377C6.40164 17.6198 6.69637 17.5609 6.95746 17.4211C7.21856 17.2814 7.43109 17.0689 7.85614 16.6438L7.85615 16.6438L13.6867 10.8133C12.2704 9.9213 11.0708 8.72991 10.1703 7.32963Z"
                    fill="white"
                  />
                </svg>
              </svg>

              <div className="text-white  self-center text-center text-base font-medium mr-2">
                Edit
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
});

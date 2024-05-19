import React, { useState } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function RegistrationForEventModalSmall({
  setVisible,
  userRegistrationFunction,
  setEventsUpdatesFunction,
  setMarketingUpdatesFunction,
}: {
  setVisible: any;
  userRegistrationFunction: any;
  setEventsUpdatesFunction: React.Dispatch<React.SetStateAction<boolean>>;
  setMarketingUpdatesFunction: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const handleBackArrowClick = () => {
    setVisible(false);
  };

  return (
    <div
      style={{
        backgroundColor: "#D9D9D9CC",
      }}
      id="static-modal"
      data-modal-backdrop="static"
      aria-hidden="true"
      className=" overflow-y-auto overflow-x-hidden p-4 fixed  z-50 justify-center items-center w-full inset-0 h-[calc(100%)] max-h-full"
    >
      <div className="border-[1px] border-dashBtnBlue rounded-md bg-white  w-3/5 relative top-[20%] left-[20%]">
        <div className="flex justify-between bg-slate-300">
          <button
            className="text-slate-400 ml-3"
            onClick={handleBackArrowClick}
          >
            <IoMdArrowRoundBack size={25} />
          </button>
        </div>
        <div className="w-full">
          <div className="mx-auto text-center text-xl text-custom-orange my-8">
            Registration For Event
          </div>
          <div className="p-2 grid gap-4">
            <div className="flex gap-4 text-sm">
              <input
                type="checkbox"
                className="content-start flex "
                onChange={(e) => setEventsUpdatesFunction(e.target.checked)}
              />
              get updates on community page via my emails
            </div>

            <div className="flex gap-4 text-sm">
              <input
                type="checkbox"
                className="my-auto"
                onChange={(e) => setMarketingUpdatesFunction(e.target.checked)}
              />
              get marketing updates via emails
            </div>

            <button
              className="bg-custom-orange text-white rounded-md px-4 py-1 mx-auto my-4"
              onClick={userRegistrationFunction}
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

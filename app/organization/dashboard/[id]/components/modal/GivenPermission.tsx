import React, { memo } from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { EventPermission, Modal, useOrg } from "../../OrgContext";
import { AiFillCloseCircle } from "react-icons/ai";
import { RiAddCircleFill } from "react-icons/ri";
// import { Event, Team } from "../../Type";
import { error, success } from "@/util/Toastify";
import { OrgContext } from "@/app/Type";

export default memo(function GivenPermission() {
  const { setModal, modalUserName, team, setTeam, permissionID } =
    useOrg() as OrgContext;

  async function deletePermission() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/permission/deleteUserPermission/${permissionID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      error("Failed to remove permission");
      return;
    }

    const newTeam = team.filter(
      (team) => team.permissionDocumentId !== permissionID
    );

    success("Permission removed successfully");
    setTeam(newTeam);
    setModal("");
  }

  return (
    <>
      <div
        style={{
          backgroundColor: "#d9d9d996",
        }}
        id="static-modal"
        data-modal-backdrop="static"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden p-4 fixed  z-50 justify-center items-center w-full md:inset-0  max-h-full"
      >
        <div className="rounded-md bg-white  w-2/5 relative top-[25%] left-[25%]">
          <div className="mr-4">
            <button
              onClick={() => setModal("")}
              type="button"
              className="text-gray-400 w-full   bg-transparent  rounded-lg text-sm  h-8 ms-auto inline-flex justify-end items-center "
              data-modal-hide="static-modal"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>
          <div className="mb-5    md:p-3 mx-5  items-start w- space-y-4 gap-5 flex flex-col">
            <div className="text-xl	 font-normal">
              Change permissions for {modalUserName}
            </div>
            <div className="flex w-full  justify-between ">
              <button onClick={deletePermission}>
                <div className="flex  rounded-md gap-2 px-3 py-1 items-center bg-custom-orange text-white">
                  <AiFillCloseCircle />
                  <div>Remove</div>
                </div>
              </button>
              <button onClick={() => setModal("allPermission")}>
                <div className="flex rounded-md gap-2 px-3 py-1 items-center bg-custom-orange text-white">
                  <RiAddCircleFill />
                  <div>All Events</div>
                </div>
              </button>
              <button onClick={() => setModal("selectOneEvent")}>
                <div className="flex rounded-md gap-2 px-3 py-1 items-center bg-custom-orange text-white">
                  <RiAddCircleFill />
                  <div>Chose Events</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Confirm Deletion
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      Are you sure you want to delete this item?By clicking
                      "Delete," you will permanently remove the selected data in
                      your account.
                    </p>
                  </div>

                  <div className="mt-4 flex gap-2">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleDelete}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => setIsOpen(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition> */}
    </>
  );
});

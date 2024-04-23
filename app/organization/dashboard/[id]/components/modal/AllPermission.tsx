import React, {
  Dispatch,
  SetStateAction,
  memo,
  useEffect,
  useState,
} from "react";
import { IoMdArrowRoundBack } from "react-icons/io";
import { RiAddCircleFill } from "react-icons/ri";
// import { orgContext } from "./GivenPermission";
import { useOrg } from "../../OrgContext";
import { error, success } from "@/util/Toastify";
import { OrgContext } from "@/app/Type";
import Modal from "@/components/Modal";
import { Dialog } from "@headlessui/react";

type AllPermissionProps = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  handleBackButton: () => void;
};

export default memo(function AllPermission({
  isOpen,
  setIsOpen,
  handleBackButton,
}: AllPermissionProps) {
  const [viewOnlyEvent, setViewOnlyEvent] = useState<boolean>(false);
  const [viewattendees, setViewattendees] = useState<boolean>(false);
  const [manageEvent, setManageEvent] = useState<boolean>(false);
  const [registerAttendees, setRegisterAttendees] = useState<boolean>(false);
  const [markAttendance, setMarkAttendance] = useState<boolean>(false);
  const [managePayments, setManagePayments] = useState<boolean>(false);
  const [manageProfile, setManageProfile] = useState<boolean>(false);
  const [managePayoutDetails, setManagePayoutDetails] =
    useState<boolean>(false);
  const [getReports, setGetReports] = useState<boolean>(false);
  const [mangeHostPage, setMangeHostPage] = useState<boolean>(false);
  const [manageMarketingCampaign, setManageMarketingCampaign] =
    useState<boolean>(false);

  const {
    setModal,
    permissionID,
    globalPermission,
    modalUserName,
    setGlobalPermission,
  } = useOrg() as OrgContext;

  useEffect(() => {
    globalPermission.map((permission) => {
      switch (permission) {
        case "View Only Event":
          setViewOnlyEvent(true);
          break;
        case "View Attendees":
          setViewattendees(true);
          break;
        case "Manage Event":
          setManageEvent(true);
          break;
        case "Register Attendees":
          setRegisterAttendees(true);
          break;
        case "Mark Attendance":
          setMarkAttendance(true);
          break;
        case "Manage Payments":
          setManagePayments(true);
          break;
        case "Manage Profile":
          setManageProfile(true);
          break;
        case "Manage Payout Details":
          setManagePayoutDetails(true);
          break;
        case "Get Reports":
          setGetReports(true);
          break;
        case "Manage Host Page":
          setMangeHostPage(true);
          break;
        case "Manage Marketing Campaign":
          setManageMarketingCampaign(true);
          break;
      }
    });
  }, [permissionID, globalPermission]);

  async function doneButton(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formDataKeys = formData.keys();
    const formDataKeysArray = Array.from(formDataKeys);

    const res = await fetch(
      ` ${process.env.NEXT_PUBLIC_URL}/api/v1/permission/updateGlobalPermission/${permissionID}`,
      { method: "PUT", body: JSON.stringify(formDataKeysArray) }
    );

    console.log(res.ok);

    const dat = await res.json();
    console.log(dat);

    if (!res.ok) {
      error("error for updating permission");
      return;
    }

    success("permission updated");
    setGlobalPermission(formDataKeysArray);
    setModal("");
  }

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
                  <div>Chose Permission</div>
                </div>
              </button>
            </div>
            <form
              onSubmit={doneButton}
              className="flex w-full flex-col gap-3 mt-3"
            >
              <PermissionName
                name="View Only Event"
                checked={viewOnlyEvent}
                setCheck={setViewOnlyEvent}
              />
              <PermissionName
                name="Manage Event"
                checked={manageEvent}
                setCheck={setManageEvent}
              />{" "}
              <PermissionName
                name="View Attendees"
                checked={viewattendees}
                setCheck={setViewattendees}
              />
              <PermissionName
                name="Register Attendees"
                checked={registerAttendees}
                setCheck={setRegisterAttendees}
              />
              <PermissionName
                name="Mark Attendance"
                checked={markAttendance}
                setCheck={setMarkAttendance}
              />
              <PermissionName
                name="Manage Payments"
                checked={managePayments}
                setCheck={setManagePayments}
              />
              <PermissionName
                name="Manage Profile"
                checked={manageProfile}
                setCheck={setManageProfile}
              />
              <PermissionName
                name="Manage Payout Details"
                checked={managePayoutDetails}
                setCheck={setManagePayoutDetails}
              />
              <PermissionName
                name="Get Reports"
                checked={getReports}
                setCheck={setGetReports}
              />
              <PermissionName
                name="Manage Host Page"
                checked={mangeHostPage}
                setCheck={setMangeHostPage}
              />
              <PermissionName
                name="Manage Marketing Campaign"
                checked={manageMarketingCampaign}
                setCheck={setManageMarketingCampaign}
              />
              <div className="flex w-11/12  justify-end  ">
                <button type="submit" className="button">
                  <div className="flex rounded-md gap-2 px-3 py-1 items-center bg-custom-orange text-white">
                    <RiAddCircleFill />
                    <div>Done</div>
                  </div>
                </button>
              </div>
            </form>
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

      {/* <div
        style={{
          backgroundColor: "#D9D9D9CC",
        }}
        id="static-modal"
        data-modal-backdrop="static"
        aria-hidden="true"
        className=" overflow-y-auto overflow-x-hidden p-4 fixed  z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
      >
        <div className="border-[1px] border-custom-orange rounded-md bg-white  w-2/5 relative top-[25%] left-[25%]">
          <div className="mr-4 flex items-center justify-between ">
            <button
              onClick={() => setModal("givenPermission")}
              type="button"
              className="text-gray-400  ml-5 button bg-transparent  rounded-lg text-sm  h-8  "
              data-modal-hide="static-modal"
            >
              <IoMdArrowRoundBack size={20} />
            </button>
            <button>
              <button
                onClick={() => setModal("")}
                type="button"
                className="text-gray-400   button bg-transparent  rounded-lg text-sm  h-8 ms-auto  "
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
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
              </button>
            </button>
          </div>
          <div className="mb-5    md:p-3 mx-5  items-start w- space-y-4 gap-1 flex flex-col">
            <div className="text-xl	 font-normal">
              change permissions for {modalUserName}
            </div>
            <div className="flex w-full  justify-center ">
              <button>
                <div className="flex rounded-md gap-2 px-3 py-1 items-center bg-custom-orange text-white">
                  <RiAddCircleFill />
                  <div>Chose Permission</div>
                </div>
              </button>
            </div>
            <form onSubmit={doneButton} className="flex w-full flex-col gap-3">
              <PermissionName
                name="View Only Event"
                checked={viewOnlyEvent}
                setCheck={setViewOnlyEvent}
              />
              <PermissionName
                name="Manage Event"
                checked={manageEvent}
                setCheck={setManageEvent}
              />{" "}
              <PermissionName
                name="View Attendees"
                checked={viewattendees}
                setCheck={setViewattendees}
              />
              <PermissionName
                name="Register Attendees"
                checked={registerAttendees}
                setCheck={setRegisterAttendees}
              />
              <PermissionName
                name="Mark Attendance"
                checked={markAttendance}
                setCheck={setMarkAttendance}
              />
              <PermissionName
                name="Manage Payments"
                checked={managePayments}
                setCheck={setManagePayments}
              />
              <PermissionName
                name="Manage Profile"
                checked={manageProfile}
                setCheck={setManageProfile}
              />
              <PermissionName
                name="Manage Payout Details"
                checked={managePayoutDetails}
                setCheck={setManagePayoutDetails}
              />
              <PermissionName
                name="Get Reports"
                checked={getReports}
                setCheck={setGetReports}
              />
              <PermissionName
                name="Manage Host Page"
                checked={mangeHostPage}
                setCheck={setMangeHostPage}
              />
              <PermissionName
                name="Manage Marketing Campaign"
                checked={manageMarketingCampaign}
                setCheck={setManageMarketingCampaign}
              />
              <div className="flex w-11/12  justify-end  ">
                <button type="submit" className="button">
                  <div className="flex rounded-md gap-2 px-3 py-1 items-center bg-custom-orange text-white">
                    <RiAddCircleFill />
                    <div>Done</div>
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div> */}
    </>
  );
});

const PermissionName = memo(function PermissionName({
  name,
  checked,
  setCheck,
}: {
  name: string;
  checked: any;
  setCheck: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="bg-[#D9D9D9]  flex justify-between w-10/12">
      <div className="ml-2">{name}</div>
      <div className="flex gap-3 items-center mr-8">
        <input
          checked={checked}
          id="red-checkbox"
          name={name}
          type="checkbox"
          onChange={(e) => setCheck(e.target.checked)}
          className="w-4 h-4 border-black rounded-full	dark:bg-white   focus:ring-0 "
        />
      </div>
    </div>
  );
});

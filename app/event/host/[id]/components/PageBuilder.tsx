"use client";
import Modal from "@/components/Modal";
import { FetchPost } from "@/hooks/useFetch";
import { error, success } from "@/util/Toastify";
import { Dialog } from "@headlessui/react";
import { getSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart, FaRegRegistered } from "react-icons/fa6";
import { IoIosCard } from "react-icons/io";
import ShowTicketsForUserModal from "./ShowTicketsForUserModal";
import TicketModal from "./TicketModal";
import { TicketArray } from "./HostSideBar";
import { Ticket } from "@/app/Type";
import PostTab from "./PostTab";
import Style from "./../../../../../css/pageBuilder.module.css";
interface customUser {
  email: string;
  name: string;
  image: string;
  _id: string;
}

const PageBuilder = ({
  page,
  EventName,
}: {
  page: string;
  EventName: string;
}) => {
  const [activeComponent, setActiveComponent] = useState("CoverPhoto");

  const handleComponentChange = (component: string) => {
    setActiveComponent(component);
  };

  const [activeButton, setActiveButton] = useState<number | null>(1);

  const { id } = useParams();
  const [isRegistered, setIsRegistered] = useState<boolean>(false);
  const [isRemoveRegistation, setIsRemoveRegistation] =
    useState<boolean>(false);
  const [isRegModalShow, setIsRegModalShow] = useState<boolean>(false);

  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);

  const [eventUpdates, setEventUpdates] = useState(false);
  const [marketingUpdates, setMarketingUpdates] = useState(false);

  const [isAddWishList, setIsAddWishList] = useState<boolean>(false);
  const [isRemoveWishListModal, setIsRemoveWishListModal] =
    useState<boolean>(false);
  const [isAddWishListModal, setIsAddWishListModal] = useState<boolean>(false);

  const [isActiveTicketModal, setIsActiveTicketModal] =
    useState<boolean>(false);
  const [isActiveProceedTicketModal, setIsActiveProceedTicketModal] =
    useState<boolean>(false);

  const [allBuyTicketsArrayTemp, setAllBuyTicketsArrayTemp] = useState<
    TicketArray[]
  >([]);
  const [allTicketTypes, setAllTicketTypes] = useState<Ticket[]>([]);
  const [totalTicketPrice, setTotalTicketPrice] = useState<number>(0);

  const handleClick = (buttonNumber: number) => {
    setActiveButton(buttonNumber);
  };

  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      const user = session?.user as customUser;
      setUserId(user._id);
      setEmail(user.email);
    };
    getUser();
  }, [id]);

  useEffect(() => {
    async function getTicketTypes() {
      const res = await fetch(`/api/v1/ticket/getTicket/${id}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();

      setAllTicketTypes(data);
    }
    getTicketTypes();
  }, [id]);

  // registration
  async function removeUserFromRegisteredEvent() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/removeRegisteredUserFromEvent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, eventId: id }),
      }
    );
    if (!res.ok) {
      error("Error registration for event");
      return;
    }

    success("remove user from event successfully");
    setIsRegistered(false);
    setIsRemoveRegistation(false);
  }

  async function userRegistrationForEventHandler() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/registerUserForEvent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          eventId: id,
          sendEventUpdates: eventUpdates,
          sendMarketingUpdates: marketingUpdates,
        }),
      }
    );
    const data = {
      topic: "Registration Alert",
      comment: `You have been registered for ${EventName}`,
      email: email,
    };

    const sendNotification = await FetchPost({
      endpoint: `notification/getAllNotifications`,
      body: data,
    });

    if (sendNotification.message != "Notification created successfully") {
      error("Error registration for event");
      return;
    }
    if (!res.ok) {
      error("Error registration for event");
      return;
    }

    success("registered for event successfully");
    setIsRegistered(true);
    setIsRegModalShow(false);
  }

  // wishlisht

  async function addTowishlistHandler() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/addToWishList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, eventId: id }),
      }
    );
    if (!res.ok) {
      error("Error adding to wishlist");
      return;
    }

    success("Event added to the wishlist ");
    setIsAddWishList(true);
    setIsAddWishListModal(false);
  }

  async function removeFromWishlistHandler() {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/event/removeFromWishList`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: userId, eventId: id }),
      }
    );
    if (!res.ok) {
      error("Error removing from wishlist");
      return;
    }

    success("Event removed from the wishlist ");
    setIsAddWishList(false);
    setIsRemoveWishListModal(false);
  }

  return (
    <div className="   flex justify-between flex-col">
      <div className="">
        {activeComponent === "PostTab" && <PostTab />}
        {activeComponent === "CoverPhoto" && (
          <div className=" ">
            <iframe
              src={page}
              width="100%"
              // height="600px"
              className={`${Style.heightxxl} ${Style.heightxl} ${Style.heightlg} ${Style.heightmd} ${Style.heightsm}   `}
            />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0  bg-slate-400 w-full p-2 ">
        <div className="flex justify-between items-center	">
          <div className="flex gap-4 md:flex-row flex-col ">
            <div className="flex">
              <div>
                {isRegistered ? (
                  <button
                    // disabled={preview ? true : false}
                    onClick={() => setIsRemoveRegistation(true)}
                    className="flex button py-2.5 xl:py-3.5 bg-custom-orange rounded-l-2xl items-center xl:px-4"
                  >
                    <div className="flex py-1 px-2">
                      <div className=" text-white">
                        <FaRegRegistered size={20} />
                      </div>
                      <div className="font-medium xl:text-sm text-white text-left leading-tight xl:ml-4 md:ml-2">
                        Unregister
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    // disabled={preview ? true : false}
                    onClick={() => {
                      setIsRegModalShow(true);
                    }}
                    className={`flex button py-2.5 xl:py-3.5 bg-custom-orange rounded-l-2xl items-center xl:px-4 `}
                  >
                    <div className="flex py-1 px-2 ">
                      <div className=" text-white">
                        <FaRegRegistered size={20} />
                      </div>

                      <div className="font-medium xl:text-md text-white text-left leading-tight xl:ml-4 md:ml-2 mx-auto ">
                        Register
                      </div>
                    </div>
                  </button>
                )}
              </div>
              <div>
                {" "}
                {isAddWishList ? (
                  <button
                    // disabled={preview ? true : false}
                    onClick={() => setIsRemoveWishListModal(true)}
                    // onClick={removeFromWishlistHandler}
                    className="button  xl:h-14 h-12 bg-[#455273] rounded-r-xl items-center xl:px-4 px-2"
                  >
                    <div className="p-1 flex">
                      <div className="text-white">
                        <FaHeart size={20} />
                      </div>
                      <div className="font-medium text-sm text-white text-left leading-tight xl:ml-4 md:ml-2">
                        Remove
                      </div>
                    </div>
                  </button>
                ) : (
                  <button
                    // disabled={preview ? true : false}
                    // onClick={addTowishlistHandler}
                    onClick={() => setIsAddWishListModal(true)}
                    className={`  button  xl:h-14 h-12 bg-[#455273] rounded-r-xl items-center xl:px-4 px-2`}
                  >
                    <div className="flex p-1">
                      <div className=" text-white">
                        <FaRegHeart size={20} />
                      </div>
                      <div className="font-medium md:text-md text-sm  text-white text-left leading-tight xl:ml-4 md:ml-2">
                        Wish List
                      </div>
                    </div>
                  </button>
                )}
              </div>
            </div>
            <div>
              <button
                onClick={() => setIsActiveTicketModal(true)}
                // disabled={preview ? true : false}
                className={`  button w-40  h-12  bg-[#D47151] rounded-xl xl:px-4 px-2 `}
              >
                <div className="flex p-1">
                  <div className="text-white">
                    <IoIosCard size={20} />
                  </div>
                  <div className="font-medium xl:text-md text-sm text-white text-left leading-tight ml-4">
                    Buy tickets
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div>
            <div className="flex md:w-64 xl:h-14 md:h-10 rounded-3xl bg-[#F9EBE9] items-center  ">
              <button
                className={` md:text-sm button font-medium ml-2 w-40 h-8 xl:h-12 rounded-3xl  ${
                  activeButton === 1
                    ? "bg-[#D47151] text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                    : "hover:bg-gray-200 text-[#D47151] bg-[#F9EBE9]"
                }`}
                onClick={() => {
                  if (activeComponent !== "CoverPhoto") {
                    handleComponentChange("CoverPhoto");
                    handleClick(1);
                  }
                }}
              >
                EVENT
              </button>
              <button
                className={` md:text-sm button cursor-pointer font-medium mr-2 w-40 h-8 xl:h-12 rounded-3xl  ${
                  activeButton === 2
                    ? "bg-[#D47151] text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]"
                    : "hover:bg-gray-200 text-[#D47151] bg-[#F9EBE9]"
                }`}
                onClick={() => {
                  if (activeComponent !== "PostTab") {
                    handleComponentChange("PostTab");
                    handleClick(2);
                  }
                }}
              >
                COMMUNITY
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isRemoveRegistation && (
          <Modal
            setIsOpen={setIsRemoveRegistation}
            isOpen={isRemoveRegistation}
          >
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Remove registration
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to remove registration for this event?
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={removeUserFromRegisteredEvent}
              >
                Remove registration
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsRemoveRegistation(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
        {isRegModalShow && (
          <Modal setIsOpen={setIsRegModalShow} isOpen={isRegModalShow}>
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Registration For Event
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                <div className="flex my-auto gap-2 ">
                  <input
                    type="checkbox"
                    className="my-auto"
                    onChange={(e) => setEventUpdates(e.target.checked)}
                  />
                  I want to get updates on community page of the event via my
                  emails
                </div>
                <div className="flex my-auto gap-2">
                  <input
                    type="checkbox"
                    className="my-auto"
                    onChange={(e) => setMarketingUpdates(e.target.checked)}
                  />
                  I want to get marketing updates of the event via emails
                </div>
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={userRegistrationForEventHandler}
              >
                Register
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsRegModalShow(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}

        {isAddWishListModal && (
          <Modal setIsOpen={setIsAddWishListModal} isOpen={isAddWishListModal}>
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Add to wishlist
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to add this event to your wishlist?
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={addTowishlistHandler}
              >
                Add to wishlist
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsAddWishListModal(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
        {isRemoveWishListModal && (
          <Modal
            setIsOpen={setIsRemoveWishListModal}
            isOpen={isRemoveWishListModal}
          >
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900"
            >
              Remove from wishlist
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to remove this event from your wishlist?
              </p>
            </div>

            <div className="mt-4 flex gap-2">
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={removeFromWishlistHandler}
              >
                Remove from wishlist
              </button>
              <button
                type="button"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                onClick={() => setIsRemoveWishListModal(false)}
              >
                Cancel
              </button>
            </div>
          </Modal>
        )}
        {isActiveTicketModal && (
          <ShowTicketsForUserModal
            totalPrice={totalTicketPrice}
            setTotalPrice={setTotalTicketPrice}
            setIsActiveTicketModal={setIsActiveTicketModal}
            setIsActiveProceedTicketModal={setIsActiveProceedTicketModal}
            ticketArrayTemp={allBuyTicketsArrayTemp}
            setTicketArrayTemp={setAllBuyTicketsArrayTemp}
            ticketTypes={allTicketTypes}
            isActiveTicketModal={isActiveTicketModal}
          />
        )}
        {isActiveProceedTicketModal && (
          <TicketModal
            isActiveProceedTicketModal={isActiveProceedTicketModal}
            setIsActvieTicketModal={setIsActiveTicketModal}
            setTicketArrayTemp={setAllBuyTicketsArrayTemp}
            setIsActiveTicketModal={setIsActiveTicketModal}
            totalPrice={totalTicketPrice}
            setTotalPrice={setTotalTicketPrice}
            ticketTypes={allTicketTypes}
            ticketArrayTemp={allBuyTicketsArrayTemp}
            setIsActiveProceedTicketModal={setIsActiveProceedTicketModal}
          />
        )}
      </div>
    </div>
  );
};

export default PageBuilder;

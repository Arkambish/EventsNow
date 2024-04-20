"use client";
import React, { useEffect, useState } from "react";
import { FaRegRegistered } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { IoIosCard } from "react-icons/io";
import { IoLocation } from "react-icons/io5";
import { SlCalender } from "react-icons/sl";
import { IoIosTime } from "react-icons/io";
import { FaRegHeart } from "react-icons/fa";


import Image from "next/image";
import PostTab from "./PostTab";
import CoverPhoto from "./CoverPhoto";
import { getSession } from "next-auth/react";
import { useParams } from "next/navigation";
import { error, success } from "@/util/Toastify";
import { Session } from "inspector";
import { useLocalizedStringDictionary } from "@react-aria/i18n";
import { get, set } from "lodash";
import { is } from "date-fns/locale";
import PaymentModal from "@/components/PaymentModal";
import TicketModal from "./TicketModal";
import ShowTicketsForUserModal from "@/app/event/host/[id]/components/ShowTicketsForUserModal";
import RegistrationForEventModal from "./RegistrationForEventModal";
import Modal from "@/components/Modal";
import { Dialog } from "@headlessui/react";

interface HostSideBar {
  EventName: String;
  Location: String;
  Time: String;
  Date: String;
  preview?: boolean;
  activeComponent: string; // Add prop for active component
  handleComponentChange: (component: string) => void; // Add prop for handling component change
}
type Ticket = {
  _id: string;
  eventId: string;
  price: number;
  classType: string;
  image: string;
};

interface customUser {
  email: string;
  name: string;
  image: string;
  _id: string;
}

export type TicketArray = {
  typeId: string;
  type: string;
};

export default function HostSideBar({
  EventName,
  Location,
  Time,
  Date,
  activeComponent,
  preview = false,
  handleComponentChange,
}: HostSideBar) {
  const [isRemoveWishListModal, setIsRemoveWishListModal] =
    useState<boolean>(false);
  const [isAddWishListModal, setIsAddWishListModal] = useState<boolean>(false);
  const [isRegModalShow, setIsRegModalShow] = useState<boolean>(false);

  const [isRemoveRegistation, setIsRemoveRegistation] =
    useState<boolean>(false);

  console.log(isRemoveRegistation);

  const [eventUpdates, setEventUpdates] = useState(false);
  const [marketingUpdates, setMarketingUpdates] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [registeredUserList, setRegisteredUserList] = useState<string[] | null>(
    null
  );

  const [isActiveTicketModal, setIsActiveTicketModal] =
    useState<boolean>(false);
  const [isActiveProceedTicketModal, setIsActiveProceedTicketModal] =
    useState<boolean>(false);
  function buyTckets() {}

  const [isRegistered, setIsRegistered] = useState<boolean>(false);

  const [isAddWishList, setIsAddWishList] = useState<boolean>(false);

  const handleClick = (buttonNumber: number) => {
    setActiveButton(buttonNumber);
  };

  const id = useParams<{ id: string }>().id;
  const [allBuyTicketsArrayTemp, setAllBuyTicketsArrayTemp] = useState<
    TicketArray[]
  >([]);
  const [allTicketTypes, setAllTicketTypes] = useState<Ticket[]>([]);
  const [totalTicketPrice, setTotalTicketPrice] = useState<number>(0);
  const params = useParams<{ id: string }>();

  useEffect(() => {
    async function getTicketTypes() {
      const res = await fetch(`/api/v1/ticket/getTicket/${params.id}`);
      if (!res.ok) {
        return;
      }
      const data = await res.json();
      setAllTicketTypes(data);
    }
    getTicketTypes();
  }, [params.id]);

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
    if (!res.ok) {
      error("Error registration for event");
      return;
    }

    success("registered for event successfully");
    setIsRegistered(true);
    setIsRegModalShow(false);
  }

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

  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      const user = session?.user as customUser;
      setUserId(user._id);
      setEmail(user.email);
    };
    getUser();
  }, [id]);

  //check user registered for the event
  useEffect(() => {
    const checkUserRegistered = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/event/checkUserRegistered`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId: userId, eventId: id }),
        }
      );
      if (!res.ok) {
        error("Error checking user registration");
        return;
      }
      const data = await res.json();
      setIsRegistered(data);
    };
    checkUserRegistered();
  }, [id, userId]);

  //get user data
  useEffect(() => {
    const getUser = async () => {
      if (userId) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/user/getWishlistByIdForHost`,
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(userId),
          }
        );
        const data = await res.json();

        const wishlistStatus = data?.includes(id || "");
        setIsAddWishList(wishlistStatus);
      }
    };
    getUser();
  }, [id, userId, isAddWishList]);

  // add to wishlist

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

  //remove from wishlist

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
    <div className="xl:w-96  bg-white items-end md:w-80">
      <div className=' text-center text-[#454545cc] md:text-4xl xl:text-5xl sm:text-xl font-normal xl:pt-16 md:pt-10 font-["Roboto"]'>
        {EventName}
      </div>

      <div className="flex md:w-64 xl:h-14 md:h-10 rounded-3xl bg-[#F9EBE9] items-center xl:mx-16 md:mx-8 xl:my-12 md:my-8 ">
        <button
          className={` md:text-sm  font-medium ml-2 w-40 h-8 xl:h-12 rounded-3xl  ${
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

      <div className="text-left xl:ml-12 md:ml-8 text-[#455273] xl:text-3xl md:text-2xl font-bold xl:mt-16 ">
        QUICK FACTS
      </div>

      <div className="grid grid-rows-3 gap-6 xl:ml-12 md:ml-8 text-left mt-8">
        <div>
          <div className="text-[#AC736D] ">
            <IoLocation size={30}/>
          </div>
          <div className="text-[#353C4E] xl:text-2xl md:text-xl  align-top -mt-8 font-['Roboto'] ml-12">
            {Location}
          </div>
        </div>

        <div>
          <div className="text-[#AC736D]">
          <SlCalender size={25}/>
          </div>
          <div className="text-[#353C4E] xl:text-2xl  md:text-xl font-['Roboto'] align-top -mt-8 ml-12">
            {Date}
          </div>
        </div>

        <div>
          <div className="text-[#AC736D]">
          <IoIosTime size={25}/>
          </div>
          <div className="text-[#353C4E] xl:text-2xl  md:text-xl  font-['Roboto'] align-top -mt-8 ml-12">
            {Time}
          </div>
        </div>

        <div className="flex xl:pt-12 md:pt-14 items-center ">
          {isRegistered ? (
            <button
              disabled={preview ? true : false}

              onClick={() => setIsRemoveRegistation(true)}
              className="flex button xl:w-36 w-32 xl:h-16 h-12 bg-custom-orange rounded-l-2xl items-center xl:px-4"

            >
              <div className="flex p-1">
              <div className=" text-white">           
                  <FaRegRegistered size={20}/>              
               </div>
              <div className="font-medium xl:text-sm text-white text-left leading-tight xl:ml-4 md:ml-2">
                Unregister
              </div>
              </div>
            </button>
          ) : (
            <button
              disabled={preview ? true : false}

              onClick={() => {
                setIsRegModalShow(true);
              }}
              className={`flex button xl:w-36 w-32 xl:h-16 h-12  bg-custom-orange rounded-l-2xl items-center xl:px-4 ${

                preview ? "cursor-not-allowed" : ""
              } `}
            >
              <div className="flex p-1 ">
              <div className=" text-white">            
                <FaRegRegistered size={20}/>               
              </div>

              <div className="font-medium xl:text-md text-white text-left leading-tight xl:ml-4 md:ml-2 mx-auto">
                Register
              </div>
              </div>
            </button>
          )}

          {/* Registration Modal */}
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

          {isAddWishList ? (
            <button
              disabled={preview ? true : false}

              onClick={() => setIsRemoveWishListModal(true)}
              // onClick={removeFromWishlistHandler}
              className="flex button xl:w-36 w-32 xl:h-16 h-12 bg-[#455273] rounded-r-2xl items-center xl:px-4"

            >
              <div className="p-1 flex">
              <div className="text-white">
              <FaHeart size={20}/>
              </div>
              <div className="font-medium text-sm text-white text-left leading-tight xl:ml-4 md:ml-2">
                Remove
              </div>
              </div>
            </button>
          ) : (
            <button
              disabled={preview ? true : false}
              // onClick={addTowishlistHandler}
              onClick={() => setIsAddWishListModal(true)}
              className={`${
                preview ? "cursor-not-allowed" : ""
              }  button  xl:h-14 h-12 bg-[#455273] rounded-r-xl items-center xl:px-4 px-2`}
            >
              <div className="flex p-1">
              <div className=" text-white">
              <FaRegHeart size={20}/>
              </div>
              <div className="font-medium md:text-md text-sm  text-white text-left leading-tight xl:ml-4 md:ml-2">
                Wish List
              </div>
              </div>
            </button>
          )}
        </div>

        <button
          onClick={() => setIsActiveTicketModal(true)}
          disabled={preview ? true : false}
          className={`  button w-40  h-12  bg-[#D47151] rounded-xl xl:px-4 px-2 ${
            preview ? "cursor-not-allowed" : ""
          } `}
        >
          <div className="flex p-1">
          <div className="text-white">
            <IoIosCard size={20}/>
          </div>
          <div className="font-medium xl:text-md text-sm text-white text-left leading-tight ml-4">
            Buy tickets
          </div>
          </div>
        </button>
        {isActiveTicketModal && (
          <ShowTicketsForUserModal
            totalPrice={totalTicketPrice}
            setTotalPrice={setTotalTicketPrice}
            setIsActiveTicketModal={setIsActiveTicketModal}
            setIsActiveProceedTicketModal={setIsActiveProceedTicketModal}
            ticketArrayTemp={allBuyTicketsArrayTemp}
            setTicketArrayTemp={setAllBuyTicketsArrayTemp}
            ticketTypes={allTicketTypes}
          />
        )}
        {isActiveProceedTicketModal && (
          <TicketModal
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

        {/* <PaymentModal
          item={paymentDetails?.items}
          orderId={paymentDetails?.oder_id}
          amount={paymentDetails.fullAmount}
          currency={paymentDetails?.currency}
          first_name={paymentDetails?.first_name}
          last_name={paymentDetails?.last_name}
          email={paymentDetails?.email}
          phone={paymentDetails?.phone}
          address={paymentDetails?.address}
          city={paymentDetails?.city}
          country={paymentDetails?.country}
        /> */}
      </div>
    </div>
  );
}

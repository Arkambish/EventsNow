import Modal from "@/components/Modal";
import { FetchPost } from "@/hooks/useFetch";
import { success, error } from "@/util/Toastify";
import { Dialog } from "@headlessui/react";
import { getSession } from "next-auth/react";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaTicketAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaRegistered } from "react-icons/fa6";
import ShowTicketsForUserModal from "../components/ShowTicketsForUserModal";
import TicketModal from "../components/TicketModal";
import {
  EventContextType,
  UseEventContext,
} from "@/app/event/dashboard/[id]/EventDashContext";
interface HostSideBar {
  EventName: String;
  Location: String;
  Time: String;
  Date: String;
  preview?: boolean;
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
const Buttons = ({
  EventName,
  Location,
  Time,
  Date,
  preview = false,
}: HostSideBar) => {
  const { allTickets } = UseEventContext() as EventContextType;
  const [isRemoveWishListModal, setIsRemoveWishListModal] =
    useState<boolean>(false);
  const [isAddWishListModal, setIsAddWishListModal] = useState<boolean>(false);
  const [isRegModalShow, setIsRegModalShow] = useState<boolean>(false);

  const [isRemoveRegistation, setIsRemoveRegistation] =
    useState<boolean>(false);

  const [eventUpdates, setEventUpdates] = useState(false);
  const [marketingUpdates, setMarketingUpdates] = useState(false);
  const [activeButton, setActiveButton] = useState<number | null>(1);
  const [userId, setUserId] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [registeredUserList, setRegisteredUserList] = useState<string[] | null>(
    null
  );
  const router = useRouter(); 

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
      setUserId(user?._id);
      setEmail(user?.email);
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
    <div className=" space-x-6 container mx-auto px-4">
      <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0 my-4">
        {isRegistered ? (
          <button
            disabled={preview}
            onClick={() => setIsRemoveRegistation(true)}
            className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-full"
          >
            <div className="flex items-center space-x-2">
              <FaRegistered size={23} />
              <span className="font-medium xl:text-md text-left leading-tight">
                Unregister
              </span>
            </div>
          </button>
        ) : (
          <button
            disabled={preview}
            onClick={() => {
              if(!userId){
                router.push("/auth/login");
                return;
              }
              setIsRegModalShow(true)}}
            className={`bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-full ${
              preview ? "cursor-not-allowed" : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              <FaRegistered size={23} />
              <span className="font-medium xl:text-md text-left leading-tight">
                Register
              </span>
            </div>
          </button>
        )}

        {isAddWishList ? (
          <button
            disabled={preview}
            onClick={() => setIsRemoveWishListModal(true)}
            className="bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-full"
          >
            <div className="flex items-center space-x-2">
              <FaHeart size={21} />
              <span className="font-medium text-sm text-left leading-tight">
                Remove
              </span>
            </div>
          </button>
        ) : (
          <button
            disabled={preview}
            onClick={() => {
              if(!userId){
                router.push("/auth/login");
                return;
              }
              setIsAddWishListModal(true)}}
            className={`bg-gray-800 hover:bg-gray-700 text-white py-2 px-6 rounded-full ${
              preview ? "cursor-not-allowed" : ""
            }`}
          >
            <div className="flex items-center space-x-2">
              <FaRegHeart size={21} />
              <span className="font-medium text-sm text-left leading-tight">
                Wish List
              </span>
            </div>
          </button>
        )}


        {/* {allTickets && allTickets.length > 0 && ( */}
        <button
          onClick={() => {
              if(!userId){
                router.push("/auth/login");
                return;
              }
              setIsActiveTicketModal(true)}}

          disabled={preview}
          className={`bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-full ${
            preview ? "cursor-not-allowed" : ""
          }`}
        >
          <div className="flex items-center space-x-2">
            <FaTicketAlt size={23} />
            <span className="font-medium xl:text-md text-left leading-tight">
              Buy tickets
            </span>
          </div>
        </button>
        {/* )} */}

      </div>

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
        <Modal setIsOpen={setIsRemoveRegistation} isOpen={isRemoveRegistation}>
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
  );
};

export default Buttons;

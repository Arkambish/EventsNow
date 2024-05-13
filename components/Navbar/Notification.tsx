"use client";
import { FetchGet } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { GoDotFill } from "react-icons/go";
import NotificationButton from "./NotificationButton";
import { NotificationType } from "./NavBar";
import { MdNotifications } from "react-icons/md";
import NotificationNotFound from "./NotificationNotFound";
interface notificationty {
  comment: string;
  recieverId: string;
  topic: string;
  _id: string;
  isClicked: boolean;
  createdAt: string;
}
function Notification({
  notification,
  setNotification,
}: {
  setNotification: React.Dispatch<React.SetStateAction<NotificationType[]>>;
  notification: notificationty[];
}) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notify, setnotify] = useState(true);
  const [notificationExists, setNotificationExists] = useState<boolean>(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    if (!notification) return;
    notification.filter((data) => {
      if (data.isClicked) setNotificationExists(true);
    });
  }, [notification]);

  if (!notification) return;
  return (
    <div>
      <div className="flex justify-center ">
        <div className="relative max-h-80">
          <button
            onClick={toggleDropdown}
            className="relative z-10 block rounded-md  p-1 focus:outline-none hover:opacity-85"
          >
            <MdNotifications size={23} className=" text-eventBrown" />

            {/* {notificationExists && (
              <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-600 animate-pulse  rounded-full -top-2 -end-3 "></div>
            )}{" "} */}
          </button>

          {dropdownOpen && (
            <div
              onClick={toggleDropdown}
              className="fixed inset-0 h-full w-full z-10"
            ></div>
          )}

          {dropdownOpen && (
            <div
              // className="absolute right-0 mt-2 h-[300px]  bg-gray-800 rounded-md shadow-lg  max-h-80  z-20 overflow-y-auto  overflow-x-hidden scroll-mx-0 scroll-smooth scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"

              className="absolute right-0 mt-2 h-[300px]  bg-gray-800 rounded-md shadow-lg  max-h-80  z-20 overflow-y-scroll  overflow-x-hidden scroll-mx-0 scroll-smooth scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200"
              style={{ width: 300 }}
            >
              <div className="sticky top-0 z-10">
                <div className="bg-gray-700 text-base text-white font-khand w-full py-2 px-5">
                  Notifications
                </div>
              </div>
              {notification.length > 0 ? (
                notification.map((n: notificationty) => (
                  <NotificationButton
                    key={n._id}
                    comment={n.comment}
                    topic={n.topic}
                    isClicked={n.isClicked}
                    createdAt={""}
                    _id={n._id}
                    setNotification={setNotification}
                  />
                ))
              ) : (
                <NotificationNotFound />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;

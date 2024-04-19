"use client";
import { FetchGet } from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";

function Notification(orgId: any) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(() => {
    const sendNotification = async () => {
      const data = FetchGet({
        endpoint: `notification/getNotification/${orgId}`,
      });
    };
  }, []);

  return (
    <div>
      <div className="flex justify-center">
        <div className="relative ">
          <button
            onClick={toggleDropdown}
            className="relative z-10 block rounded-md bg-custom-orange p-2 focus:outline-none"
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="white"
              viewBox="0 0 20 16"
            >
              <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
              <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
            </svg>
            <div className="absolute inline-flex items-center justify-center w-6 h-4 text-xs font-bold text-white bg-red-600  rounded-full -top-2 -end-3 ">
              2
            </div>
          </button>

          {dropdownOpen && (
            <div
              onClick={toggleDropdown}
              className="fixed inset-0 h-full w-full z-10"
            ></div>
          )}

          {dropdownOpen && (
            <div
              className="absolute right-0 mt-2  bg-gray-700 rounded-md shadow-lg overflow-hidden z-20"
              style={{ width: 300 }}
            >
              <div className="py-2">
                <h2 className=" text-white m-2">Notifications</h2>
                <a
                  href="#"
                  className="flex items-center px-4 py-3 border-b hover:bg-black      -mx-2"
                >
                  <p className="text-white text-sm mx-2">
                    <span className="font-bold">Sara Salah</span> replied on the{" "}
                    <span className="font-bold text-white">
                      Upload Image width={} height={}
                    </span>{" "}
                    article . 2m
                  </p>
                </a>
                {/* Add similar entries for other notifications */}
              </div>
              <div className="py-2">
                <a
                  href="#"
                  className="flex items-center px-4 py-3 border-b hover:bg-black      -mx-2"
                >
                  <img
                    width={50}
                    height={50}
                    className="h-8 w-8 rounded-full object-cover mx-1"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    alt="avatar"
                  />
                  <p className="text-white text-sm mx-2">
                    <span className="font-bold">Sara Salah</span> replied on the{" "}
                    <span className="font-bold text-white">
                      Upload Image width={} height={}
                    </span>{" "}
                    article . 2m
                  </p>
                </a>
                {/* Add similar entries for other notifications */}
              </div>
              <div className="py-2">
                <a
                  href="#"
                  className="flex items-center px-4 py-3 border-b hover:bg-black      -mx-2"
                >
                  <img
                    width={50}
                    height={50}
                    className="h-8 w-8 rounded-full object-cover mx-1"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    alt="avatar"
                  />
                  <p className="text-white text-sm mx-2">
                    <span className="font-bold">Sara Salah</span> replied on the{" "}
                    <span className="font-bold text-white">
                      Upload Image width={} height={}
                    </span>{" "}
                    article . 2m
                  </p>
                </a>
                {/* Add similar entries for other notifications */}
              </div>
              <div className="py-2">
                <a
                  href="#"
                  className="flex items-center px-4 py-3 border-b  hover:bg-black     -mx-2"
                >
                  <img
                    width={50}
                    height={50}
                    className="h-8 w-8 rounded-full object-cover mx-1"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    alt="avatar"
                  />
                  <p className="text-white text-sm mx-2">
                    <span className="font-bold">Sara Salah</span> replied on the{" "}
                    <span className="font-bold text-white">
                      Upload Image width={} height={}
                    </span>{" "}
                    article . 2m
                  </p>
                </a>
                {/* Add similar entries for other notifications */}
              </div>
              <div className="py-2">
                <a
                  href="#"
                  className="flex items-center px-4 py-3 border-b   hover:bg-black    -mx-2"
                >
                  <img
                    width={50}
                    height={50}
                    className="h-8 w-8 rounded-full object-cover mx-1"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80"
                    alt="avatar"
                  />
                  <p className="text-white text-sm mx-2">
                    <span className="font-bold">Sara Salah</span> replied on the{" "}
                    <span className="font-bold text-white">
                      Upload Image width={} height={}
                    </span>{" "}
                    article . 2m
                  </p>
                </a>
                {/* Add similar entries for other notifications */}
              </div>
              <a
                href="#"
                className="block bg-custom-orange text-white text-center font-semibold py-1"
              >
                See all notifications
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Notification;

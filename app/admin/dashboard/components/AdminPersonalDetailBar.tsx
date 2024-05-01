import React, { useState } from "react";
import Modal from "@/components/Modal";
import BlacklistModalContent from "./modals/BlacklistModal";
import MakeAdminModalContent from "./modals/MakeAdminModal";
import Image from "next/image";
import { UserType } from "@/app/Type";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { success } from "@/util/Toastify";
import { error } from "@/util/Toastify";

interface PresonDetailsBar {
  name: string;
  email: string;
  userId: String;
  role: String;
  setUser: React.Dispatch<React.SetStateAction<UserType[]>>;
}

export default function AdminPersonDetailsBar({
  name,
  email,
  userId,
  role,
  setUser,
}: PresonDetailsBar) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [showMakeAdminModal, setMakeAdminModal] = useState(false);
  const adminUser = async () => {
    try {
      const makeAdminRes = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/makeAdmin`,
        {
          method: "PUT",
          body: JSON.stringify({ id: userId }),
        }
      );

      if (!makeAdminRes.ok) {
        error("Failed to make user an admin");
        return;
      }

      success("User is now an admin");
      setMakeAdminModal(false);
      setUser((user: UserType[]) => {
        const userChangers = user.map((user: UserType) => {
          if (user._id === userId) {
            user.role = "admin";
          }
          return user;
        });
        return userChangers;
      });
    } catch (error) {
      console.error("Error make admin user:", error);
    }
  };
  const blacklistUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/app/api/v1/blacklist/${userId}`,
        {
          method: "POST",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to blacklist user");
      }

      const data = await response.json();
    } catch (error) {
      console.error("Error blacklisting user:", error);
    }
  };

  return (
    <div>
      <div
        className={`${
          role === "admin" ? "bg-custom-orange " : "bg-[#D9D9D9]"
        } my-2 sm:my-4 border-2  justify-between ms-4 sm:ms-4 mt-6  w-full      col-span-2 grid grid-cols-12  rounded-[5px] mb-2 shadow-3xl overflow-x-hidden`}
      >
        <div className="text-base font-light lg:col-span-3  hidden lg:flex ms-2">
          {name}
        </div>
        <div className="text-base font-light lg:col-span-5 col-span-8	mr-2 md:mb-0 mb-1 ms-2 md:ms-2 lg:ms-0 flex ">
          {email}
        </div>

        <div className="col-span-4  flex gap-2 ">
          {role !== "admin" && (
            <>
              <button
                onClick={() => {
                  setMakeAdminModal(true);
                  setIsOpen(true);
                }}
                className={`bg-custom-blue h-[34px]  rounded-[5px] w-20 md:w-32 xl:w-44  shadow-3xl`}
              >
                <div className="flex justify-around pl-1">
                  <div className="lg:hidden xl:grid grid">
                    <Image
                      src={"/images/admin/Info_fill.png"}
                      width={25}
                      height={25}
                      alt="cancel"
                    />
                  </div>
                  <div className="text-white  self-center text-center text-base font-medium mr-2 hidden lg:flex ">
                    Make admin
                  </div>
                </div>
              </button>
              <button
                onClick={() => {
                  setShowBlacklistModal(true);
                  setIsOpen(true);
                }}
                className={`bg-custom-green h-[34px]  rounded-[5px] w-20 md:w-32 xl:w-44  shadow-3xl `}
              >
                <div className="flex justify-around pl-1">
                  <div className="lg:hidden xl:grid grid">
                    <Image
                      src={"/images/admin/Cancel_fill.png"}
                      width={25}
                      height={25}
                      alt="cancel"
                    />
                  </div>
                  <div className="text-white  self-center text-center text-base font-medium xl:mr-2 hidden lg:flex ">
                    Block user
                  </div>
                </div>
              </button>
            </>
          )}

          {/* {role === "admin" && (
            <>
              <div className="">
                <button className="bg-custom-blue  h-[34px] rounded-[5px]  w-[3.9rem] sm:w-[5.4rem] md:w-[7.3rem] xl:w-36 shadow-3xl ">
                  <div className="flex justify-around pl-1">
                    <div className="lg:hidden xl:grid grid">
                      <Image
                        src={"/images/admin/Info_fill.png"}
                        width={25}
                        height={25}
                        alt="cancel"
                      />
                    </div>
                    <div className="text-white  self-center text-center text-base font-medium xl:mr-6 hidden lg:flex ">
                      Admin
                    </div>
                  </div>
                </button>
              </div>
            </>
          )} */}
        </div>
      </div>

      {showBlacklistModal && (
        <div>
          {" "}
          {isOpen && (
            <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Confirm Blacklisting user
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to Blacklist this user? This action is
                  irreversible.
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={blacklistUser}
                >
                  Add to blacklist
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          )}
        </div>
      )}

      {showMakeAdminModal && (
        <div>
          {" "}
          {isOpen && (
            <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Confirm Make Admin user
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to make this user as admin? This action
                  is irreversible.
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={adminUser}
                >
                  Make admin
                </button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </Modal>
          )}
        </div>
      )}
    </div>
  );
}

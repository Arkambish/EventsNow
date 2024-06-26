import React, { useState, Fragment } from "react";
import Modal from "@/components/Modal";
import BlacklistModalContent from "./modals/BlacklistModal";
import MakeAdminModalContent from "./modals/MakeAdminModal";
import Image from "next/image";
import { UserType } from "@/app/Type";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { success } from "@/util/Toastify";
import { error } from "@/util/Toastify";
import { HiOutlineDotsVertical } from "react-icons/hi";

interface PresonDetailsBar {
  name: string;
  email: string;
  userId: String;
  role: String;
  isBlocked: boolean;
  setUser: React.Dispatch<React.SetStateAction<UserType[]>>;
}

export default function AdminPersonDetailsBar({
  name,
  email,
  userId,
  role,
  isBlocked,
  setUser,
}: PresonDetailsBar) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showBlacklistModal, setShowBlacklistModal] = useState(false);
  const [showMakeAdminModal, setMakeAdminModal] = useState(false);
  const [showUnblockingUserModal, setShowUnblockingUserModal] = useState(false);
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
        `${process.env.NEXT_PUBLIC_URL}/api/v1/user/blockUser`,
        {
          method: "PUT",
          body: JSON.stringify({ id: userId }),
        }
      );
      console.log(response);

      if (!response.ok) {
        error("Failed to add user to the blacklist");
        return;
      }
      success("User added to the blacklist");
      setShowBlacklistModal(false);

      setUser((user: UserType[]) => {
        const userChangers = user.map((user: UserType) => {
          if (user._id === userId) {
            user.isBlocked = true;
          }
          return user;
        });
        return userChangers;
      });
    } catch (error) {
      console.error("Error blacklisting user:", error);
    }
  };
  const unblockUser = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/user/unblockUser`,
        {
          method: "PUT",
          body: JSON.stringify({ id: userId }),
        }
      );
      console.log(response);

      if (!response.ok) {
        error("Failed to unblock user");
        return;
      }
      success("User unblocked");
      setShowUnblockingUserModal(false);

      setUser((user: UserType[]) => {
        const userChangers = user.map((user: UserType) => {
          if (user._id === userId) {
            user.isBlocked = false;
          }
          return user;
        });
        return userChangers;
      });
    } catch (error) {
      console.error("Error unblocking user:", error);
    }
  }

  return (
    <div>
      <div
        className={`${
          role === "admin" ? " bg-slate-500 text-white" :(
            isBlocked?"bg-red-400": "bg-white")
        } my-2 sm:my-4 border-2  justify-between ms-4 sm:ms-4 mt-6      col-span-2 grid grid-cols-12  rounded-[5px] mb-2  h-8`}
      >
        <div className="text-base font-light lg:col-span-3  hidden lg:flex ms-2">
          {name}
        </div>
        <div className="text-base font-light lg:col-span-5 col-span-8	mr-2 md:mb-0 mb-1 ms-2 md:ms-2 lg:ms-0 flex ">
          {email}
        </div>

        <div className="col-span-4  flex gap-2 ">
          {role !== "admin" && (
            <Menu
              as="div"
              className="relative inline-block text-left  content-center"
            >
              <div className="flex content-center">
                <Menu.Button className="inline-flex w-full justify-center rounded-full    text-xl font-medium text-black hover:bg-slate-100 focus:outline-none">
                  <HiOutlineDotsVertical />
                </Menu.Button>
              </div>
              <div className="absolute top-1 left-5">
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className=" mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none font-Inter font-semibold">
                  {isBlocked ? <div className="px-1 py-1 ">
                      <Menu.Item>
                        <button
                          onClick={() => {
                            setShowUnblockingUserModal(true);
                            setIsOpen(true);
                          }}
                          className={`group flex w-full text-stone-600 gap-3 hover:bg-slate-100 items-center rounded-md px-2 py-2 text-sm `}
                        >
                          remove from blocklist
                        </button>
                      </Menu.Item>

                      
                    </div>:
                  <div className="px-1 py-1 ">
                  <Menu.Item>
                    <button
                      onClick={() => {
                        setMakeAdminModal(true);
                        setIsOpen(true);
                      }}
                      className={`group flex w-full text-stone-600 gap-3 hover:bg-slate-100 items-center rounded-md px-2 py-2 text-sm `}
                    >
                      Make admin
                    </button>
                  </Menu.Item>

                  <Menu.Item>
                    <button
                      onClick={() => {
                        setShowBlacklistModal(true);
                        setIsOpen(true);
                      }}
                      className={` group flex w-full text-stone-600 gap-3 hover:bg-slate-100 items-center rounded-md px-2 py-2 text-sm `}
                    >
                      Block user
                    </button>
                  </Menu.Item>
                </div>}
                    
                  </Menu.Items>
                </Transition>
              </div>
            </Menu>

          )}

          
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


{showUnblockingUserModal && (
        <div>
          {" "}
          {isOpen && (
            <Modal setIsOpen={setIsOpen} isOpen={isOpen}>
              <Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-900"
              >
                Confirm Unblock user
              </Dialog.Title>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to unblock this user?
                </p>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                  onClick={unblockUser}
                >
                  Unblock
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

import React, { memo, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import Image from "next/image";
import Link from "next/link";
import { Item, OrganizationProps } from "./NavBar";
import Login from "../Login";
import { MdContactless } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { RiLoginCircleFill } from "react-icons/ri";
import { FaLock } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import { UserType } from "@/app/Type";
import { HiOutlineHome, HiOutlineLogout, HiOutlineUser } from "react-icons/hi";
import {
  HiOutlineEyeSlash,
  HiOutlineQueueList,
  HiOutlineWallet,
  HiOutlineWindow,
} from "react-icons/hi2";
import { useAuth } from "@/app/AuthContext";
// import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";
// import { HiOutlineArrowRightStartOnRectangle } from "react-icons/hi2";

interface props {
  isMenuOpen: boolean;
  userActive: boolean;
  setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clickLogoutBtn: () => void;
  user: UserType;
}

type Organization = {
  organization: OrganizationProps[];
};

const ResponsiveMenuBar = memo(function ResponsiveMenuBar({
  isMenuOpen,
  clickLogoutBtn,
  userActive,
  user,
  setIsMenuOpen,
}: props) {
  const menuBarRef = useRef<HTMLDivElement>(null);
  const { organization } = useAuth() as unknown as Organization;
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuBarRef.current &&
        !menuBarRef.current.contains(event.target as Node)
      ) {
        // Clicked outside of modal, so close it
        setIsMenuOpen(false);
      }
    };

    // Add event listener when the modal is open
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when the modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <div
      className={
        isMenuOpen
          ? "fixed shadow-2xl  right-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0fc] p-5 ease-in duration-50"
          : "fixed left-[100%] top-0 p-10 ease-in duration-50"
      }
      ref={menuBarRef}
    >
      <div
        className={`w-full ${
          userActive ? "hidden" : "block"
        } flex items-center justify-end `}
      >
        <div onClick={() => setIsMenuOpen(false)} className="cursor-pointer ">
          <IoMdClose size={20} />
        </div>
      </div>
      {/* <div
        onClick={() => setIsMenuOpen(false)}
        className="cursor-pointer flex justify-end "
      >
        <IoMdClose size={25} />
      </div> */}
      <div className="flex flex-col ">
        {userActive && (
          <div className="w-100  overflow-hidden">
            <div className="flex responsive-navbar-profile overflow-auto gap-3 mt-5">
              {/* <Link href={`/profile/${user._id}`}> */}
              <Image
                src={user.image}
                alt="profile picture"
                width={40}
                height={10}
                className="rounded-full w-auto h-auto"
              />
              {/* </Link> */}
              <div className="flex flex-col">
                <div className="font-bold capitalize">
                  {user.firstName} {user.lastName}
                </div>
                <div className="text-slate-500">{user.email}</div>
              </div>
            </div>
          </div>
        )}
        <div className="flex flex-col  py-6 text-black">
          <ul>
            <Link href="/">
              <Item fn={() => setIsMenuOpen(false)} text="Home">
                <HiOutlineHome />
              </Item>
            </Link>
            <Link href="/about">
              <Item fn={() => setIsMenuOpen(false)} text="About">
                <HiOutlineWindow />
              </Item>
            </Link>
            {!userActive && (
              <div className="flex flex-col  text-black">
                <Link href="/auth/login">
                  <Item fn={() => setIsMenuOpen(false)} text="Login">
                    <HiOutlineLogout />
                  </Item>
                </Link>
                <Link href="/auth/signup">
                  <Item fn={() => setIsMenuOpen(false)} text="Signup">
                    <HiOutlineWallet />
                  </Item>
                </Link>
              </div>
            )}

            {user.role === "admin" && (
              <div className="flex flex-col  text-black">
                <Link href={"/admin/dashboard"}>
                  <Item fn={() => setIsMenuOpen(false)} text="Admin Dashboard">
                    <HiOutlineEyeSlash />
                  </Item>
                  {/* <Login
                titleOfbutton={"ADMIN DASHBOARD"}
                image={"createevent.svg"}
              /> */}
                </Link>
              </div>
            )}

            {userActive && (
              <div className="flex flex-col  text-black">
                <Link href={"/createorganization"}>
                  <Item fn={() => setIsMenuOpen(false)} text="Host Event">
                    <HiOutlineQueueList />
                  </Item>
                </Link>
                <Link href={`/profile/${user._id}`}>
                  <Item fn={() => setIsMenuOpen(false)} text="Profile">
                    <HiOutlineUser />
                  </Item>
                </Link>
              </div>
            )}

            {userActive && (
              <div className="mt-4 bg-slate-200 border-y-2 ">
                {organization.length === 0 ? (
                  <div className="text-custom-orange flex justify-center">
                    No organization
                  </div>
                ) : (
                  <div className="max-h-36 divide-y-2 divide-slate-400 overflow-auto navBar-profile">
                    {organization.map((org: OrganizationProps) => (
                      <Link
                        onClick={() => setIsMenuOpen(false)}
                        key={org.id}
                        href={`/organization/dashboard/${org.id}`}
                        className="flex px-4    justify-center items-center py-3 hover:bg-gray-100 "
                      >
                        <div className="flex-shrink-0">
                          <Image
                            src={org.image}
                            alt="profile picture"
                            width={30}
                            height={10}
                            className="rounded-lg w-auto h-auto"
                          />
                        </div>
                        <div className="w-full ps-3">
                          <div className=" text-sm font-medium text-md mb-1.5 text-gray-400">
                            {org.name}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </ul>
        </div>
        <div className="flex flex-col gap-2">
          {userActive && (
            <div className="">
              <Login
                image="Sign_in.svg"
                titleOfbutton="LOGOUT"
                fn={clickLogoutBtn}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
});
export default ResponsiveMenuBar;

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
          ? "fixed shadow-2xl right-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0fc] p-5 ease-in duration-50"
          : "fixed left-[100%] top-0 p-10 ease-in duration-50"
      }
      ref={menuBarRef}
    >
      <div
        className={`w-full ${
          userActive ? "hidden" : "block"
        } flex items-center justify-end`}
      >
        <div onClick={() => setIsMenuOpen(false)} className="cursor-pointer">
          <IoMdClose size={25} />
        </div>
      </div>
      {userActive && (
        <div className="flex justify-between items-center mt-5">
          <Link href={`/profile/${user._id}`}>
            <Image
              src={user.image}
              alt="profile picture"
              width={50}
              height={20}
              className="rounded-full w-auto h-auto"
            />
          </Link>
          <div onClick={() => setIsMenuOpen(false)} className="cursor-pointer">
            <IoMdClose size={30} />
          </div>
        </div>
      )}
      <div className="flex flex-col py-6 text-black">
        <ul>
          <Link href="/">
            <Item fn={() => setIsMenuOpen(false)} text="Home">
              {/* <AiFillHome /> */}
            </Item>
          </Link>
          <Link href="/about">
            <Item fn={() => setIsMenuOpen(false)} text="About">
              {/* <MdContactless /> */}
            </Item>
          </Link>
          {!userActive && (
            <div className="flex flex-col text-black">
              <Link href="/auth/login">
                <Item fn={() => setIsMenuOpen(false)} text="Login">
                  {/* <RiLoginCircleFill /> */}
                </Item>
              </Link>
              <Link href="/auth/signup">
                <Item fn={() => setIsMenuOpen(false)} text="Signup">
                  {/* <FaLock /> */}
                </Item>
              </Link>
            </div>
          )}

          {userActive && (
            <div className="flex flex-col text-black">
              <Link href={"/createorganization"}>
                <Item fn={() => setIsMenuOpen(false)} text="Host Event">
                  {/* <IoIosAddCircle /> */}
                </Item>
              </Link>
              <Link href={`/profile/${user._id}`}>
                <Item fn={() => setIsMenuOpen(false)} text="Profile">
                  {/* <FaUser /> */}
                </Item>
              </Link>
              <Link href={`/notification`}>
                <Item fn={() => setIsMenuOpen(false)} text="Notifications">
                  {/* <FaUser /> */}
                </Item>
              </Link>
            </div>
          )}
        </ul>
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
      </div>
    </div>
  );
});
export default ResponsiveMenuBar;

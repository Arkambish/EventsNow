"use client";
import React from "react";
import Image from "next/image";
import NavBarButton from "./NavBarButton";
import { getSession, signOut } from "next-auth/react";
import { useEffect, useState } from "react";

import Profile from "@/components/Profile";
import Link from "next/link";
import Spinner from "../Spinner";
import { AiOutlineMenu } from "react-icons/ai";

import Login from "../Login";
import { useAuth } from "@/app/AuthContext";

import dynamic from "next/dynamic";

import { usePathname, useRouter } from "next/navigation";
import { IoMdClose } from "react-icons/io";
import NavBarProfile from "./NavBarProfile";
import ResponsiveMenuBar from "./ResponsiveMenuBar";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaCircle } from "react-icons/fa";
import { UserType } from "@/app/Type";
import Notification from "./Notification";
import { FetchGet } from "@/hooks/useFetch";
import Style from "./../../app/navbar.module.css";
import path from "path";
import HomeNavBar from "@/app/home/components/HomeNavBar";

export type OrganizationProps = {
  map: any;
  name: string;
  image: string;
  id: string;
};

type ID = {
  id: string;
};

// export type User = {
//   _id: string;
//   email: string;
//   firstName: string;
//   lastName: string;
//   image: string;
//   role: string;
// };

export interface AuthContext {
  organizationId: string | null;
  eventPublish: boolean;
  emailAuth: string | null;
  setOrganizationId: any;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  organization: OrganizationProps[];
  setOrganization: React.Dispatch<React.SetStateAction<OrganizationProps[]>>;
}
export type NotificationType = {
  comment: string;
  recieverId: string;
  topic: string;
  _id: string;
  isClicked: boolean;
  createdAt: string;
};

export const getUser = async ({ email }: any) => {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/user/getOneUser`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }
  );

  const { data } = await user.json();
  return data;
};

export default function NavBar() {
  const [userActive, setUserActive] = useState<boolean>(false);
  const [newUserPath, setNewUserPath] = useState<boolean>(false);
  const [user, setUser] = useState<UserType>({
    _id: "",
    email: "",
    firstName: "",
    lastName: "",
    image: "",
    role: "",
    wishListId: [],
    registeredEvents: [],
    mobileNumber: 0,
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const [showProfile, setShowProfile] = useState<boolean>(false);

  const { emailAuth, eventPublish, setEmail, setOrganization, organizationId } =
    useAuth() as AuthContext;

  const pathname = usePathname();

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }
  const router = useRouter();
  const [notification, setNotification] = useState<NotificationType[]>([]);

  async function clickLogoutBtn() {
    await signOut({ callbackUrl: `${process.env.NEXT_PUBLIC_URL}` });
    setEmail("");
    localStorage.removeItem("email");
    router.push("/");
  }

  // get data from api
  useEffect(
    function () {
      async function session() {
        if (pathname.startsWith("/organization/newUser")) {
          setNewUserPath(true);
        }
        const session = await getSession();

        if (session) {
          const name = session?.user?.name ? session?.user?.name : "";
          if (name !== "") {
            const data = await getUser({ email: session?.user?.email });

            if (data) {
              setUserActive(true);
              setUser(data);

              const notificationData = await FetchGet({
                endpoint: `notification/getNotification/${data._id}`,
              });

              notificationData
                ? setNotification(notificationData.filternotification.reverse())
                : setNotification([]);

              const organization = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/v1/user/userOrganization/${data._id}`
              );

              if (!organization.ok) {
                setIsLoading(false);
                return;
              }

              const organizationData = await organization.json();

              setOrganization(organizationData);
            } else {
              setUserActive(false);
            }
          } else {
            const email = emailAuth;

            const data = await getUser({ email });

            const notificationData = await FetchGet({
              endpoint: `notification/getNotification/${data._id}`,
            });
            console.log(notificationData);
            notificationData
              ? setNotification(notificationData.filternotification)
              : setNotification([]);

            if (data) {
              setUserActive(true);
              setUser(data);
              const organization = await fetch(
                `${process.env.NEXT_PUBLIC_URL}/api/v1/user/userOrganization/${data._id}`
              );

              if (!organization.ok) {
                setIsLoading(false);
                return;
              }

              const organizationData = await organization.json();

              setOrganization(organizationData);
            } else {
              // clickLogoutBtn();
              setUserActive(false);
            }
          }
        }
        setIsLoading(false);
      }

      session();
    },
    [emailAuth, pathname, organizationId, setOrganization]
  );

  return (
    <div className={(pathname == "/"  || pathname== "/home")? `fixed w-full z-10 ` : ""}>
      {newUserPath ? null : (
        <div>
          {/* check data has loaded */}
          {isLoading ? (
            <nav className={`${pathname == "/home" ? "":"bg-white "} `}>
              <Spinner />
            </nav>
          ) : (
            <nav className="  ">
              {pathname == "/home" ? <HomeNavBar/> : <div className="bg-white ">
              <div className=" flex flex-wrap items-center justify-between mx-auto p-2">
                {/*  */}
                {pathname.startsWith("/event/dashboard") ? (
                  <Link href={`/organization/dashboard/${organizationId}`}>
                    <button
                      className={`bg-custom-orange button  h-8 rounded-2xl`}
                    >
                      <div className="flex text-white  flex-row ml-2 mr-2  gap-2 p-0 items-center justify-center">
                        <IoMdArrowRoundBack />

                        <div className=" text-white text-sm S font-bold ">
                          Organization
                        </div>
                      </div>
                    </button>
                  </Link>
                ) : (
                  <Link href="/">
                    <button className="button hover:opacity-85">
                      <div className="flex items-center gap-3">
                        <Image
                          src="/images/reusableComponents/nav-logo.svg"
                          alt="EventNow Logo"
                          width={30}
                          height={20}
                        />

                        <span className="self-center lg:flex md:hidden flex text-2xl font-semibold whitespace-nowrap text-eventBrown    ">
                          EventNow
                        </span>
                      </div>
                    </button>
                  </Link>
                )}

                <div
                  className="hidden w-full md:flex md:w-auto  items-end"
                  id="navbar-default"
                >
                  <ul className=" justify-center items-center text-xl font-medium flex   p-4 md:p-0 mt-4 border border-gray-100 rounded-lg  md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0  dark:border-gray-700">
                    <>
                      {pathname.startsWith("/event/dashboard") && (
                        <div>
                          {eventPublish ? (
                            <div className="text-green-600 text-sm	 flex items-center gap-2">
                              <div className="text-green-600">
                                <FaCircle size={15} />
                              </div>
                              publish
                            </div>
                          ) : (
                            <div className=" text-red-600 text-sm	 flex items-center gap-2">
                              <div className="text-red-600">
                                <FaCircle size={15} />
                              </div>
                              Not publish
                            </div>
                          )}
                          <div></div>
                        </div>
                      )}
                      <li>
                        <Link href={"/"}>
                          <button
                            className=" block button py-2 px-3   rounded  md:text-eventBrown-700 md:p-0  text-eventBrown hover:opacity-85"
                            aria-current="page"
                          >
                            Home
                          </button>
                        </Link>
                      </li>

                      <Link href={"/about"}>
                        <NavBarButton text={"About"} />
                      </Link>
                    </>

                    {/* when user exist */}
                    {userActive && (
                      <>
                        <Notification
                          notification={notification}
                          setNotification={setNotification}
                        />

                        <div
                          className={`${
                            pathname.startsWith("/organization/dashboard") ||
                            pathname.startsWith("/admin") ||
                            pathname.startsWith("/event/dashboard")
                              ? "hidden"
                              : "flex gap-4"
                          } `}
                        >
                          {user.role === "admin" && (
                            <Link href={"/admin/dashboard"}>
                              <Login
                                titleOfbutton={"Admin Dashboard "}
                                image={"createevent.svg"}
                              />
                            </Link>
                          )}
                          <Link href={"/createorganization"}>
                            <Login
                              titleOfbutton={"Host event"}
                              image={"createevent.svg"}
                            />
                          </Link>
                        </div>
                        {/* my profile part */}

                        <button
                          className={`${
                            pathname.startsWith("/admin")
                              ? "hidden"
                              : "flex gap-4 button"
                          } `}
                          // className="button"
                          onClick={() =>
                            setShowProfile(
                              (showProfile: boolean) => !showProfile
                            )
                          }
                        >
                          <Profile picture={user?.image} />
                        </button>
                      </>
                    )}

                    {/* there is no user exist */}
                    {!userActive && (
                      <>
                        <Link href={"/auth/login"}>
                          <Login
                            titleOfbutton={"LOGIN"}
                            image={"Sign_in.svg"}
                          />
                        </Link>
                        <Link href={"/auth/signup"}>
                          <Login
                            titleOfbutton={"SIGNUP"}
                            image={"Sign_in_squre_fill.svg"}
                          />
                        </Link>
                      </>
                    )}
                  </ul>
                </div>
                <div
                  onClick={() => toggleMenu()}
                  className="sm:hidden cursor-pointer"
                >
                  <AiOutlineMenu size={25} />
                </div>
              </div>
              <div
                // style={{
                //   animation: `${
                //     isMenuOpen ? Style.slideInFromRight : Style.slideOutToRight
                //   } 0.5s forwards`,
                // }}
                className={
                  isMenuOpen
                    ? "fixed shadow-2xl blur-20  right-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0fc] p-5 ease-in duration-50 z-50"
                    : "fixed left-[100%] top-0 p-10 ease-in duration-50"
                }
              >
                <div
                  className={`w-full ${
                    userActive ? "hidden" : "block"
                  } flex items-center justify-end `}
                >
                  <div onClick={() => toggleMenu()} className="cursor-pointer ">
                    <IoMdClose size={25} />
                  </div>
                </div>

                {userActive && (
                  <div className="flex justify-between items-center mt-5">
                    <div
                      onClick={() => toggleMenu()}
                      className="cursor-pointer "
                    >
                      <IoMdClose size={30} />
                    </div>
                  </div>
                )}
                <ResponsiveMenuBar
                  user={user}
                  userActive={userActive}
                  isMenuOpen={isMenuOpen}
                  setIsMenuOpen={setIsMenuOpen}
                  clickLogoutBtn={clickLogoutBtn}
                />
              </div>
              {/* */}
              <div className="relative">
                <div
                  className={`absolute ${
                    !showProfile
                      ? "hidden"
                      : "xl:w-3/12 lg:w-3/12 md:w-1/3 2xl:w-1/5 sm:block hidden"
                  } rounded-b-2xl top-13 right-0 bg-white text-white`}
                >
                  <NavBarProfile
                    setShowProfile={setShowProfile}
                    showProfile={showProfile}
                    user={user}
                    clickLogoutBtn={clickLogoutBtn}
                  />
                </div>
              </div></div>}
            </nav>
          )}
        </div>
      )}
    </div>
  );
}

export function Item({
  text,
  children,
  fn,
}: {
  text?: string;
  children?: any;
  fn?: () => void;
}) {
  return (
    <li className="p-2 	w-full  hover:bg-[#12342112] cursor-pointer   border-amber-400	text-xl ">
      <button onClick={fn} className="flex gap-3 items-center">
        <div>{children}</div>
        <div>{text}</div>
      </button>
    </li>
  );
}

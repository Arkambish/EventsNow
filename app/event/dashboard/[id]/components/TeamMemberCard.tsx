"use client";
import React, { useState } from "react";
import ContainerWithStroke from "./ContainerWithStroke";
import Modal from "@/components/Modal";
import { Dialog } from "@headlessui/react";
import WidthChangeModal from "@/components/WidthChangeModal";
import { MdCancel } from "react-icons/md";
import Image from "next/image";
import { UserDetails } from "@/app/Type";
interface TeamMemberCardProps {
  name: string;
  email: string;
  user: any;
}

export default function TeamMemberCard({
  name,
  email,
  user,
}: TeamMemberCardProps) {
  console.log(user);
  const [clickUser, setClickUser] = useState(false);
  return (
    <>
      <button onClick={() => setClickUser(true)}>
        <div>
          <ContainerWithStroke>
            <div className="lg:flex mx-auto py-1 md:justify-around md:pr-10 lg:pl-10 max-sm:text-sm ">
              <div className="">{name}</div>
              {email}
            </div>
          </ContainerWithStroke>
        </div>
      </button>

      <div>
        {clickUser && (
          <WidthChangeModal setIsOpen={setClickUser} isOpen={clickUser}>
            <Dialog.Title
              as="h3"
              className="text-lg font-medium leading-6 text-gray-900 flex justify-between"
            >
              User Details
              <MdCancel
                size={24}
                className="hover:cursor-pointer mr-3"
                onClick={() => setClickUser(false)}
              />
            </Dialog.Title>
            <div className="flex lg:flex-row flex-col  h-72 overflow-y-auto px-8 py-8">
              <div className="flex flex-row gap-2 justify-center">
                <Image
                  src={user.image}
                  alt={user.name}
                  width={200}
                  height={200}
                />
              </div>

              <div className="flex flex-col space-y-4 ml-8 mt-4 w-96 gap-7">
                <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between mr-8">
                  <div className="flex flex-col space-y-2 mr-4">
                    {" "}
                    <h2 className="font-bold">first Name </h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-800">
                      {user.firstName}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2 className="font-bold">last Name</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-800 ">
                      {" "}
                      {user.lastName}
                    </div>
                  </div>
                </div>
                {/* <div className="flex md:flex-row flex-col md:gap-0 gap-4 justify-between mr-8">
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2 className="font-bold">Address</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-800 max-w-48 overflow-ellipsis overflow-hidden ">
                      {" "}
                      {organization.address}
                    </div>
                  </div>
                  <div className="flex flex-col space-y-1">
                    {" "}
                    <h2 className="font-bold">Company Name</h2>
                    <div className="font-underlined border-b border-gray-400 text-gray-800 ">
                      {" "}
                      {organization.companyName}
                    </div>
                  </div>
                </div> */}
                <div className="flex flex-col space-y-1">
                  {" "}
                  <h2 className="font-bold">Email</h2>
                  <div className="font-underlined border-b border-gray-400 text-gray-800 ">
                    {" "}
                    {user.email}
                  </div>
                </div>
              </div>
            </div>
          </WidthChangeModal>
        )}
      </div>
    </>
  );
}

import React, { useState } from "react";
import { useOrg } from "../OrgContext";
import { error } from "@/util/Toastify";
import { success } from "@/util/Toastify";
import dynamic from "next/dynamic";
// import { Organization } from "../Type";
import { IoSaveOutline } from "react-icons/io5";
import { FaCloudUploadAlt, FaRegWindowClose } from "react-icons/fa";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import Image from "next/image";
import { OrganizationType } from "@/app/Type";
import { z } from "zod";
import { HiOutlineBadgeCheck } from "react-icons/hi";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/Select";

const ProfileSettings = dynamic(
  () => import("@/app/organization/dashboard/[id]/components/ProfileSettings")
);
import Switch from "react-switch";
import { is } from "date-fns/locale";
import { set } from "mongoose";
import { Input } from "@/components/Input";
import { FetchPut } from "@/hooks/useFetch";

interface contextProps {
  organization: OrganizationType;
  id: string;
  setOrganizationImage: React.Dispatch<React.SetStateAction<string>>;
}

export default function Setting() {
  const [profileImage, setProfileImage] = useState("");
  const { organization, id, setOrganizationImage } = useOrg() as contextProps;
  const [bank, setBank] = useState(organization.bank || "");
  const [branch, setBranch] = useState(organization.branch || "");
  const [payout, setPayout] = useState(organization.payout || "");
  const [accountName, setAccountName] = useState(
    organization.accountName || ""
  );
  const [accountNumber, setAccountNumber] = useState(
    organization.accountNumber || ""
  );

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditingAdvanced, setIsEditingAdvanced] = useState<boolean>(false);

  const validate = z.object({
    // accountNumber: z.number().min(5, "Enter accountNumber "),
    accountName: z.string().min(5, "Enter accountName "),
  });

  async function handleSave() {
    if (!bank || !branch || !payout || !accountName || !accountNumber) {
      error("Please fill all the fields");
      return;
    }

    const result = validate.safeParse({ accountName });

    if (result.success) {
      if (
        bank === organization.bank &&
        branch === organization.branch &&
        payout === organization.payout &&
        accountName === organization.accountName &&
        accountNumber === organization.accountNumber
      ) {
        error("No changes detected");
        return;
      }

      const data = { bank, branch, payout, accountName, accountNumber };

      const resData = await FetchPut({
        endpoint: `organization/updateOrganization/${organization._id}`,
        body: data,
      });

      setIsEditingAdvanced(false);
      success("Organization details updated successfully");
    } else {
      error(result.error.errors[0].message);
    }
  }

  async function handleImageSaveButton() {
    const data = await FetchPut({
      endpoint: `organization/updateOrganizationPrifilePic`,
      body: { id, image: profileImage },
    });
    setOrganizationImage(profileImage);
    setProfileImage("");
  }

  function handleChange() {
    setIsEditing(!isEditing);
  }

  function handleadvanceDetailsChneg() {
    setIsEditingAdvanced(!isEditingAdvanced);
  }

  function handleBank(e: string) {
    setBank(e);
  }
  function handlebranch(e: string) {
    setBranch(e);
  }

  function handleAccountType(e: string) {
    setAccountName(e);
  }

  function handlePayout(e: string) {
    setPayout(e);
  }
  function handleAcccountNumber(e: string) {
    setAccountNumber(e);
  }

  return (
    <div className="flex rounded-lg  shadow-3xl md:pl-10 md:ml-2 pl-5 bg-[#fff] pt-8 lg:pl-12 flex-col justify-start items-start gap-12">
      <div className="md:w-11/12 w-11/12  lg:w-full flex flex-col gap-3">
        <div className="lg:text-3xl text-2xl  sm:w-full lg:w-9/12 md:w-full flex justify-between font-semibold text-custom-orange	font-IBM">
          ACCOUNT DETAILS
          <Switch
            className="grid  self-center"
            onChange={handleChange}
            checked={isEditing}
            offColor="#E9E9E9"
            onColor="#D47151"
            offHandleColor="#D47151"
            onHandleColor="#E9E9E9"
            height={20}
            width={40}
          />
          {/* {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className=" text-white px-4 py-2 rounded-lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.2038 10.7959L18.9998 8.99994C19.545 8.45469 19.8176 8.18207 19.9634 7.88797C20.2407 7.32842 20.2407 6.67146 19.9634 6.11191C19.8176 5.81782 19.545 5.54519 18.9998 4.99994C18.4545 4.45469 18.1819 4.18207 17.8878 4.03633C17.3282 3.75905 16.6713 3.75905 16.1117 4.03633C15.8176 4.18207 15.545 4.45469 14.9998 4.99994L13.1811 6.8186C14.145 8.4692 15.5311 9.84476 17.2038 10.7959ZM11.7267 8.27305L4.85615 15.1436C4.43109 15.5686 4.21856 15.7812 4.07883 16.0422C3.93909 16.3033 3.88015 16.5981 3.76226 17.1875L3.14686 20.2645C3.08034 20.5971 3.04708 20.7634 3.14168 20.858C3.23629 20.9526 3.4026 20.9194 3.73521 20.8529L6.81219 20.2375C7.40164 20.1196 7.69637 20.0606 7.95746 19.9209C8.21856 19.7812 8.43109 19.5686 8.85615 19.1436L15.7456 12.2542C14.1239 11.2385 12.7522 9.87622 11.7267 8.27305Z"
                  fill="#666666"
                />
              </svg>
            </button>
          )} */}
        </div>
        <div className="md:w-full mt-2 lg:w-3/4 text-[#525252]">
          <ProfileSettings
            setIsEditing={setIsEditing}
            isEditing={isEditing}
            organizationName={organization.organizationName}
            organizationID={organization._id}
            name={"Organization name"}
          />
          <CldUploadWidget
            uploadPreset="organization"
            onOpen={() => {
              console.log("isPhotographer");
            }}
            onSuccess={(results: CloudinaryUploadWidgetResults) => {
              const uploadedResult = results.info as CloudinaryUploadWidgetInfo;
              const profileImageURL = {
                image: uploadedResult.secure_url,
              };
              setProfileImage(profileImageURL.image);
            }}
            options={{
              tags: ["organization image"],

              sources: ["local"],
              googleApiKey: "<image_search_google_api_key>",
              showAdvancedOptions: false,
              cropping: true,
              multiple: false,
              showSkipCropButton: false,
              croppingAspectRatio: 0.75,
              croppingDefaultSelectionRatio: 0.75,
              croppingShowDimensions: true,
              croppingCoordinatesMode: "custom",

              defaultSource: "local",
              resourceType: "image",
              folder: "organization",

              styles: {
                palette: {
                  window: "#ffffff",
                  sourceBg: "#f4f4f5",
                  windowBorder: "#90a0b3",
                  tabIcon: "#000000",
                  inactiveTabIcon: "#555a5f",
                  menuIcons: "#555a5f",
                  link: "#000000",
                  action: "#000000",
                  inProgress: "#464646",
                  complete: "#000000",
                  error: "#cc0000",
                  textDark: "#000000",
                  textLight: "#fcfffd",
                  theme: "white",
                },
              },
            }}
          >
            {({ open }) => {
              return (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    open();
                  }}
                >
                  <div className="p-1 mt-5 text-white font-semibold flex items-center justify-center gap-2 bg-slate-400 rounded-lg">
                    <div className="ml-2  bg-white p-1 rounded-full text-custom-orange">
                      <FaCloudUploadAlt />
                    </div>
                    upload image
                  </div>
                </button>
              );
            }}
          </CldUploadWidget>

          {profileImage.length > 0 && (
            <div className=" mt-5 border-2 w-auto border-solId rounded-xl   ">
              <Image
                className=" p-4"
                src={profileImage}
                width={500}
                height={500}
                alt="event cover image"
              />
              <div className=" flex justify-end items-end mr-5 mb-3">
                <button
                  onClick={handleImageSaveButton}
                  className="bg-custom-orange justify-center items-center font-semibold flex gap-2  button p-1 px-2 text-white rounded-lg"
                >
                  <HiOutlineBadgeCheck size={22} />
                  Save image
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-11/12 lg:w-full ">
        <div className="flex font-semibold	 justify-between lg:text-3xl text-2xl sm:w-full lg:w-9/12 md:w-full  text-custom-orange	font-IBM">
          ADVANCED DETAILS
          <Switch
            className="grid  self-center"
            onChange={handleadvanceDetailsChneg}
            checked={isEditingAdvanced}
            offColor="#E9E9E9"
            onColor="#D47151"
            offHandleColor="#D47151"
            onHandleColor="#E9E9E9"
            height={20}
            width={40}
          />
          {/* {!isEditingAdvanced && (
            <button
              onClick={() => setIsEditingAdvanced(true)}
              className=" text-white px-4 py-2 rounded-lg"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.2038 10.7959L18.9998 8.99994C19.545 8.45469 19.8176 8.18207 19.9634 7.88797C20.2407 7.32842 20.2407 6.67146 19.9634 6.11191C19.8176 5.81782 19.545 5.54519 18.9998 4.99994C18.4545 4.45469 18.1819 4.18207 17.8878 4.03633C17.3282 3.75905 16.6713 3.75905 16.1117 4.03633C15.8176 4.18207 15.545 4.45469 14.9998 4.99994L13.1811 6.8186C14.145 8.4692 15.5311 9.84476 17.2038 10.7959ZM11.7267 8.27305L4.85615 15.1436C4.43109 15.5686 4.21856 15.7812 4.07883 16.0422C3.93909 16.3033 3.88015 16.5981 3.76226 17.1875L3.14686 20.2645C3.08034 20.5971 3.04708 20.7634 3.14168 20.858C3.23629 20.9526 3.4026 20.9194 3.73521 20.8529L6.81219 20.2375C7.40164 20.1196 7.69637 20.0606 7.95746 19.9209C8.21856 19.7812 8.43109 19.5686 8.85615 19.1436L15.7456 12.2542C14.1239 11.2385 12.7522 9.87622 11.7267 8.27305Z"
                  fill="#666666"
                />
              </svg>
            </button>
          )} */}
        </div>

        <div className="w-full mt-4 flex flex-col gap-3 lg:w-3/4">
          <Select onValueChange={handleBank}>
            <SelectTrigger
              {...(!isEditingAdvanced && { disabled: true })}
              value={bank}
              className="w-3/4 ring-2 ring-custom-orange "
            >
              <SelectValue placeholder={bank ? bank : "Select bank"} />
            </SelectTrigger>
            <SelectContent className="bg-white text-black font-medium		 cursor-pointer">
              <SelectItem value="Sampath">Sampath</SelectItem>
              <SelectItem value="BOC">BOC</SelectItem>
              <SelectItem value="peoples">peoples</SelectItem>
              <SelectItem value="NSB">NSB</SelectItem>
            </SelectContent>
          </Select>
          {/* <select
            {...(!isEditingAdvanced && { disabled: true })}
            id="bank"
            value={bank}
            onChange={(e) => setBank(e.target.value)}
            className="mt-3 focus:outline-custom-orange w-full  block flex-1  bg-transparent py-1.5 pl-1 text-gray-600  placeholder:text-gray-400  sm:text-sm sm:leading-6 border-2 rounded-[12px]"
          >
            <option selected>Bank</option>
            <option value="Sampath">Sampath</option>
            <option value="BOC">BOC</option>
            <option value="peoples">peoples</option>
            <option value="NSB">NSB</option>
          </select> */}

          <Select onValueChange={handlebranch}>
            <SelectTrigger
              {...(!isEditingAdvanced && { disabled: true })}
              value={branch}
              className="w-3/4 ring-2 ring-custom-orange "
            >
              <SelectValue placeholder={branch ? branch : "Select branch"} />
            </SelectTrigger>
            <SelectContent className="bg-white text-black font-medium		 cursor-pointer">
              <SelectItem value="matara">matara</SelectItem>
              <SelectItem value="colombo">colombo</SelectItem>
              <SelectItem value="gampaha">gampaha</SelectItem>
              <SelectItem value="kandy">kandy</SelectItem>
            </SelectContent>
          </Select>
          {/* <select
            id="branch"
            {...(!isEditingAdvanced && { disabled: true })}
            value={branch}
            onChange={(e) => setBranch(e.target.value)}
            className=" mt-3 text-gray-600  focus:outline-custom-orange w-full  block flex-1  bg-transparent py-1.5 pl-1  placeholder:text-gray-400  sm:text-sm sm:leading-6 border-2 rounded-[12px]"
          >
            <option selected>Branch</option>
            <option value="matara">matara</option>
            <option value="colombo">colombo</option>
            <option value="gampaha">gampaha</option>
            <option value="kandy">kandy</option>
          </select> */}

          <Select onValueChange={handleAccountType}>
            <SelectTrigger
              {...(!isEditingAdvanced && { disabled: true })}
              value={accountName}
              className="w-3/4 ring-2 ring-custom-orange "
            >
              {" "}
              <SelectValue
                placeholder={accountName ? accountName : "Select Account Type"}
              />
            </SelectTrigger>
            <SelectContent className="bg-white text-black font-medium		 cursor-pointer">
              <SelectItem value="saving">saving</SelectItem>
              <SelectItem value="fix">fix</SelectItem>
            </SelectContent>
          </Select>
          <Input
            {...(!isEditingAdvanced && { disabled: true })}
            className="w-3/4 ring-2 ring-custom-orange "
            value={accountNumber}
            placeholder="Account Number "
            onChange={(e) => handleAcccountNumber(e.target.value)}
          />
          {/* <input
            required
            {...(!isEditingAdvanced && { disabled: true })}
            type="text"
            name="firstName"
            id="firstName"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="focus:outline-custom-orange  w-full  block flex-1  bg-transparent py-1.5 pl-1  placeholder:text-gray-600  text-gray-600 focus:ring-0 sm:text-sm sm:leading-6 border-2 rounded-[12px]"
            placeholder="Account Number "
          /> */}

          {/* <div className="my-5 flex gap-1">
           <input
              required
              type="text"
              name="firstName"
              {...(!isEditingAdvanced && { disabled: true })}
              id="firstName"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
              className=" focus:outline-custom-orange w-full  block flex-1  bg-transparent py-1.5 pl-1 text-gray-600  placeholder:text-gray-600  focus:ring-0 sm:text-sm sm:leading-6 border-2 rounded-[12px]"
              placeholder=" Gues Name "
            /> 
            <input
              required
              {...(!isEditingAdvanced && { disabled: true })}
              type="text"
              name="firstName"
              id="firstName"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              className="focus:outline-custom-orange  w-full  block flex-1  bg-transparent py-1.5 pl-1  placeholder:text-gray-600  text-gray-600 focus:ring-0 sm:text-sm sm:leading-6 border-2 rounded-[12px]"
              placeholder="Account Number "
            />
          </div> */}

          <Select onValueChange={handlePayout}>
            <SelectTrigger
              {...(!isEditingAdvanced && { disabled: true })}
              value={payout}
              className="w-3/4 ring-2 ring-custom-orange "
            >
              {" "}
              <SelectValue
                placeholder={payout ? payout : "Select Payment Frequency"}
              />
            </SelectTrigger>
            <SelectContent className="bg-white text-black font-medium		 cursor-pointer">
              <SelectItem value="1 week">1 week</SelectItem>
              <SelectItem value="2 week">2 week</SelectItem>
              <SelectItem value="3 week">3 week</SelectItem>
              <SelectItem value="4 week">4 week</SelectItem>
            </SelectContent>
          </Select>

          {isEditingAdvanced && (
            <div className="w-full mt-4 gap-2  flex justify-end">
              <button
                onClick={() => handleSave()}
                className="bg-custom-orange justify-center items-center font-semibold flex gap-2  button p-1 px-2 text-white rounded-lg"
              >
                <HiOutlineBadgeCheck size={22} />
                Save details
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

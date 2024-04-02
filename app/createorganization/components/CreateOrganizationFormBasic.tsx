"use client";
import React, { useState } from "react";
import "react-phone-number-input/style.css";
import { SafeParseReturnType, ZodObject, number, z } from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { error, success } from "../../../util/Toastify";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/dropdown";
import { getSession } from "next-auth/react";
import { OrganizationProps } from "@/components/Navbar/NavBar";
import { useAuth } from "@/app/AuthContext";
import { AuthContext } from "@/app/Type";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { FaCloudUploadAlt } from "react-icons/fa";
import { Session } from "next-auth";
import { Router } from "next/router";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { NextResponse } from "next/server";
import { ca } from "date-fns/locale";

type OrganizationValidationTypes = ZodObject<{
  fullName: z.ZodString;
  numberType: z.ZodString;
  number: z.ZodString;
  companyName: z.ZodString;
  organizationName: z.ZodString;
  address: z.ZodString;
  phoneNumber: z.ZodString;
  email: z.ZodString;
  postImageLink: z.ZodString;
}>;
type OrganizationDataType = {
  fullName: string;
  numberType: string;
  number: string;
  companyName: string;
  organizationName: string;
  address: string;
  phoneNumber: string;
  email: string;
  postImageLink: string;
};

export default function CreateOrganizationFormBasic() {
  const [fullName, setFullName] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [numberType, setNumberType] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [organizationName, setOrganizationName] = useState<string>("");

  const router: AppRouterInstance = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { setOrganization } = useAuth() as AuthContext;

  const [profileImage, setProfileImage] = useState<string>("");

  const getUserId = async () => {
    const session: null | Session = await getSession();
    if (!session) {
      return null;
    }
    const email: string | null | undefined = session.user?.email;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/v1/user/getUserId`,
        {
          method: "POST",
          mode: "cors",
          body: JSON.stringify({ email }),
        }
      );
      if (!res.ok) {
        error("There is an error for registration");
        return null;
      }

      const id = await res.json();
      return id;
    } catch (e) {
      error(e + "There is an error for registration");
      return null;
    }
  };

  const validateOrganization: OrganizationValidationTypes = z.object({
    fullName: z
      .string()
      .min(1, "Enter your full name ")
      .regex(/^[a-zA-Z ]*$/, {
        message: "Cannot enter number or symbol for name",
      }),
    numberType: z.string().min(1, { message: "select ID number type" }),
    number: z
      .string()
      .min(1, { message: "Enter your indentification card number  " }),
    companyName: z.string(),
    organizationName: z
      .string()
      .min(1, { message: "Enter your organization name" }),
    address: z.string().min(1, { message: "Enter your address" }),
    phoneNumber: z.string().min(1, { message: "Enter your phone number " }),
    email: z.string().email({ message: "Invalid email" }),
    postImageLink: z.string().min(1, { message: "Upload a cover image" }),
  });

  async function sendOrganizationData(e: any) {
    try {
      e.preventDefault();

      const userId = await getUserId();

      console.log(userId);

      setIsSubmitting(true);

      const data: OrganizationDataType = {
        fullName,
        numberType,
        number,
        companyName,
        organizationName,
        address,
        phoneNumber,
        email,
        postImageLink: profileImage,
      };
      console.log(data);

      const result = validateOrganization.safeParse(data);
      console.log(result.success);
      if (result.success) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/createOrganization`,
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify(data),
          }
        );

        console.log(res.ok);

        if (!res.ok) {
          error("There is an error for registration");
          setIsSubmitting(false);
          return null;
        }

        const id = await res.json();

        const oraganizationDataForNavBarProfile = {
          id: id.id,
          name: organizationName,
          image: profileImage,
        } as OrganizationProps;

        setOrganization((data: OrganizationProps[]) => [
          ...data,
          oraganizationDataForNavBarProfile,
        ]);

        console.log(id.id, userId);

        const organizerRes = await fetch(
          `${process.env.NEXT_PUBLIC_URL}/api/v1/permission/createOrganizer`,
          {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({
              organizationId: id.id,
              userId: userId.id,
              globalPermission: ["allPermission"],
            }),
          }
        );
        console.log(organizerRes.ok);

        if (!organizerRes.ok) {
          error("There is an error for registration");
          setIsSubmitting(false);
          return null;
        }

        success("registration data sent succesfully");

        setFullName("");
        setNumberType("");
        setNumber("");
        setCompanyName("");
        setAddress("");
        setPhoneNumber("");
        setEmail("");
        setOrganizationName("");
        setProfileImage("");

        setIsSubmitting(false);

        router.push(`/organization/dashboard/${id.id}`);
        return;
      } else {
        const formattedError = result.error.format();

        if (formattedError.fullName?._errors) {
          error(String(formattedError.fullName?._errors));
        } else if (formattedError.numberType) {
          error(String(formattedError.numberType?._errors));
        } else if (formattedError.number) {
          error(String(formattedError.number?._errors));
        } else if (formattedError.companyName) {
          error(String(formattedError.companyName?._errors));
        } else if (formattedError.organizationName) {
          error(String(formattedError.organizationName?._errors));
        } else if (formattedError.address) {
          error(String(formattedError.address?._errors));
        } else if (formattedError.phoneNumber) {
          error(String(formattedError.phoneNumber?._errors));
        } else if (formattedError.email) {
          error(String(formattedError.email._errors));
        } else if (formattedError.postImageLink) {
          error(String(formattedError.postImageLink._errors));
        } else error("an unknown error occur in validation process");
      }

      setIsSubmitting(false);
    } catch (e) {
      error(e + "There is an error for registration");
    }
  }

  return (
    <div className="  2xl:px-40 px-4 sm:px-20 justify-center">
      <div className="w-full px-10 lg:mx-0 lg:px-0 mt-8 mb-16 leading-none	 text-center text-[#455273] font-khand text-[32px] sm:text-[64px] font-semibold mx-2">
        Create organization account
      </div>
      <form className=" flex-column " method="POST">
        <input
          required
          type="text"
          name="fullName"
          id="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className=" my-5 w-full h-8 block flex-1  bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-custom-orange sm:text-sm sm:leading-6 border-2 rounded-[12px] pl-4"
          placeholder="Enter your full name  "
        ></input>
        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <button className="  h-8 text-center justify-center  bg-transparent   px-4 text-gray-400  sm:text-sm sm:leading-6 border-2 rounded-[12px] pl-4 pr-2">
                {numberType.length > 0 ? (
                  <span>{numberType} :-</span>
                ) : (
                  <span className="flex">
                    Type
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path d="M18 9L12 15L6 9" stroke="#222222" />
                    </svg>
                  </span>
                )}
              </button>
            </DropdownTrigger>
            <DropdownMenu
              className="sm:ml-16 pl-4 pr-2 rounded-[12px] bg-[#D7CFC7]/90 text-[#455273]"
              aria-label="select identity number type"
              onAction={(key) => setNumberType(String(key))}
            >
              <DropdownItem key="NIC ">NIC number </DropdownItem>
              <DropdownItem key="Driving licence">
                Driving licence number{" "}
              </DropdownItem>
              <DropdownItem key="Passport">Passport number</DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <input
            required
            type="text"
            name="fullName"
            id="fullName"
            value={number}
            disabled={numberType.length == 0}
            onChange={(e) => setNumber(e.target.value)}
            className="  w-full  block flex-1  bg-transparenttext-gray-900 placeholder:text-gray-400 focus:outline-custom-orange sm:text-sm sm:leading-6 border-2 rounded-[12px] pl-4"
            placeholder={
              numberType.length > 0
                ? ` Enter  ${numberType} number`
                : "Select the identify card type "
            }
          ></input>
        </div>
        <input
          type="text"
          name="companyName"
          id="companyName"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
          className=" my-5 w-full h-8 block flex-1  bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-custom-orange sm:text-sm sm:leading-6 border-2 rounded-[12px] pl-4"
          placeholder="Company Name (Optional) "
        ></input>
        <input
          required
          type="text"
          name="organizationName"
          id="organizationName"
          value={organizationName}
          onChange={(e) => setOrganizationName(e.target.value)}
          className=" my-5 w-full h-8 block flex-1  bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-custom-orange sm:text-sm sm:leading-6 border-2 rounded-[12px] pl-4"
          placeholder="Organization Name "
        ></input>
        <input
          required
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className=" my-5 w-full h-8 block flex-1  bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-custom-orange sm:text-sm sm:leading-6 border-2 rounded-[12px] pl-4"
          placeholder="Address  "
        ></input>
        <input
          required
          type="text"
          name="phoneNumber"
          id="phoneNumber"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          className=" my-5 w-full h-8 block flex-1  bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-custom-orange sm:text-sm sm:leading-6 border-2 rounded-[12px] pl-4"
          placeholder="Phone number "
        ></input>

        <input
          required
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className=" my-5 w-full h-8 block flex-1  bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:outline-custom-orange sm:text-sm sm:leading-6 border-2 rounded-[12px] pl-4"
          placeholder="Enter email address "
        ></input>
      </form>
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
          // maxImageHeight: 100,
          // croppingValidateDimensions: true,
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
              onClick={() => {
                open();
              }}
            >
              <div className="p-1 text-white font-semibold flex items-center justify-center gap-2 bg-slate-400 rounded-2xl">
                <FaCloudUploadAlt />
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
            alt="organization cover image"
          />
        </div>
      )}

      {isSubmitting ? (
        <button className="button flex text-center mt-10 mb-10 xl:mb-20  px-2 justify-center bg-custom-orange text-white font-semibold rounded-lg  text-base font-mono ">
          <div className="flex gap-2 justify-center items-center">
            <div> Creating</div>
            <Image
              src="/images/createEvent/LoadingBtnIcon.svg"
              alt="loading btn"
              width={40}
              height={40}
            />
          </div>
        </button>
      ) : (
        <button
          onClick={(e: any) => sendOrganizationData(e)}
          type="submit"
          className="button flex text-center mt-10 mb-10 xl:mb-20 py-2 px-4 justify-center bg-custom-orange text-white font-semibold rounded-lg  text-base font-mono "
        >
          SEND TO APPROVAL
        </button>
      )}
    </div>
  );
}

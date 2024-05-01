import React from "react";
import Image from "next/image";
import { MdOutlineDensitySmall, MdRefresh } from "react-icons/md";
import ComboboxComponent from "@/components/ComboboxComboboxComponent";
import { People } from "@/app/organization/dashboard/[id]/components/InviteButton";
import { IoSearch } from "react-icons/io5";
import { useAdmin } from "../AdminContextFile";
import { AdminContext, OrganizationType } from "@/app/Type";

interface superadminpages {
  title: String;
  description: String;
  customComponent: React.ReactNode;
  text: String;
  reloadPage?: () => void;

  serachData?: {
    data: any;
    select: People;
    setSelect: React.Dispatch<React.SetStateAction<People>>;
    handleSearchBtn?: () => void;
    placeholder: string;
    handleAllBtn?: () => void;
  };
}

const handleClick = () => {};

export default function SuperadminPages({
  serachData,
  text,
  title,
  reloadPage,
  description,
  customComponent,
}: superadminpages) {
  const showSearchBar = title !== "All organization requests";

  // const { organization } = useAdmin() as AdminContext;
  // console.log(serachData.data);

  return (
    <div
      className="font-mono h-full shadow-3xl rounded-lg  flex flex-col ms-0 sm:ms-2 "
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row lg:flex-row sm:justify-center md:justify-between lg:justify-between ">
        <div className="flex flex-col p-4 sm:justify-center md:justify-start  lg:justify-start xl:ms-12 ">
          <div className="text-custom-orange text-3xl font-semibold mb-8 ">
            {title}
          </div>
          <div className="text-normal font-normal flex text-[#353535]  ">
            {description}
          </div>
        </div>

        {showSearchBar && (
          <div className="sm:w-64 md:w-80 lg:w-80 bg-white sm:bg-gray-100  flex-col flex  p-1 rounded-lg border-2 sm:border-gray-400  border-white max-h-32 mt-0 sm:mt-8 lg:shadow-md md:shadow-none sm:shadow-none ms-6 md:ms-2 lg:ms-0 mr-4">
            <div className="ms-4 mb-4 mt-0 sm:mt-2 ">
              <div className="hidden md:flex lg:flex font-normal text-gray-500 mb-4">
                {text}
              </div>

              {/* <div className="flex flex-row border-2 border-gray-400 bg-white rounded-lg sm:w-36 md:w-64 lg:w-64 h-10 md:h-8"></div> */}
              {serachData && (
                <div className="flex gap-2  items-center">
                  <ComboboxComponent
                    data={serachData.data}
                    select={serachData.select}
                    setSelect={serachData.setSelect}
                    placeholder={serachData.placeholder}
                  />
                  <button
                    onClick={serachData.handleAllBtn}
                    className="p-1 border-2 ring-2 ring-gray-400   rounded-sm"
                  >
                    <MdOutlineDensitySmall />
                  </button>
                  <button
                    onClick={serachData.handleSearchBtn}
                    className="p-1 border-2 ring-2 ring-gray-400   rounded-sm"
                  >
                    <IoSearch />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      {/* refresh button */}
      <div className="border-2   border-slate-400 ml-5 button p-1 rounded-xl w-24 xl:ms-16">
        <button onClick={reloadPage}>
          <div className="flex text-slate-500   justify-center items-center gap-1">
            <div>Refresh</div>
            <MdRefresh size={20} />
          </div>
        </button>
      </div>

      <div className="h-full">
        <div className=" md:w-[550px] lg:w-[720px] xl:w-[900px] ms-4 mt-6 xl:ms-12  h-[15rem] overflow-y-auto">
          {customComponent}
        </div>
      </div>
    </div>
  );
}

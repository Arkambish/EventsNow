import { useState } from "react";

import { useOrg } from "../OrgContext";
import { error, success } from "@/util/Toastify";
import { OrgContext, UserType } from "@/app/Type";
import { HiOutlineUserAdd } from "react-icons/hi";
import ComboboxComponent from "@/components/ComboboxComboboxComponent";
import { FetchPost } from "@/hooks/useFetch";
import { ca } from "date-fns/locale";

export type People = {
  id: number | string;
  name: string;
};

export default function InviteButton() {
  const { organization, isSlideBar, peopleEmail } = useOrg() as OrgContext;
  console.log(peopleEmail, "peopleEmail");

  const [email, setEmail] = useState<People>({ id: 0, name: "" });

  async function handleclick() {
    try {
      const data = await FetchPost({
        endpoint: "organization/inviteTeamMember",
        body: { email: email.name, organizationId: organization?._id },
      });

      if (data === "No User  exists") {
        error("No User  exists in the system");
      }
      if (data === "Email sent successfully") {
        success("Invitation sent successfully");
        setEmail({ id: 0, name: "" });
      }
    } catch (e) {
      error("Something went wrong while fetching data");
    }
  }

  return (
    <div className="flex gap-10 ">
      <div
        className={`flex flex-row  rounded-lg ${
          isSlideBar ? "md:w-48" : "md:w-72 "
        } sm:w-48 w-40   h-10`}
      >
        <ComboboxComponent
          data={peopleEmail}
          select={email}
          setSelect={setEmail}
          placeholder="Enter email address"
        />
      </div>
      <button
        className="bg-dashBtnBlue justify-center items-center font-semibold flex gap-2  button  px-2 text-white rounded-lg"
        onClick={handleclick}
      >
        <HiOutlineUserAdd size={19} />
        Invite
      </button>
    </div>
  );
}

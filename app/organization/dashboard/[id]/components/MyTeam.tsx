import React, { useState } from "react";
import { useOrg } from "../OrgContext";

import EmptyStateComponent from "@/components/EmptyStateComponent";
import PersonDetailsBar from "./PersonDetailsBar";
import GivenPermission from "./modal/GivenPermission";
import AllPermission from "./modal/AllPermission";
import PermissionOneEvent from "./modal/PermissionOneEvent";
import SelectOneEvent from "./modal/SelectOneEvent";

import InviteButton from "./InviteButton";
import { MdRefresh } from "react-icons/md";
import Spinner from "@/components/Spinner";
import { OrgContext, OrganizationTeamType } from "@/app/Type";

export default function MyTeam() {
  const { modal, team, id, setTeam, organization } = useOrg() as OrgContext;
  const [loading, setLoading] = useState<boolean>(false);

  async function handleTeam() {
    setLoading(true);
    const res2 = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/permission/getOrganiztionUsers/${id}`
    );

    const organizationTeam: OrganizationTeamType[] = await res2.json();

    const team = organizationTeam.filter(
      (user: OrganizationTeamType) => user.userData.email !== organization.email
    );

    setTeam(team);

    setLoading(false);
  }

  function handleModal() {
    switch (modal) {
      case "givenPermission":
        return <GivenPermission />;
      case "allPermission":
        return <AllPermission />;
      case "permissionOneEvent":
        return <PermissionOneEvent />;
      case "selectOneEvent":
        return <SelectOneEvent />;
      case "":
        return;
    }
  }
  return (
    <div className="flex pl-5 rounded-lg  shadow-3xl  md:ml-2 bg-[#fff] pt-8 md:pl-12 flex-col justify-start items-start gap-12">
      <div className="flex flex-col gap-3 justify-start items-start">
        <div className="text-3xl font-semibold text-custom-orange	font-IBM">
          MY TEAM
        </div>
        <div className="text-base text-[#848484] font-normal">
          Invite your team, Streamline your organization works
        </div>
      </div>
      <div>
        <InviteButton />
      </div>
      <div className="w-full border-[1px] border-black"></div>
      <div className=" mb-5 w-full 2xl:w-3/5 xl:w-3/4 flex flex-col gap-4 justify-start md:px-6 px-0 items-start  rounded-xl">
        <div className="border-2 button p-1 rounded-xl">
          <button onClick={handleTeam}>
            <div className="flex text-slate-500  justify-center items-center gap-3">
              <div>Refresh</div>
              <MdRefresh size={20} />
            </div>
          </button>
        </div>
        {loading ? (
          <Spinner />
        ) : team.length === 0 ? (
          <EmptyStateComponent message="No user in the organization" />
        ) : (
          team.map((user) => (
            <>
              <PersonDetailsBar
                key={user.userData._id}
                name={user.userData.firstName}
                email={user.userData.email}
                permissionDocumentId={user.permissionDocumentId}
                globalPermission={user.globalPermission}
                eventPermission={user.eventPermission}
              />
            </>
          ))
        )}

        {handleModal()}
      </div>
    </div>
  );
}

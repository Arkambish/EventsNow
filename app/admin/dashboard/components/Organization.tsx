import React, { useState } from "react";
import SuperadminPages from "@/app/admin/dashboard/components/SuperadminPages";
import Available_Orgs from "@/app/admin/dashboard/components/Available_Orgs";
import { useAdmin } from "../AdminContextFile";
import EmptyStateComponent from "@/components/EmptyStateComponent";

import { getAllOrganization } from "../FetchData";
import Spinner from "@/components/Spinner";
import { AdminContext, OrganizationType } from "@/app/Type";
import { People } from "@/app/organization/dashboard/[id]/components/InviteButton";

export default function Organization() {
  const { organization, setOrganization, setNotification } =
    useAdmin() as AdminContext;
  const [filterOrganizationData, setFilterOrganizationData] =
    useState<OrganizationType[]>(organization);
  const [selectOrganization, setSelectOrganization] = useState<People>({
    id: "",
    name: "",
  });

  function handleSearchBtn() {
    console.log(selectOrganization);
    if (selectOrganization.name === "") {
      setFilterOrganizationData(organization);
      return;
    }
    setFilterOrganizationData(() => {
      return organization.filter(
        (org) => org.organizationName === selectOrganization.name
      );
    });
  }

  function handleAllBtn() {
    setSelectOrganization({ id: "", name: "" });
    setFilterOrganizationData(organization);
  }
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const searchOrganizationData = organization.map((org: OrganizationType) => ({
    id: org._id,
    name: org.organizationName,
  }));

  async function reloadPage() {
    setIsLoading(true);

    const res3 = await getAllOrganization();

    if (!res3.ok) {
      setIsLoading(false);
      return;
    }

    const { organization } = await res3.json();

    const resActive = organization.filter(
      (org: OrganizationType) => org.isActive
    );
    const notActive = organization.filter(
      (org: OrganizationType) => !org.isActive
    );

    if (resActive.length !== 0) {
      setOrganization(resActive);
    }
    if (notActive.length !== 0) {
      setNotification(notActive);
    }
    setIsLoading(false);
  }

  const serachData = {
    data: searchOrganizationData,
    select: selectOrganization,
    setSelect: setSelectOrganization,
    handleSearchBtn,
    placeholder: "Organizations name",
    handleAllBtn,
  };

  return (
    <>
      <SuperadminPages
        serachData={serachData}
        title="All Organizations"
        description="You can see all the organizations that currently available from here"
        text="Search Organizations"
        reloadPage={reloadPage}
        customComponent={
          <>
            {isLoading ? (
              <Spinner />
            ) : organization.length === 0 ? (
              <EmptyStateComponent message="No Events" />
            ) : (
              filterOrganizationData.map((me) => (
                <Available_Orgs key={me._id} organization={me} />
              ))
            )}
          </>
        }
      />
    </>
  );
}

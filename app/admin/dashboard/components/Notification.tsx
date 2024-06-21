import React, { useState } from "react";
import SuperadminPages from "./SuperadminPages";
// import Org_RequestHandle from "./Org_RequestHandle";
import { useAdmin } from "../AdminContextFile";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import Spinner from "@/components/Spinner";
import { getAllOrganization } from "../FetchData";
import { AdminContext, OrganizationType } from "@/app/Type";
import Org_RequestHandle from "./Org_RequestHandle";

export default function Notification() {
  const { notification, setOrganization, setNotification } =
    useAdmin() as AdminContext;
  const [isLoading, setIsLoading] = useState<boolean>(false);

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

    // if (resActive.length !== 0) {
    //   setOrganization(resActive);
    // }
    // if (notActive.length !== 0) {
    //   setNotification(notActive);
    // }

    setOrganization(resActive);
    setNotification(notActive);
    
    setIsLoading(false);
  }

  return (
    <>
      <SuperadminPages
        title="All Organization requests"
        description="Check organization requests and handle them."
        text="Search"
        reloadPage={reloadPage}
        customComponent={
          <>
            {isLoading ? (
              <Spinner />
            ) : notification.length === 0 ? (
              <div className="">
                <EmptyStateComponent message="No Organization" />
              </div>
            ) : (
              notification.map((org) => (
                <Org_RequestHandle key={org._id} organization={org} />
              ))
            )}
          </>
        }
      />
    </>
  );
}

import React, { useEffect, useState } from "react";
import SuperadminPages from "@/app/admin/dashboard/components/SuperadminPages";
import Superadminevents from "./Superadminevent";
import Spinner from "@/components/Spinner";
import OrganizationPayment from "./OrganizationPayment";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import { AdminContext, OrganizationType } from "@/app/Type";
import { People } from "@/app/organization/dashboard/[id]/components/InviteButton";

// const paymentsOrganization = async () => {
// const response = await fetch(
//   `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/getOrganizationHasPayment`
// );
// const data = await response.json();
// return data;
// };

export default function Payments() {
  // const organizationData = await paymentsOrganization();
  const [organizationData, setOrganizationData] = React.useState<
    OrganizationType[]
  >([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const [filterOrganizationData, setFilterOrganizationData] = useState<
    OrganizationType[]
  >([]);

  const [selectOrganization, setSelectOrganization] = useState<People>({
    id: "",
    name: "",
  });

  const searchEventData = organizationData.map((org: OrganizationType) => ({
    id: org._id,
    name: org.organizationName,
  }));

  function handleSearchBtn() {
    if (selectOrganization.name === "") {
      setFilterOrganizationData(organizationData);
      return;
    }
    setFilterOrganizationData(() => {
      return organizationData.filter(
        (org) => org.organizationName === selectOrganization.name
      );
    });
  }

  function handleAllBtn() {
    setSelectOrganization({ id: "", name: "" });
    setFilterOrganizationData(organizationData);
  }

  const serachData = {
    data: searchEventData,
    select: selectOrganization,
    setSelect: setSelectOrganization,
    handleSearchBtn,
    placeholder: "Event name",
    handleAllBtn,
  };

  async function paymentsOrganizationData() {
    setIsLoading(true);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/getOrganizationHasPayment`,

      { cache: "force-cache" }
    );
    const data = await response.json();
    return data;
  }

  async function reloadPage() {
    const data = await paymentsOrganizationData();
    setOrganizationData(data);
    setIsLoading(false);
  }

  useEffect(() => {
    async function paymentsOrganization() {
      setIsLoading(true);
      const data = await paymentsOrganizationData();
      setOrganizationData(data);
      setFilterOrganizationData(data);

      setIsLoading(false);
    }
    paymentsOrganization();
  }, []);

  return (
    <>
      <SuperadminPages
        serachData={serachData}
        title="Payments Page"
        description="You can get all the details about payments from here"
        text="Search Payments"
        reloadPage={reloadPage}
        customComponent={
          <>
            {isLoading ? (
              <Spinner />
            ) : organizationData.length === 0 ? (
              <EmptyStateComponent message="No Events" />
            ) : (
              filterOrganizationData.map((me: OrganizationType) => (
                <OrganizationPayment key={me._id} organization={me} />
              ))
            )}
          </>
        }
      />
    </>
  );
}

import React from "react";
import SuperadminPages from "@/app/admin/dashboard/components/SuperadminPages";
import Superadminevents from "./Superadminevent";
import Spinner from "@/components/Spinner";
import OrganizationPayment from "./OrganizationPayment";
import EmptyStateComponent from "@/components/EmptyStateComponent";
import { AdminContext, OrganizationType } from "@/app/Type";

const paymentsOrganization = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/getOrganizationHasPayment`
  );
  const data = await response.json();
  return data;
};

export default async function Payments() {
  const organizationData = await paymentsOrganization();
  return (
    <div>
      <SuperadminPages
        title="Payments Page"
        description="You can get all the details about payments from here"
        text="Search Payments"
        customComponent={
          <>
            {organizationData.length === 0 ? (
              <EmptyStateComponent message="No Events" />
            ) : (
              organizationData.map((me: OrganizationType) => (
                <OrganizationPayment key={me._id} organization={me} />
              ))
            )}
          </>
        }
      />
    </div>
  );
}

import React, { use } from "react";
import { useOrg } from "../OrgContext";
import { OrgContext } from "@/app/Type";

interface CheckPermissionProps {
  provideGlobalPermission?: string[];

  children: React.ReactNode;
}

function CheckPermission({
  children,
  provideGlobalPermission = [],
}: CheckPermissionProps) {
  const { userPermission } = useOrg() as OrgContext;

  const global = provideGlobalPermission.filter((permission) =>
    userPermission.globalPermission.includes(permission)
  );

  if (
    global.length > 0 ||
    userPermission.globalPermission.includes("allPermission")
  ) {
    return <div>{children}</div>;
  }
  return null;
}

export default CheckPermission;

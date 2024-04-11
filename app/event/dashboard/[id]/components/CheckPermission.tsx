import React from "react";
import { EventContextType, UseEventContext } from "../EventDashContext";

interface CheckPermissionProps {
  provideGlobalPermission?: string[];
  provideEventPermission?: string[];
  children: React.ReactNode;
}

function CheckPermission({
  children,
  provideGlobalPermission = [],
  provideEventPermission = [],
}: CheckPermissionProps) {
  const { globalPermission, eventPermission } =
    UseEventContext() as EventContextType;

  const global = provideGlobalPermission.filter((permission) =>
    globalPermission.includes(permission)
  );

  const event = provideEventPermission.filter((permission) =>
    eventPermission.includes(permission)
  );

  if (
    global.length > 0 ||
    event.length > 0 ||
    globalPermission.includes("allPermission")
  ) {
    return <div>{children}</div>;
  }
  return null;
}

export default CheckPermission;

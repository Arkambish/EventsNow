import React from "react";
import CheckActive from "./components/CheckActive";
import { OrgContextProvider } from "./OrgContext";

export default function Organization({
  params: { id },
}: {
  params: { id: string };
}) {
  return (
    // h-[30rem] overflow-hidden
    <div className="py-5 ">
      <OrgContextProvider>
        <CheckActive />
      </OrgContextProvider>
    </div>
  );
}

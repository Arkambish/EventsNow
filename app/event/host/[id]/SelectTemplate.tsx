"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Template from "./template1/Template1";
import { EventType } from "@/app/Type";
import NoPreviewPage from "../../dashboard/[id]/components/NoPreviewPage";
import TemplateBlack from "./template2/Template2";

export type Post = {
  _id: string;
  userImage: string;
  userName: string;
  description: string;
  image: string;
  like: number;
  likeBy: any;
  eventId: string;
  __v: number;
  createdAt: string;
  updatedAt: string;
};

export default function SelectTemplate({
  event,
  preview,
}: {
  event: EventType;
  preview?: boolean;
}) {
  console.log(event.template);
  return (
    <div>
      {event.template === "template1" && (
        <Template event={event} preview={false} />
      )}
      {event.template === "template2" && (
        <TemplateBlack event={event} preview={false} />
      )}
    </div>
  );
}

import React, { useState } from "react";
import SelectTemplate from "./SelectTemplate";
import PageBuilder from "./components/PageBuilder";

async function getData({ id }: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/event/getEvent/${id}`,
    {
      next: { revalidate: 10 },
    }
  );

  const data = await res.json();

  return data;
}

export default async function Home({ params }: any) {
  const data = await getData(params);

  console.log(data.hostPageType);

  if (data.hostPageType === "template") {
    return (
      <div>
        <SelectTemplate event={data} />
      </div>
    );
  }

  if (data.hostPageType === "pageBuilder") {
    return (
      <div>
        <PageBuilder page={data.pageBuilder} EventName={data.eventName} />
      </div>
    );
  }

  if (data.hostPageType === "uploadPage") {
    return (
      <div>
        <PageBuilder page={data.uploadPage} EventName={data.eventName} />
      </div>
    );
  }

  // const posts = await getAllPosts(params);
}

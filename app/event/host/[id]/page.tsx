import React, { useState } from "react";
import SelectTemplate from "./SelectTemplate";

async function getData({ id }: any) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/event/getEvent`,
    {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(id),
    }
  );

  const data = await res.json();

  return data;
}

export default async function Home({ params }: any) {
  const data = await getData(params);
  // const posts = await getAllPosts(params);

  return (
    <div>
      <SelectTemplate event={data} />
    </div>
  );
}

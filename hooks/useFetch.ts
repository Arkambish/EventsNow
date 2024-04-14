import { error } from "@/util/Toastify";

type PostFetchProps = {
  endpoint: string;
  body: object;
};

type GetFetchProps = {
  endpoint: string;
};

export const FetchPost = async ({ endpoint, body = {} }: PostFetchProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/${endpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    error("Something went wrong while fetching data");
  }

  const data = await response.json();
  return data;
};

export const FetchPut = async ({ endpoint, body = {} }: PostFetchProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/${endpoint}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    error("Something went wrong while fetching data");
  }

  const data = await response.json();
  return data;
};

export const FetchGet = async ({ endpoint }: GetFetchProps) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/${endpoint}`
  );

  if (!response.ok) {
    error("Something went wrong while fetching data");
  }

  const data = await response.json();
  return data;
};

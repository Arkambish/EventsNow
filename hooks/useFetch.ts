import { error } from "@/util/Toastify";

type PostFetchProps = {
  endpoint: string;
  body: object;
};

type GetFetchProps = {
  endpoint: string;
};

export const FetchPost = async ({ endpoint, body = {} }: PostFetchProps) => {
  try {
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
      error("Something went wrong while fetching data from post request");
      return;
    }

    const data = await response.json();

    return data;
  } catch (e) {
    console.log(e);
    error("Something went wrong");
    return;
  }
};

export const FetchPut = async ({ endpoint, body = {} }: PostFetchProps) => {
  try {
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
  } catch (e) {
    console.log(e);
    return;
  }
};

export const FetchGet = async ({ endpoint }: GetFetchProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_URL}/api/v1/${endpoint}`
    );
    console.log(endpoint);
    if (!response.ok) {
      error("Something went wrong while fetching data");
    }

    const data = await response.json();
    return data;
  } catch (e) {
    console.log(e);
    return;
  }
};

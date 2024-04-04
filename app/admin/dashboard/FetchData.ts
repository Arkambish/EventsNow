export const getAllOrganization = async () => {
  const Org = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/organization/getAllOrganization`,
    {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );
  return Org;
};

export const getAllUser = async () => {
  const user = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/user/getAllUser`,
    {
      cache: "no-store",
      headers: {
        "Cache-Control": "no-cache",
      },
    }
  );
  return user;
};

export const getAllEvents = async () => {
  const event = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/event/getAllEvents`,
    {
      next: {
        revalidate: 1,
      },
    }
  );
  return event;
};

import React, { useState } from "react";
import SuperadminPages from "@/app/admin/dashboard/components/SuperadminPages";
import AdminPersonDetailsBar from "./AdminPersonalDetailBar";

import { useAdmin } from "../AdminContextFile";
import { getAllUser } from "../FetchData";
import Spinner from "@/components/Spinner";
import { AdminContext, UserType } from "@/app/Type";
import { People } from "@/app/organization/dashboard/[id]/components/InviteButton";

export default function Notification() {
  const { user, setUser } = useAdmin() as AdminContext;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [filterUserData, setFilterUserData] = useState<UserType[]>(user);

  const [selectUser, setSelectUser] = useState<People>({
    id: "",
    name: "",
  });

  const searchEventData = user.map((user: UserType) => ({
    id: user._id,
    name: user.firstName,
  }));

  function handleSearchBtn() {
    if (selectUser.name === "") {
      setFilterUserData(user);
      return;
    }
    setFilterUserData(() => {
      return user.filter((user) => user.firstName === selectUser.name);
    });
  }

  function handleAllBtn() {
    setSelectUser({ id: "", name: "" });
    setFilterUserData(user);
  }

  const serachData = {
    data: searchEventData,
    select: selectUser,
    setSelect: setSelectUser,
    handleSearchBtn,
    placeholder: "User first name",
    handleAllBtn,
  };

  async function reloadPage() {
    setIsLoading(true);

    const res = await getAllUser();

    if (!res.ok) {
      setIsLoading(false);
      return;
    }

    const finalRes = await res.json();

    setUser(finalRes);
    setIsLoading(false);
  }

  return (
    <>
      <SuperadminPages
        serachData={serachData}
        title="All Users"
        description="You can see all the users that currently available from here"
        text="Search Users"
        reloadPage={reloadPage}
        customComponent={
          <>
            {isLoading ? (
              <Spinner />
            ) : user.length > 0 ? (
              filterUserData.map((use) => (
                <AdminPersonDetailsBar
                  key={use._id}
                  name={use.firstName}
                  email={use.email}
                  userId={use._id}
                  role={use.role}
                  setUser={setUser}
                />
              ))
            ) : (
              <p>No users available.</p>
            )}
          </>
        }
      />
    </>
  );
}

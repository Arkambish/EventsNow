"use client";
import React, { useState } from "react";
import Container from "./Container";
import { MdArrowBack } from "react-icons/md";
import { EventContextType, UseEventContext } from "../EventDashContext";
import Post from "./Post";
import { Post as PostType } from "@/app/event/host/[id]/components/PostTab";
import EmptyStateComponent from "@/components/EmptyStateComponent";

export default function EditPost() {
  const { setStatus, eventPosts ,setEventPosts} = UseEventContext() as EventContextType;

  return (
    <Container>
      <button className="button mt-5" onClick={() => setStatus("campaign")}>
        <div className="text-white rounded-full bg-custom-orange p-1 w-8 flex justify-center">
          <MdArrowBack size={20} />
        </div>
      </button>
      <div className="lg:pl-10 mb-5 grid gap-2  md:mr-10 pb-8">
        <div className="  gap-3 flex text-custom-orange font-medium text-3xl ">
          Edit Post
        </div>
        <div className=" text-[#455273]  mr-8">
          You can edit the post that you have created.
        </div>
      </div>
      <div className="h-[40rem] overflow-auto">
        {eventPosts.length === 0 && eventPosts ? 
        eventPosts.map((post: PostType) => (
          <Post
            likes={post.like}
            key={post._id}
            id={post._id}
            profilePic={post.userImage}
            name={post.userName}
            caption={post.description}
            post={post.image}
            eventPosts={eventPosts}
            setEventPosts={setEventPosts}
          />
        )):<EmptyStateComponent message="No post to edit" />}
      </div>
    </Container>
  );
}

"use client";
import React, { useEffect, useState } from "react";
import Container from "./Container";
import { MdArrowBack } from "react-icons/md";
import { EventContextType, UseEventContext } from "../EventDashContext";
import Post from "./Post";
import { useParams } from "next/navigation";

import EmptyStateComponent from "@/components/EmptyStateComponent";

export default function EditPost() {
  const { setStatus,eventPosts,setEventPosts } = UseEventContext() as EventContextType;
  // const [postData, setPostData] = useState([]);
  // const params = useParams<{ id: string }>();
  // const [loading, setLoading] = useState(false);


  // useEffect(() => {
  //   setLoading(true);
  //   const getPosts = async () => {
  //     const res = await fetch(`/api/v1/post/getAllPostEvent/${params.id}`);
  //     const data = await res.json();

  //     console.log(data);
  //     setPostData(data);
  //     console.log(postData);
  //     setLoading(false);
  //     return data;
  //   };
  //   getPosts();
  // }, []);

  return (
    <Container>
      <button className="button mt-5" onClick={() => setStatus("campaign")}>
        <div className="text-white rounded-full bg-stone-600 p-1 w-8 flex justify-center">
          <MdArrowBack size={20} />
        </div>
      </button>
      <div className="lg:pl-10 mb-5 grid gap-2  md:mr-10 pb-4">
        <div className="  gap-3 flex text-stone-600 font-medium text-3xl ">
          Edit Post
        </div>
        <div className=" text-[#455273]  mr-8">
          You can edit the post that you have created.
        </div>
      </div>
{eventPosts.length > 0 && <div className="h-[40rem] overflow-auto">
        {(eventPosts.length === 0 || eventPosts) && (
          eventPosts.map((post: any) => (
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
          ))
        ) }
      </div>}
      
          {eventPosts.length ===0 &&<EmptyStateComponent message="No post to edit" />}
        
    </Container>
  );
}

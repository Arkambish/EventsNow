"use client";

import Image from "next/image";
import React, { useEffect} from "react";

import { useState } from "react";
import { EventContextType, UseEventContext } from "../EventDashContext";

import { getSession } from "next-auth/react";
import { Session } from "next-auth";

import { error, success } from "@/util/Toastify";

import { IoMdSettings } from "react-icons/io";
import { IoSave } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import Modal from "@/components/Modal";
import { Dialog } from "@headlessui/react";


interface Post {
  profilePic: string;
  name: string;
  caption: string;
  post: string;
  id: string;
  likes: number;
  eventPosts:any;
  setEventPosts: any;
}

export type User = {
  user: {
    image: string;
    email: string;
    name: string;
  };
  expires: string;
};

export default function Post({
  profilePic,
  name,
  caption,
  post,
  id,
  likes,
  eventPosts,
  setEventPosts
}: Post) {
  
  const [captionText, setCaptionText] = useState(caption);

  const [commentCount, setCommentCount] = useState(0);

  const [user, setUser] = useState<User | Session>({
    user: { image: "", email: "", name: "" },
    expires: "",
  });

  const [checkEditCaption, setcheckEditCaption] = useState(false);

  const [visible, setVisible] = useState(false);
 

 

 



  useEffect(() => {
    const getComment = async () => {
      const user = await getSession();

      if (user) {
        setUser(user);
      }

      const res = await fetch("/api/v1/post/getCommentsByPost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      setCommentCount(data.data.length);
    };
    getComment();
  }, [id]);


  

  async function saveCaption() {
    if (caption !== captionText) {
      const res = await fetch("/api/v1/post/updatePost", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          description: captionText,
        }),
      });

      if (!res.ok) {
        error("Error in updating caption");
      }
      success("Caption updated successfully");
    }

    setcheckEditCaption(false);
  }
  const handleDeletePost = async () => {
    const res = await fetch("/api/v1/post/deletePost", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    if (res.ok) {
      success("Post deleted successfully");
      const updatedPosts = eventPosts.filter((post : any) => post._id !== id);
      setEventPosts(updatedPosts);
    } else {
      error("Error in deleting post");
    }
  }

  return (
    <>
    

{visible && (
  <Modal setIsOpen={setVisible} isOpen={visible}>
    <Dialog.Title
      as="h3"
      className="text-lg font-medium leading-6 text-gray-900"
    >
      Are you sure want to delete the post ?
    </Dialog.Title>
    <div className="mt-2">
      <p className="text-sm text-gray-500">
        Once you delete the post, it cannot be recovered.
      </p>
    </div>
    <div className="mt-4 flex gap-4">
      <button
        type="button"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-rose-700 border border-transparent rounded-md hover:bg-rose-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={handleDeletePost}
      >
        Delete
      </button>
      <button
        type="button"
        className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
        onClick={() => setVisible(false)}
      >
        Cancel
      </button>
    </div>
    

  </Modal>
)}
    
      <div className="xl:w-[500px] sm:w-[24rem] w-[20rem] border border-zinc-900 text-white m-8 rounded-2xl pb-4">
        <div className="p-5 pt-5">
          <div className="flex gap-7 items-center mb-4 justify-between">
            <div className="flex items-center gap-4">
            <Image
              src={`${profilePic}`}
              alt="profile picture"
              width={60}
              height={10}
              className="rounded-full border-rose-700 border-2"
            />
            <div>
              <div className="text-black sm:text-24 text-base font-semibold font-Inter">
                {name}
              </div>
            </div>
            </div>
            <button className=" button" onClick={()=>setVisible(true)}>
            <MdDeleteOutline
            className="mx-1"
            color="black" 
            size={27}/>
            </button>
          </div>
          <div className="flex justify-between">
            <input
              disabled={checkEditCaption ? false : true}
              onChange={(e) => setCaptionText(e.target.value)}
              value={captionText}
              type="text"
              className={` ${checkEditCaption?"bg-white":" bg-transparent"} w-11/12 text-black  font-Inter outline-none`}
            />

            {checkEditCaption ? (
              <button onClick={saveCaption} className="text-black button m-auto">
                <IoSave size={22} />
              </button>
            ) : (
              <button onClick={()=>setcheckEditCaption(true)} className="text-black button m-auto">
                <IoMdSettings size={22} />
              </button>
            )}
          </div>
        
        </div>
        <button>
          <Image
            src={`${post}`}
            alt="post"
            width={661}
            height={363}
            className="fit"
          />
        </button>
        <div className="px-5 my-2 mb-2">
          <div className="flex gap-4 sm:w-32 w-24">
          
          </div>
        

          <div className="text-black font-Inter">
            {`${likes} likes`}
          </div>
          
            <div className="text-black font-Inter">
              {` ${commentCount} comments`}
            </div>
         

        </div>
      </div>
    </>
  );
}



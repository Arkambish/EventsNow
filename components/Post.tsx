"use client";

import Image from "next/image";
import React, { use, useEffect, useRef } from "react";
import styles from "./Post.module.css";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import SendIcon from "@mui/icons-material/Send";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";
import { IoIosSend } from "react-icons/io";
import { BsSend } from "react-icons/bs";
import CreatePost from "@/app/event/dashboard/[id]/components/post/CreatePost";
import CommentBox from "./CommentBox";
import CommentBtn from "./CommentBtn";
import { IoMdHeart } from "react-icons/io";
import { success } from "@/util/Toastify";
import {
  FacebookShareButton,
  FacebookShareCount,
  TwitterShareButton,
} from "react-share";
import { set } from "mongoose";
import { FaRegComment } from "react-icons/fa6";
import { IoShareSocialOutline } from "react-icons/io5";
import { IoHeartOutline, IoHeartSharp } from "react-icons/io5";
import { FiSend } from "react-icons/fi";

interface Post {
  profilePic: string;
  name: string;
  caption: string;
  post: string;
  id: string;
  likes: number;
  liked: boolean;
  // email: string;
}

export type User = {
  user: {
    image: string;
    email: string;
    name: string;
  };
  expires: string;
};

type Comment = {
  _id: string;
  userImage: string;
  userName: string;
  postId: string;
  description: string;
  userId: string;
};

export default function Post({
  profilePic,
  name,
  caption,
  post,
  id,
  likes,
  liked,
}: // email,
Post) {
  const [like, setLike] = useState(likes);
  const [allComment, setAllComment] = useState<Comment[]>([]);
  const [comment, setComment] = useState("");
  const [isComment, setIsComment] = useState(false);
  const [isLike, setIsLike] = useState(liked);
  const [hasComment, setHasComment] = useState(false);
  const [isShare, setIsShare] = useState(false);

  const [userId, setUserId] = useState("");
  const [userName, setUserName] = useState<string | null>();

  const [user, setUser] = useState<User | Session>({
    user: { image: "", email: "", name: "" },
    expires: "",
  });

  const commentRef = useRef<HTMLDivElement>(null);

  // handle comment button
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        commentRef.current &&
        !commentRef.current.contains(event.target as Node)
      ) {
        // Clicked outside of modal, so close it
        setIsComment(false);
      }
    };

    // Add event listener when the modal is open
    if (isComment) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      // Remove event listener when the modal is closed
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isComment, setIsComment]);

  // useEffect(() => {
  //   const getUser = async () => {
  //     const userData = await fetch("/api/v1/user/getUserId", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         email: user?.user?.email,
  //       }),
  //     });
  //     const userID  = await userData.json();
  //  setUserId(userID.id);
  //   }

  //  getUser();

  // }, [user]);

  useEffect(() => {
    const getUser = async () => {
      const userData = await fetch("/api/v1/user/getOneUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user?.user?.email,
        }),
      });
      const data = await userData.json();
      if (data && data.data) {
        if (data.data.firstName) {
          setUserName(data.data.firstName);
        }
        if (data.data._id) {
          setUserId(data.data._id);
        }
      }
    };

    getUser();
  }, [user]);

  useEffect(() => {
    const getUser = async () => {
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

      setAllComment(data.data);
    };
    getUser();
  }, [id]);

  function handleCommentBtn() {
    allComment.length > 0 ? setHasComment((comment) => !comment) : "";
  }

  async function handleClickLikeButton() {
    setIsLike(true);

    const like = await fetch("/api/v1/post/likePost", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        type: "like",
        email: user?.user?.email,
      }),
    });

    if (!like.ok) {
      return;
    }
    setLike((prev) => prev + 1);
  }

  async function handleClickOffLikeButton() {
    setIsLike(false);
    const like = await fetch("/api/v1/post/likePost", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        email: user?.user?.email,
        type: "dislike",
      }),
    });

    if (!like.ok) {
      return;
    }

    setLike((prev) => prev - 1);
  }

  function handleClickCommentButton() {
    isShare ? setIsShare(false) : "";
    isComment ? setIsComment(false) : setIsComment(true);
  }

  function handleClickShareButton() {
    isComment ? setIsComment(false) : "";
    isShare ? setIsShare(false) : setIsShare(true);
  }

  //send comment
  async function sentComment() {
    if (comment.length > 0) {
      const res = await fetch("/api/v1/post/createComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          userName: userName,
          userImage: user?.user?.image,
          postId: id,
          description: comment,
        }),
      });
      const data = await res.json();

      if (data.message === "comment created successfully") {
        setComment("");
        setIsComment(false);
        setAllComment((prev) => [
          ...prev,
          {
            _id: data.comment._id,
            userImage: data.comment.userImage,
            userName: data.comment.userName,
            postId: data.comment.postId,
            description: data.comment.description,
            userId: data.comment.userId,
          },
        ]);

      
      }
    }
  }

  return (
    <div className="xl:w-[500px] sm:w-[24rem] w-[20rem] border border-zinc-900 text-white m-8 rounded-2xl pb-4">
      <div className="px-5 pt-2">
        <div className="flex gap-7 items-center mb-4">
          <Image
            src={`${profilePic}`}
            alt="profile picture"
            width={50}
            height={10}
            className="rounded-full  border-rose-700 border-2"
          />

          <div className="">
            <div className="text-black sm:text-24 text-base  font-semibold font-Inter">
              {name}
            </div>
            <div className="text-black mt-2 font-Inter">"{caption}"</div>
          </div>
        </div>
      </div>

      <Image
        src={`${post}`}
        alt="post"
        width={661}
        height={363}
        className="fit rounded-sm border-y-2"
      />

      <div className=" content-start px-5">
        <div className="flex gap-5 py-2">
          {isLike ? (
            <button className={styles.zoom} onClick={handleClickOffLikeButton}>
              <IoHeartSharp color="#ed3e4f" size={30} />
            </button>
          ) : (
            <button className={styles.zoom} onClick={handleClickLikeButton}>
              <IoHeartOutline color="#535454" size={30} />
            </button>
          )}

          <button
            className={`${styles.zoom} my-auto `}
            onClick={() => handleClickCommentButton()}
          >
            <FaRegComment color="#535454" size={26} />
          </button>
          <button
            className={styles.zoom}
            onClick={() => handleClickShareButton()}
          >
            <IoShareSocialOutline color="#535454" size={28} />
          </button>
        </div>
        {isComment && (
          <div ref={commentRef} className="mt-2 mb-2 items-center flex gap-4 ">
            <Image
              src={user?.user?.image ?? ""}
              alt="user-photo"
              width={35}
              height={35}
              className="rounded-full mt-1"
            />
            <div className="flex p-1 content-center border rounded-3xl px-4">
              <input
                type="text"
                className="outline-none  text-black "
                placeholder="Write a comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              />
              <button
                onClick={sentComment}
                disabled={comment.length > 0 ? false : true}
              >
                <FiSend
                  size={22}
                  className={`${
                    comment.length > 0
                      ? "text-slate-600"
                      : "text-slate-400 cursor-not-allowed"
                  }`}
                />
              </button>
            </div>
          </div>
        )}
        {isShare && (
          <div className="flex gap-3 mb-3 mt-3 mx-6">
            <FacebookShareButton url={`${post}`}>
              <Image
                src={"/images/reusableComponents/FacebookIconPost.svg"}
                alt="facebook"
                width={40}
                height={34}
                className={styles.zoom}
              />
            </FacebookShareButton>
            <TwitterShareButton url={`${post}`}>
              <Image
                src={"/images/reusableComponents/TwitterIconPost.svg"}
                alt="twtter"
                width={40}
                height={34}
                className={styles.zoom}
              />
            </TwitterShareButton>
            <Image
              src={"/images/reusableComponents/InstagramIconPost.svg"}
              alt="instagram"
              width={40}
              height={34}
              className={styles.zoom}
            />
            <Image
              src={"/images/reusableComponents/threads-app-icon.svg"}
              alt="threads"
              width={31}
              height={28}
              className={styles.zoom}
            />
          </div>
        )}

        {like > 0 && (
          <div className="text-black font-Inter font-semibold ">
            {` ${like} likes`}
          </div>
        )}
        {allComment.length > 0 && (
          <button onClick={handleCommentBtn}>
            <div className="text-neutral-500 font-Inter ">
              {`View all ${allComment.length} comments`}
            </div>
          </button>
        )}

        {hasComment ? (
          <div className="grid gap-2 mt-4 max-h-36 overflow-y-scroll ">
            {allComment.map((comment) => (
              <CommentBtn
                allComments={allComment}
                setAllComment={setAllComment}
                canDelete={userId === comment.userId ? true : false}
                id={comment._id}
                key={comment._id}
                userImage={comment.userImage}
                userName={comment.userName}
                description={comment.description}
              />
            ))}
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

{
  /* function commentBtn({user}: {user: User | Session}) {
  return (
    <>
      <Image
        src={user?.user?.image ?? ""}
        alt="user-photo"
        width={35}
        height={35}
        className="rounded-full mt-1"
      />
      <div className=" text-black p-1 pl-2 pr-2 flex items-center">
        it is a great event
      </div>
    </>
  );
} */
}

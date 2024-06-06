import React, { useState, useEffect } from "react";
import Image from "next/image";
import Post from "@/components/Post";
import Spinner from "@/components/Spinner";
import { getSession } from "next-auth/react";
import EmptyStateComponent from "@/components/EmptyStateComponent";

export interface Post {
  _id: string;
  userImage: string;
  userName: string;
  description: string;
  image: string;
  like: number;
  likeBy: any;
}
import { useParams } from "next/navigation";
import { Post as PostType } from "../SelectTemplate";

export default function PostTab() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const [email, setEmail] = useState<string | null | undefined>("");
  const { id } = useParams();

  interface CustomUser {
    _id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    image: string;
    wishListId: string;
    registeredUser: boolean;
    // Add any other properties you expect in your user object here
  }

  useEffect(() => {
    setLoading(true);

    const postFunction = async () => {
      const res = await fetch(`/api/v1/post/getAllPostEvent/${id}`);
      const data = await res.json();

      setData(data);

      setLoading(false);
    };
    postFunction();
  }, [id, email]);

  useEffect(() => {
    const getUser = async () => {
      const session = await getSession();
      setEmail(session?.user?.email);
    };
    getUser();
  }, []);

  function checkLike({ post }: any) {
    {
      const like = post.likeBy.find((like: any) => like.email === email);
      if (like) {
        return true;
      } else {
        return false;
      }
    }
  }

  return (
    <div className="overflow-y-auto h-screen         sm:mt-12 mt-1 xl:ml-10 md:ml-20  w-full  grid   justify-center  ">
      
        {loading ? (
          <div className="w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : data.length > 0 ? (
          data.map((post: PostType) => (
            <Post
              liked={checkLike({ post })}
              // email={email}
              likes={post.like}
              key={post._id}
              id={post._id}
              profilePic={post.userImage}
              name={post.userName}
              caption={post.description}
              post={post.image}
            />
          ))
        ) : (
          <EmptyStateComponent message="No post publish yet" />
        )}
      
    </div>
  );
}

import { Session } from "next-auth";
import Image from "next/image";
import { User } from "./Post";
import { error } from "@/util/Toastify";
import { success } from "@/util/Toastify";
import { all } from "axios";
import { Dispatch } from "react";
import { MdOutlineDelete } from "react-icons/md";
type Comment = {
  _id: string;
  userImage: string;
  postId: string;
  description: string;
  userId: string;
};

export default function CommentBtn({
  canDelete,
  userName,
  userImage,
  description,
  id,
  setAllComment,
  allComments
}: {
  canDelete: boolean;
  userName: string;
  userImage: string;
  description: string;
  id: string;
  setAllComment: any;
  allComments: Comment[];
}) {

  const deleteCommentHandler = async () => {
    const res = await fetch(`/api/v1/post/deleteComment/${id}`,{
      method: "DELETE",

    });
    if (!res.ok) {
      error("Failed to delete comment");
      return
    
  };
  success("Comment deleted successfully");
  setAllComment(allComments.filter((comment:Comment) => comment._id !== id));

  return;
}

  return (
    <div className="flex items-center  justify-between border-t">
      <div className="flex items-center gap-4 ">
        <Image
          src={userImage}
          alt="user-photo"
          width={35}
          height={35}
          className="rounded-full mt-1"
        />
        <div className=" text-black font-semibold">ashan </div>
        <div className=" text-black p-1 pl-2 pr-2 flex items-center">
          {description}
        </div>
      </div>
      {canDelete && (
        <div className="mr-6">
        <button onClick={deleteCommentHandler}>
        <MdOutlineDelete 
        className=" hover:text-slate-700 text-slate-500"
        size={20}
       />
        </button>
      </div>
      )}
    </div>
  );
}

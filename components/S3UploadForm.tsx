"use client";
import { error, success } from "@/util/Toastify";
// import { clear } from "console";
import React from "react";

const S3UploadForm = ({ id }: { id: string }) => {
  console.log(id);
  const [file, setFile] = React.useState<File | null>(null);
  const [upload, setUpload] = React.useState(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e: any) => {
    console.log(file);
    setUpload(true);
    e.preventDefault();
    if (!file) return;

    const fileType = file.type;
    if (fileType !== "text/html") {
      console.error("Invalid file type. Only HTML files are allowed.");
      error("Invalid file type. Only HTML files are allowed.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    console.log(formData);

    try {
      const response = await fetch("/api/v1/aws/s3-upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);

      const objectUrl = data.objectUrl;
      console.log(objectUrl);

      const updateEvent = await fetch("/api/v1/event/publishOwnHostPage", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, uploadPage: objectUrl }),
      });

      const updateEventRes = await updateEvent.json();

      console.log(updateEventRes);

      if (updateEventRes.message != "pageBuilder update faild") {
        success("Host page updated successfully");
      }

      success("File uploaded successfully");
      console.log(data);
    } catch (error) {
      console.error(error);
    } finally {
      setUpload(false);
    }
  };

  return <>{/* <h1>upload files to s3</h1> */};</>;
};

export default S3UploadForm;

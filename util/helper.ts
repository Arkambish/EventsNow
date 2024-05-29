import { getUser } from "@/components/Navbar/NavBar";
import { DateExpression } from "mongoose";
import { getSession } from "next-auth/react";
import qrCode from "qrcode";
import React from "react";

export function formatDate(dateString: any) {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
}

export const generateQRCodeImage = async (value: any, options = {}) => {
  try {
    const qrImageData: string = await qrCode.toDataURL(value, options);
    return qrImageData;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
};

const cloudinaryUploadUrl =
  "https://api.cloudinary.com/v1_1/dpk9utvby/image/upload";
const uploadPreset = "qrCode";

export async function uploadToCloudinary(imageData: any) {
  try {
    // Make a POST request to Cloudinary's upload endpoint

    const res = await fetch(cloudinaryUploadUrl, {
      method: "POST",
      body: JSON.stringify({
        file: imageData,
        upload_preset: uploadPreset,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Parse the JSON response
    const data = await res.json();

    // Get the public URL of the uploaded image
    const imageUrl: string = data.secure_url;

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}

export async function getUserDetails({
  organizationId,
}: {
  organizationId: string | string[] | undefined;
}) {
  const session = await getSession();
  const userDetails = await getUser({ email: session?.user?.email });

  const userPermissionRes = await fetch(
    `${process.env.NEXT_PUBLIC_URL}/api/v1/permission/checkUserPermission`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        organizationId: organizationId,
        userId: userDetails._id,
      }),
    }
  );

  const userPermissionData = await userPermissionRes.json();
  return userPermissionData;
}

// Function to get the time difference in human-readable format
export function getTimeDifference(dateString: string) {
  const providedDate = new Date(dateString);
  const currentDate = new Date();
  const timeDifference = currentDate.getTime() - providedDate.getTime();
  const secondsDifference = Math.floor(timeDifference / 1000);
  const minutesDifference = Math.floor(secondsDifference / 60);
  const hoursDifference = Math.floor(minutesDifference / 60);
  const daysDifference = Math.floor(hoursDifference / 24);

  const monthsDifference =
    (currentDate.getFullYear() - providedDate.getFullYear()) * 12 +
    currentDate.getMonth() -
    providedDate.getMonth();

  if (!isNaN(secondsDifference) && secondsDifference < 60) {
    return `${secondsDifference} second${
      secondsDifference === 1 ? "" : "s"
    } ago`;
  } else if (!isNaN(minutesDifference) && minutesDifference < 60) {
    return `${minutesDifference} minute${
      minutesDifference === 1 ? "" : "s"
    } ago`;
  } else if (!isNaN(hoursDifference) && hoursDifference < 24) {
    return `${hoursDifference} hour${hoursDifference === 1 ? "" : "s"} ago`;
  } else if (!isNaN(daysDifference) && daysDifference < 30) {
    return `${daysDifference} day${daysDifference === 1 ? "" : "s"} ago`;
  } else {
    return `${monthsDifference} month${monthsDifference === 1 ? "" : "s"} ago`;
  }
}
export function getTimeAgo(date: Date): string {
  const currentDate: Date = new Date();
  const millisecondsAgo: number = currentDate.getTime() - date.getTime();

  const secondsAgo: number = Math.floor(millisecondsAgo / 1000);
  const minutesAgo: number = Math.floor(secondsAgo / 60);
  const hoursAgo: number = Math.floor(minutesAgo / 60);
  const daysAgo: number = Math.floor(hoursAgo / 24);
  const weeksAgo: number = Math.floor(daysAgo / 7);
  const monthsAgo: number = Math.floor(daysAgo / 30);
  const yearsAgo: number = Math.floor(daysAgo / 365);

  console.log(`Milliseconds ago: ${millisecondsAgo}`);
  console.log(`Seconds ago: ${secondsAgo}`);
  console.log(`Minutes ago: ${minutesAgo}`);
  console.log(`Hours ago: ${hoursAgo}`);
  console.log(`Days ago: ${daysAgo}`);
  console.log(`Weeks ago: ${weeksAgo}`);
  console.log(`Months ago: ${monthsAgo}`);
  console.log(`Years ago: ${yearsAgo}`);

  if (secondsAgo < 60) {
    return `${secondsAgo} second${secondsAgo > 1 ? "s" : ""} ago`;
  } else if (minutesAgo < 60) {
    return `${minutesAgo} minute${minutesAgo > 1 ? "s" : ""} ago`;
  } else if (hoursAgo < 24) {
    return `${hoursAgo} hour${hoursAgo > 1 ? "s" : ""} ago`;
  } else if (daysAgo < 7) {
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  } else if (weeksAgo < 4) {
    return `${weeksAgo} week${weeksAgo > 1 ? "s" : ""} ago`;
  } else if (monthsAgo < 12) {
    return `${monthsAgo} month${monthsAgo > 1 ? "s" : ""} ago`;
  } else {
    return `${yearsAgo} year${yearsAgo > 1 ? "s" : ""} ago`;
  }
}

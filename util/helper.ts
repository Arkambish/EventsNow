import { getUser } from "@/components/Navbar/NavBar";
import { getSession } from "next-auth/react";
import qrCode from "qrcode";

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
export function getTimeAgo(date: any) {
  const currentDate: any = new Date();
  const millisecondsAgo = currentDate - date;

  const secondsAgo = millisecondsAgo / 1000;
  const minutesAgo = secondsAgo / 60;
  const hoursAgo = minutesAgo / 60;
  const daysAgo = hoursAgo / 24;
  const weeksAgo = daysAgo / 7;
  const monthsAgo = daysAgo / 30;
  const yearsAgo = daysAgo / 365;

  if (secondsAgo < 60) {
    return `${Math.floor(secondsAgo)} seconds ago`;
  } else if (minutesAgo < 60) {
    return `${Math.floor(minutesAgo)} minutes ago`;
  } else if (hoursAgo < 24) {
    return `${Math.floor(hoursAgo)} hours ago`;
  } else if (daysAgo < 7) {
    return `${Math.floor(daysAgo)} days ago`;
  } else if (weeksAgo < 4) {
    return `${Math.floor(weeksAgo)} weeks ago`;
  } else if (monthsAgo < 12) {
    return `${Math.floor(monthsAgo)} months ago`;
  } else {
    return `${Math.floor(yearsAgo)} years ago`;
  }
}

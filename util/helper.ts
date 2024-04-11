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

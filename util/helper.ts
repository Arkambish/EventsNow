import qrCode from "qrcode";

export function formatDate(dateString: any) {
  const date = new Date(dateString);
  const formattedDate = date.toISOString().split("T")[0];
  return formattedDate;
}

export const generateQRCodeImage = async (value: any, options = {}) => {
  try {
    const qrImageData = await qrCode.toDataURL(value, options);
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
    const imageUrl = data.secure_url;

    return imageUrl;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
}

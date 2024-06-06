import { NextRequest, NextResponse } from "next/server";

import { PutObjectCommand, S3Client, Type } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_AWS_S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_S3_SECRET_ACCESS_KEY,
  },
});

async function uploadFileToS3(file, fileName) {
  const fileBuffer = file;

  const params = {
    Bucket: process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME,
    Key: `uploadPage/${fileName}`,
    Body: fileBuffer,
    ContentType: "text/html",
    // ACL: "public-read",
    // Content-Type:"image/jpeg"
  };

  const command = new PutObjectCommand(params);
  await s3Client.send(command);

  const objectUrl = `https://${process.env.NEXT_PUBLIC_AWS_S3_BUCKET_NAME}.s3.${process.env.NEXT_PUBLIC_AWS_S3_REGION}.amazonaws.com/uploadPage/${fileName}`;

  return objectUrl;
}

export async function POST(request, response) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json({ error: "No file found" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const objectUrl = await uploadFileToS3(buffer, file.name);
    return NextResponse.json({ success: true, objectUrl });
  } catch (error) {
    return NextResponse.json({ error });
  }
}

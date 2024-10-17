import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import dotenv from 'dotenv';

dotenv.config();
cloudinary.config({
  secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const saveFileToCloudinary = async (file, folder) => {
  const response = await cloudinary.uploader.upload(file.path, {
    folder,
  });
  await fs.unlink(file.path);

  return response.secure_url;
};

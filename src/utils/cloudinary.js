import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';
import { env } from './env.js';

cloudinary.config({
  secure: true,
  cloud_name: env('CLOUD_NAME'),
  api_key: env('API_KEY'),
  api_secret: env('API_SECRET'),
});

export const saveFileToCloudinary = async (file, folder) => {
  const response = await cloudinary.uploader.upload(file.path, {
    folder,
  });
  await fs.unlink(file.path);

  return response.secure_url;
};

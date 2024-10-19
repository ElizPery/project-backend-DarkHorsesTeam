import path from 'node:path';
import fs from 'node:fs/promises';
import { env } from './env.js';

const TEMP_UPLOAD_DIR = env('TEMP_UPLOAD_DIR');
const UPLOAD_DIR = env('UPLOAD_DIR');

export const saveFileToUploadsDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return file.filename;
};

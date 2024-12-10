import { createClient } from 'webdav';
import dotenv from 'dotenv';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const isAutoSaveEnabled =
  process.env.LOCAL_DEVELOP_AUTOSAVE_DEPLOY === 'true';
export const previewUrl = process.env.PREVIEW_URL;
export const templateDir = path.join(__dirname, '../../src', 'template');

export const environments = {
  develop: '/develop',
  staging: '/staging',
  production: '/production',
};

export const getWebDAVClient = () => {
  return createClient(process.env.WEBDAV_URL.trim(), {
    username: process.env.WEBDAV_USERNAME,
    password: process.env.WEBDAV_PASSWORD,
  });
};

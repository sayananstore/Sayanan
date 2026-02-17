import { Storage } from "@google-cloud/storage";

export const storage = new Storage({
  keyFilename: process.env.GCS_KEY_FILE, // service account json
  projectId: process.env.GCS_PROJECT_ID,
});

export const bucket = storage.bucket(process.env.GCS_BUCKET_NAME);

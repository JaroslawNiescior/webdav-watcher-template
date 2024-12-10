import fs from 'fs';
import path from 'path';
import {
  environments,
  getWebDAVClient,
  templateDir,
} from './helpers/config.js';

const uploadSingleFile = async (client, filePath, remotePath) => {
  const relativePath = path.relative(templateDir, filePath);
  const remoteFilePath = path.posix.join(remotePath, relativePath);

  try {
    console.log(`Uploading: ${relativePath}`);
    await client.putFileContents(remoteFilePath, fs.createReadStream(filePath));
    console.log(`Uploaded successfully: ${relativePath}`);
  } catch (err) {
    console.error(`Error uploading ${relativePath}:`, err);
  }
};

const deploy = async (environment, singleFilePath) => {
  const remotePath = environments[environment];
  if (!remotePath) {
    console.error('Invalid environment:', environment);
    process.exit(1);
  }

  const client = getWebDAVClient();

  if (singleFilePath) {
    await uploadSingleFile(client, singleFilePath, remotePath);
    return;
  }

  console.log('No file specified for upload.');
};

const environment = process.argv[2];
const singleFilePath = process.argv[3];
deploy(environment, singleFilePath);

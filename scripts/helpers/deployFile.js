import { exec } from 'child_process';
import { refreshBrowser } from './websocket.js';

export const deploySingleFile = (filePath, relativePath) => {
  console.log(`Uploading: ${relativePath}`);
  exec(`node scripts/deploy.js develop ${filePath}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Deployment error: ${stderr}`);
      return;
    }
    console.log(stdout);
    refreshBrowser();
  });
};

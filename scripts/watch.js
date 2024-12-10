import chokidar from 'chokidar';
import path from 'path';
import { templateDir } from './helpers/config.js';
import { deploySingleFile } from './helpers/deployFile.js';

export const startWatching = () => {
  console.log('Before starting chokidar...');

  chokidar
    .watch(templateDir, {
      persistent: true,
      usePolling: true,
      awaitWriteFinish: {
        stabilityThreshold: 1000,
        pollInterval: 100,
      },
    })
    .on('ready', () =>
      console.log('Initial scan complete. Ready for changes...'),
    )
    .on('add', (filePath) => console.log(`File added: ${filePath}`))
    .on('change', (filePath) => {
      const relativePath = path.relative(templateDir, filePath);
      console.log(`File changed: ${relativePath}`);
      deploySingleFile(filePath, relativePath);
    })
    .on('unlink', (filePath) => console.log(`File removed: ${filePath}`))
    .on('error', (error) => console.error(`Watcher error: ${error}`));

  console.log('After starting chokidar...');
};

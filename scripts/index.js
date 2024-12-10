import { isAutoSaveEnabled } from './helpers/config.js';
import { startWatching } from './watch.js';

if (!isAutoSaveEnabled) {
  console.log('Autosave deploy is disabled. Exiting...');
  process.exit(0);
}

startWatching();

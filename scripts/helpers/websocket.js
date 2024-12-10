import { WebSocketServer } from 'ws';
import open from 'open';
import { previewUrl } from './config.js';

const wss = new WebSocketServer({ port: 8080 });
console.log('WebSocket server started on ws://localhost:8080');

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});

export const refreshBrowser = () => {
  if (wss.clients.size > 0) {
    console.log('Refreshing browser...');
    wss.clients.forEach((client) => {
      if (client.readyState === client.OPEN) {
        client.send('refresh');
      }
    });
  } else {
    console.log('No WebSocket clients connected. Opening browser...');
    open(previewUrl);
  }
};

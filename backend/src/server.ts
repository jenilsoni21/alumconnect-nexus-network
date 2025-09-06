import http from 'http';
import { Server as SocketIOServer } from 'socket.io';
import { connectToDatabase } from './database/connect.js';
import { createApp } from './app.js';
import { env } from './config/env.js';

async function bootstrap() {
  await connectToDatabase();

  const app = createApp();
  const server = http.createServer(app);

  // Socket.io
  const io = new SocketIOServer(server, {
    cors: {
      origin: env.FRONTEND_ORIGIN,
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    // placeholder for chat events
    socket.on('disconnect', () => {});
  });

  const port = env.PORT;
  server.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Backend listening on http://localhost:${port}`);
  });
}

bootstrap().catch((err) => {
  // eslint-disable-next-line no-console
  console.error('Failed to start server', err);
  process.exit(1);
});


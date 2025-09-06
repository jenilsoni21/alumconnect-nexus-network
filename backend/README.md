Alumnet Backend (Node.js + TypeScript)

Prerequisites
- Node.js 18+
- MongoDB (local) and/or MongoDB Compass

Setup
1. Install dependencies
```bash
cd server
npm install
```
2. Configure environment
```bash
cp .env.example .env
# edit .env values
```
3. Run in development
```bash
npm run dev
```
4. Build and run in production
```bash
npm run build
npm start
```

API
- GET /api/health
- Auth: POST /api/auth/register, POST /api/auth/login, GET /api/auth/me
- Blogs: GET /api/blogs, GET /api/blogs/me, POST /api/blogs
- Jobs: GET /api/jobs, POST /api/jobs (alumni/admin)
- Events: GET /api/events, POST /api/events (alumni/admin)
- Messages: GET /api/messages/thread/:userId, POST /api/messages
- Mentorship: GET /api/mentorship/me, POST /api/mentorship, POST /api/mentorship/:id/respond (alumni/admin)

Connect MongoDB Compass
1. Install from https://www.mongodb.com/try/download/compass
2. Start MongoDB locally (Community Server). Default URI: mongodb://localhost:27017
3. In Compass, connect using mongodb://localhost:27017
4. Create database alumnet with collection users (or let the app create automatically on first write)
5. Copy the full URI (e.g., mongodb://localhost:27017/alumnet) into .env as MONGO_URI

Frontend integration
- Base URL: http://localhost:5000/api
- Auth endpoints return { user, token }. Store token and send as Authorization: Bearer <token>
- Socket.IO connect example:
```ts
import { io } from 'socket.io-client';
const socket = io('http://localhost:5000', {
  auth: { token: localStorage.getItem('token') ?? '' },
});
```


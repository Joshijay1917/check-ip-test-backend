import { app } from "./app.js";
import jwt from "jsonwebtoken";
import http from 'http'
import { Server } from "socket.io";

const SLOT_DURATION = 20; // seconds
const SECRET = "6392d28e799c85c929f3336df3b95473"
const port = 3000;
const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "*", // Allow React frontend (use your frontend URL in prod)
        methods: ["GET", "POST"]
    }
});

app.set("io", io);

io.on("connection", (socket) => {
    console.log("Client connected:", socket.id);
  
    // Faculty joins a session room
    socket.on("joinSession", ({ sessionId }) => {
      socket.join(sessionId);
      console.log(`Faculty joined session: ${sessionId}`);
    });
  
    // Disconnect
    socket.on("disconnect", () => {
      console.log("Client disconnected:", socket.id);
    });
  });

function generateToken(rootId) {
    const slot = Math.floor(Date.now() / 1000 / SLOT_DURATION);
    const payload = { rootId, slot };
    return jwt.sign(payload, SECRET, { expiresIn: SLOT_DURATION });
}

server.listen(port, () => {
  console.log("Server is running on port ", port);
})

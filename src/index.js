import { app } from "./app.js";
import { WebSocketServer } from "ws";
import jwt from "jsonwebtoken"

const SLOT_DURATION = 20; // seconds
const SECRET = "6392d28e799c85c929f3336df3b95473"

const port = 3000;
const wss = new WebSocketServer({ port });

function generateToken(rootId) {
    const slot = Math.floor(Date.now() / 1000 / SLOT_DURATION);
    const payload = { rootId, slot };
    return jwt.sign(payload, SECRET, { expiresIn: SLOT_DURATION });
}

app.listen(port, () => {
    console.log("Server is running on port ", port);
})

wss.on("connection", (ws) => {
  console.log("Client connected");

  ws.send(JSON.stringify({ token: generateToken() }));

  const interval = setInterval(() => {
    if (ws.readyState === ws.OPEN) {
      ws.send(JSON.stringify({ token: generateToken() }));
    }
  }, SLOT_DURATION * 1000);

  ws.on("close", () => clearInterval(interval));
});

// import { v4 as uuid } from 'uuid'
// import Redis from "ioredis";
import jwt from "jsonwebtoken"

// const redis = new Redis();
const usedTokens = new Map();

const SLOT_DURATION = 20; // seconds
const SECRET = "6392d28e799c85c929f3336df3b95473"

function generateToken(rootId) {
    const slot = Math.floor(Date.now() / 1000 / SLOT_DURATION);
    const payload = { rootId, slot };
    return jwt.sign(payload, SECRET, { expiresIn: SLOT_DURATION });
}

const generateQR = async (req, res) => {
     const ROOT_SESSION_ID = "room123";
     const token = generateToken(ROOT_SESSION_ID);
     res.json({ token });
}

const scanQR = async (req, res) => {
    const { token, userId } = req.body;
    const username = userId.name;
    // const { sessionId, rollNo, name } = req.body;

    try {
        console.log("Decoding", token, " - ", username);

        const io = req.app.get("io");

        const decoded = jwt.verify(token, SECRET)

        console.log("decoded ", decoded);

        const { rootId, slot } = decoded;
        const uniqueKey = `${rootId}:${slot}:${username}`;

        // const already = await redis.get(uniqueKey);
        // if (already) {
        //     return res.status(400).json({ success: false, error: "Token already used" });
        // }
        if (usedTokens.has(username)) {
            return res.status(400).json({ success: false,  error: "Token already used" });
        }

        // await redis.set(uniqueKey, "1", "EX", SLOT_DURATION);
        usedTokens.set(username, true);
        io.emit("attendanceMarked", {
            username,
            time: new Date()
          });

        // setTimeout(() => usedTokens.delete(userId), SLOT_DURATION * 1000);

        res.json({ success: true, message: "Attendance marked" });
    } catch (error) {
        console.error(err);
        return res.status(401).json({ success: false, error: "Invalid or expired token" });
    }
}

export {
    generateQR,
    scanQR
}

// import { v4 as uuid } from 'uuid'
// import Redis from "ioredis";

// const redis = new Redis();
const SECRET = "anjsdnHAShadjadjSJdaksdASdfd"
const usedTokens = new Map();

const generateQR = async (req, res) => {
    // const ROOT_SESSION_ID = "room123";
    // const token = generateToken(ROOT_SESSION_ID);
    // res.json({ token });
}

const scanQR = async (req, res) => {
    const { token, userId } = req.body;

    try {
        console.log("Decoding", token, " - ", userId);

        const decoded = jwt.verify(token, SECRET)

        console.log("decoded ", decoded);

        const { rootId, slot } = decoded;
        const uniqueKey = `${rootId}:${slot}:${userId}`;

        // const already = await redis.get(uniqueKey);
        // if (already) {
        //     return res.status(400).json({ success: false, error: "Token already used" });
        // }
        if (usedTokens.has(uniqueKey)) {
            return res.status(400).json({ error: "Token already used" });
        }

        // await redis.set(uniqueKey, "1", "EX", SLOT_DURATION);
        usedTokens.set(key, true);

        setTimeout(() => usedTokens.delete(key), SLOT_DURATION * 1000);

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
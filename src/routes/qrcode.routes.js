import { Router } from "express";
import { generateQR, scanQR } from "../controllers/qrcode.controller.js";

const router = Router()

router.route("/qr-code").get(generateQR)
router.route("/scan").post(scanQR)

export default router

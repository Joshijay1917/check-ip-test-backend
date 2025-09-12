import { Router } from "express";
import { checkIp } from "../controllers/checkIp.controller.js";

const router = Router()

router.route('/check-ip').get(checkIp)

export default router
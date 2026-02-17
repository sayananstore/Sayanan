import express from "express";
import { register, login, googleLogin, sendPhoneOtp, verifyPhoneOtp, firebaseLogin } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/otp/phone/send", sendPhoneOtp);
router.post("/otp/phone/verify", verifyPhoneOtp);
router.post("/firebase", firebaseLogin);

// Example protected route
router.get("/me", protect(), (req, res) => {
  res.json(req.user);
});

export default router;

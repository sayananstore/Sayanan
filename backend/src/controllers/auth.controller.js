import bcrypt from "bcrypt";
import admin from "../config/firebaseAdmin.js";
import { generateToken } from "../utils/jwt.js";
import { OAuth2Client } from "google-auth-library";
import { PhoneOtp } from "../models/phone_otps.model.js";
import { sendSMS } from "../config/sms.js";
import { User } from "../models/user.model.js";

export const sendPhoneOtp = async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone)
      return res.status(400).json({ message: "Phone number required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    await PhoneOtp.destroy({ where: { phone } });

    await PhoneOtp.create({
      phone,
      otp,
      expires_at: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendSMS(
      phone,
      `Your Sayanan OTP is ${otp}. Valid for 5 minutes.`
    );

    res.json({ message: "OTP sent successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const verifyPhoneOtp = async (req, res) => {
  try {
    const { phone, otp } = req.body;

    const record = await PhoneOtp.findOne({ where: { phone, otp } });

    if (!record || record.expires_at < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    let user = await User.findOne({ where: { phone } });

    if (!user) {
      user = await User.create({
        phone,
        name: `User_${phone.slice(-4)}`,
        role: "USER",
        is_phone_verified: true,
      });
    } else {
      user.is_phone_verified = true;
      await user.save();
    }

    await PhoneOtp.destroy({ where: { phone } });

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { tokenId } = req.body;

  const ticket = await client.verifyIdToken({
    idToken: tokenId,
    audience: process.env.GOOGLE_CLIENT_ID,
  });

  const { email, name, sub } = ticket.getPayload();

  let user = await User.findOne({ where: { email } });

  if (!user) {
    user = await User.create({
      email,
      name,
      google_id: sub,
      is_verified: true,
      role: "USER",
    });
  }

  const token = generateToken({ id: user.id, role: user.role });

  res.json({ user, token });
};

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const exists = await User.findOne({ where: { email } });
    if (exists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role
    });

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    res.status(201).json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


export const firebaseLogin = async (req, res) => {
  try {
    const { idToken } = req.body;

    const decoded = await admin.auth().verifyIdToken(idToken);
    const { email, name, phone_number, uid, picture } = decoded;

    let user = await User.findOne({
      where: { email: email || phone_number },
    });

    if (user) {
      // Update firebase info if missing
      user.firebase_uid = uid;
      user.is_verified = true;

      // ✅ Save photo from Firebase
      if (picture) {
        user.photo_url = picture;
      }

      await user.save();
    } else {
      user = await User.create({
        email: email || phone_number,
        name: name || "User",
        firebase_uid: uid,
        photo_url: picture || null,   // ✅ Save here
        is_verified: true,
        role: "USER",
      });
    }

    const token = generateToken({
      id: user.id,
      role: user.role,
    });

    const { password, ...safeUser } = user.toJSON();

    res.json({ user: safeUser, token });

  } catch (err) {
      console.error("Firebase Verify Error:", err);
  res.status(401).json({ message: err.message });
  }
};

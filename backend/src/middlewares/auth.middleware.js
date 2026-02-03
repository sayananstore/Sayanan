import jwt from "jsonwebtoken";

export const protect = (roles = []) => {
  return (req, res, next) => {
    try {
      const authHeader = req.headers.authorization;

      // 1️⃣ Check token existence
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Not authorized" });
      }

      const token = authHeader.split(" ")[1];

      // 2️⃣ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 3️⃣ Role check (if roles provided)
      if (roles.length && !roles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access forbidden" });
      }

      // 4️⃣ Attach user info to request
      req.user = decoded;
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

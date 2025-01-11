import jwt from "jsonwebtoken";

export const authenticateToken = (req, res, next) => {
  console.log(req);
  console.log(req.body);
  const authHeader = req.headers["token"];
  // const token = authHeader && authHeader.split(" ")[1]; // Bearer token
  const token = authHeader;
  if (!token) {
    return res.status(401).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach decoded user info to the request
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid or expired token" });
  }
};

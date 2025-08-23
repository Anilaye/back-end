import jwt from "jsonwebtoken";

export function authenticateToken(req, res, next) {
  const auth = req.headers.authorization || "";
  const token = auth.startsWith("Bearer ") ? auth.slice(7) : null;

  if (!token) return res.status(401).json({ message: "Accès refusé, token manquant" });

  jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
    if (err) return res.status(403).json({ message: "Token invalide" });
    req.user = payload; // { id, role }
    next();
  });
}

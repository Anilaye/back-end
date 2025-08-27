import jwt from "jsonwebtoken";
import { logError, logInfo } from "../utils/logger.js";

export function authenticateToken(req, res, next) {
  const auth = req.headers["authorization"];
  const token = auth && auth.split(" ")[1];

  if (!token) {
    logError("Accès refusé : token manquant");
    return res.status(401).json({ message: "Accès refusé : token manquant" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      logError("Accès refusé : token invalide");
      return res.status(403).json({ message: "Accès refusé : token invalide" });
    }
    req.user = user; // { id, role }
    logInfo(`Utilisateur authentifié : ${user.id}`);
    // logInfo("Token JWT validé", { id: user.id, email: user.email, role: user.role });
    next();
  });
}

export function authorizeRoles(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      logError("Accès refusé : utilisateur non authentifié");
      return res.status(401).json({ message: "Accès refusé : non authentifié" });
    }

    if (!allowedRoles.includes(req.user.role)) {
      logError("Accès refusé : rôle insuffisant", { role: req.user.role });
      return res.status(403).json({ message: "Accès refusé : rôle insuffisant" });
    }

    logInfo("Accès autorisé", { id: req.user.id, role: req.user.role });
    next();
  };
}

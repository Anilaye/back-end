import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import morgan from "morgan";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const logDir = path.join(__dirname, "logs/");
const logFile = path.join(logDir, "app.log");

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Flux d'écriture pour Morgan
export const httpLogger = morgan("combined", {
  stream: fs.createWriteStream(logFile, { flags: "a" }),
});

// Fonction interne pour logs custom
function writeLog(level, message) {
  const log = `[${level}] ${new Date().toISOString()} - ${message}\n`;
  fs.appendFileSync(logFile, log, "utf8");
  console.log(log.trim());
}

// Export unique des fonctions de log
export const logInfo = (message) => writeLog("INFO", message);
export const logError = (message) => writeLog("ERROR", message);
export const logDebug = (message) => writeLog("DEBUG", message);
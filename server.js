import { logInfo } from "./src/utils/logger.js";
import app from "./src/app.js";


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => logInfo(`Backend démarré sur http://localhost:${PORT}`));
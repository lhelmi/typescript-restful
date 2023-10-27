import { web } from "./app/web";
import { logger } from "./app/Logger";
import Config from "./config/Config";

web.listen(Config.serverPort, () => {
    logger.info("app start");
});
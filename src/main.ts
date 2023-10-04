import { web } from "./app/web";
import { logger } from "./app/logger";
import  config from './config/config';

web.listen(config.serverPort, () => {
    logger.info("app start");
});
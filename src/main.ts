import { web } from "./app/Web";
import { logger } from "./app/Logger";
import  config from './config/Config';

web.listen(config.serverPort, () => {
    logger.info("app start");
});
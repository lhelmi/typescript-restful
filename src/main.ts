import { web } from "./app/web";
import { logger } from "./app/logger";

web.listen(3000, () => {
    logger.info("app start");
});
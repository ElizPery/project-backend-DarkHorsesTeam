import { setupServer } from "./server.js";
import { initMongoConnect } from "./db/initMongoConnection.js";
import { createDirIfNotExist } from "./utils/createDirIfNotExist.js";
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from "./constants/index.js";

const bootstrap = async () => {
    await initMongoConnect();
    await createDirIfNotExist(TEMP_UPLOAD_DIR);
    await createDirIfNotExist(UPLOAD_DIR);
    setupServer();
};

bootstrap();
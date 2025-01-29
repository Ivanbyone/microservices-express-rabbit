import "dotenv/config";

import { TYPES } from "./types/types";
import { IApplication } from "./utils/config/app.config";
import container from "./utils/config/inversify.config";

const entrypoint = async () => {
    const application = container.get<IApplication>(TYPES.IApplication);
    return application.start_application();
};

entrypoint();

import "dotenv/config";

import { IRPCServer } from "./application/rpc_server";
import container from "./config/inversify.config";
import { TYPES } from "./types/types";

const entrypoint = async () => {
    const server: IRPCServer = container.get<IRPCServer>(TYPES.IRPCServer);
    await server.connectAndListen();
};

entrypoint();

import "reflect-metadata";

import { Container } from "inversify";
import { IRPCServer, RPCServer } from "../application/rpc_server";
import { TYPES } from "../types/types";

const container: Container = new Container();

container.bind<IRPCServer>(TYPES.IRPCServer).to(RPCServer).inRequestScope();

export default container;

import "reflect-metadata";

import { Container } from "inversify";

import { AppRouter, IRouter } from "../../controllers/app.router";
import { TYPES } from "../../types/types";
import { Controller, IController } from "../../controllers/controller";
import { IService, Service } from "../../application/service/service";
import { AppLogger, ILogger } from "../logger/logger";
import { Application, IApplication } from "./app.config";
import {
    IRabbitService,
    RabbitService,
} from "../../infrastructure/messager/messager";

const container: Container = new Container();

container
    .bind<IApplication>(TYPES.IApplication)
    .to(Application)
    .inSingletonScope();
container.bind<IRouter>(TYPES.IRouter).to(AppRouter).inSingletonScope();

container.bind<IController>(TYPES.IController).to(Controller);
container.bind<IService>(TYPES.IService).to(Service);

container
    .bind<IRabbitService>(TYPES.IRabbitService)
    .to(RabbitService)
    .inSingletonScope();

container.bind<ILogger>(TYPES.ILogger).to(AppLogger).inSingletonScope();

export default container;

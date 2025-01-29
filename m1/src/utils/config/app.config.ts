import { inject, injectable } from "inversify";
import express, { Express } from "express";
import { ILogger } from "../logger/logger";
import { IRouter } from "../../controllers/app.router";
import { TYPES } from "../../types/types";

export interface IApplication {
    start_application(): void;
}

@injectable()
export class Application implements IApplication {
    private readonly _logger: ILogger;
    private readonly _router: IRouter;

    constructor(
        @inject(TYPES.ILogger) logger: ILogger,
        @inject(TYPES.IRouter) router: IRouter,
    ) {
        this._logger = logger;
        this._router = router;
    }

    start_application = async (): Promise<void> => {
        const router = this._router.get();
        const logger = this._logger.get();

        const application: Express = express();

        application.use(express.json());

        application.use("/api/v1", router);

        application.listen(process.env.PORT, () => {
            logger.info(`App started on ${process.env.PORT}...`);
        });
    };
}

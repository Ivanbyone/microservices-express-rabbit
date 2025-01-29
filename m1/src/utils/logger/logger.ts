import { injectable } from "inversify";
import * as log4js from "log4js";

export interface ILogger {
    get(): log4js.Logger;
}

/**
 * Конфигурационный класс для логгера
 */
@injectable()
export class AppLogger implements ILogger {
    get(): log4js.Logger {
        if ((process.env.NODE_ENV = "development")) {
            log4js.configure({
                appenders: {
                    stdout: {
                        type: "stdout",
                        layout: { type: "coloured" },
                    },
                    profileDev: {
                        type: "file",
                        filename: "log/dev-logs.log",
                        maxLogSize: 10485760,
                        backups: 3,
                        compress: true,
                    },
                },
                categories: {
                    default: {
                        appenders: ["profileDev", "stdout"],
                        level: "ALL",
                    },
                },
            });
        }

        const logger: log4js.Logger = log4js.getLogger();
        return logger;
    }
}

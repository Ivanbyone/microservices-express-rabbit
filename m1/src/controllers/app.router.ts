import { Router } from "express";
import { inject, injectable } from "inversify";
import { IController } from "./controller";
import { TYPES } from "../types/types";

export interface IRouter {
    get(): Router;
}

/**
 * Роутер с маршрутом для принятия HTTP-запроса
 */
@injectable()
export class AppRouter implements IRouter {
    private readonly _controller: IController;

    constructor(@inject(TYPES.IController) controller: IController) {
        this._controller = controller;
    }
    /**
     * Получение объекта Router
     * @returns Объект Router
     */
    get(): Router {
        return Router().post(
            "/doubled-value",
            this._controller.sendDoubledRequest,
        );
    }
}

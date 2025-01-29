import { Request, Response } from "express";
import { inject, injectable } from "inversify";

import { IService } from "../application/service/service";
import { TYPES } from "../types/types";
import { InputDto } from "../application/dto/input/input.dto";
import { BadRequest } from "../application/errors/error";

export interface IController {
    // Методы, которые необходимо переопределить
    sendDoubledRequest(request: Request, response: Response): Promise<void>;
}

/**
 * Контроллер приложения
 */
@injectable()
export class Controller implements IController {
    private readonly _service: IService;

    // Инжектим сервис с бизнес-логикой и биндим методы для роутера
    constructor(@inject(TYPES.IService) service: IService) {
        this._service = service;
        this.sendDoubledRequest = this.sendDoubledRequest.bind(this);
    }

    /**
     * Функция для получения тела запроса и его передачи на уровень приложения
     * @param _request Параметры запроса (тело, заголовки, locals)
     * @param _response Параметры ответа со статус кодом
     * Функция не возвращает никаких значений (отдает значения в виде Response)
     */
    public async sendDoubledRequest(
        request: Request,
        response: Response,
    ): Promise<void> {
        try {
            const value: InputDto = new InputDto(request.body["value"]);
            response
                .status(201)
                .json(await this._service.createAndSendDoubledValue(value));
        } catch (err: unknown) {
            if (err instanceof BadRequest) {
                response.status(400).json({ error: err.message });
            } else {
                response.status(500).json({ error: err });
            }
        }
    }
}

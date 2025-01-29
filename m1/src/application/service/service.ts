import { inject, injectable } from "inversify";
import { OutputDto } from "../dto/output/output.dto";
import { TYPES } from "../../types/types";
import { IRabbitService } from "../../infrastructure/messager/messager";
import { InputDto } from "../dto/input/input.dto";
import { BadRequest } from "../errors/error";
import { Message } from "../../domain/Message";

export interface IService {
    createAndSendDoubledValue(value: InputDto): Promise<OutputDto>;
}

/**
 * Сервис для обработки переданного тела запроса и формирования ответа (Бизнес-логика)
 */
@injectable()
export class Service implements IService {
    private readonly _rabbit: IRabbitService;

    constructor(@inject(TYPES.IRabbitService) rabbit: IRabbitService) {
        this._rabbit = rabbit;
    }

    /**
     * Функция для реализации бизнес-логики на основе переданных данных
     * @returns результат обработки переданных данных
     */
    public async createAndSendDoubledValue(
        value: InputDto,
    ): Promise<OutputDto> {
        let inputValue = value.value;

        // В данном кейсе проводим валидацию в сервисе
        if (typeof inputValue !== "number") {
            inputValue = parseInt(inputValue);
            if (isNaN(inputValue)) {
                throw new BadRequest("Can not convert value to number");
            }
        }

        const message: Message = new Message(inputValue);
        // Пайплайн для отправки сообщения в очередь и получения ответа
        await this._rabbit.connect();
        await this._rabbit.sendMessage(JSON.stringify(message));
        return new OutputDto(inputValue);
    }
}

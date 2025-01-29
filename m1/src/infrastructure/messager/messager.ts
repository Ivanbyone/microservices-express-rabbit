import { inject, injectable } from "inversify";
import * as amqp from "amqplib";
import { ILogger } from "../../utils/logger/logger";
import { TYPES } from "../../types/types";

export interface IRabbitService {
    connect(): Promise<void>;
    sendMessage(message: string): Promise<void>;
}

@injectable()
export class RabbitService implements IRabbitService {
    private readonly _logger: ILogger;
    private connection: amqp.connection;
    private channel: amqp.channel;

    private readonly rabbitMQUrl: string = process.env.RABBITMQ_URL;

    constructor(@inject(TYPES.ILogger) logger: ILogger) {
        this._logger = logger;
    }

    async connect(): Promise<void> {
        try {
            this.connection = await amqp.connect(this.rabbitMQUrl);
            this.channel = await this.connection.createChannel();
        } catch (err) {
            this._logger.get().error("Connection was crashed!");
        }
    }

    async sendMessage(message: string): Promise<void> {
        if (!this.connection || !this.channel) {
            await this.connect();
            this._logger.get().error("Channel isn't init");
        }

        await this.channel.assertQueue(process.env.QUEUE, { durable: true });

        await this.channel.sendToQueue(
            process.env.QUEUE,
            Buffer.from(message),
            { persistent: true },
        );
    }
}

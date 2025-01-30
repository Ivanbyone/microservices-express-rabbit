import { inject, injectable } from "inversify";
import * as amqp from "amqplib";
import { ILogger } from "../../utils/logger/logger";
import { TYPES } from "../../types/types";

export interface IRabbitService {
    connect(): Promise<void>;
    sendMessageAndListen(message: string): Promise<string>;
}

@injectable()
export class RabbitService implements IRabbitService {
    private readonly _logger: ILogger;
    private connection: amqp.Connection;
    private channel: amqp.Channel;

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

    async sendMessageAndListen(message: string): Promise<string> {
        await this.connect();

        if (!this.connection || !this.channel) {
            await this.connect();
            this._logger.get().error("Channel isn't init");
        }

        await this.channel.assertQueue(process.env.QUEUE, { durable: false });

        const reply = await this.channel.assertQueue("", { exclusive: true });
        const correlationId = crypto.randomUUID();

        this.channel.sendToQueue(process.env.QUEUE, Buffer.from(message), {
            correlationId: correlationId,
            replyTo: reply.queue,
        });

        return new Promise((response) => {
            this.channel.consume(reply.queue, async (message) => {
                if (message.properties.correlationId === correlationId) {
                    if (!message) {
                        return null;
                    } else {
                        response(message.content.toString());
                        await this.channel.close();
                        await this.connection.close();
                    }
                }
            });
        });
    }
}

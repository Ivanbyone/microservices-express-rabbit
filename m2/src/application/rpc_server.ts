import { injectable } from "inversify";
import * as amqp from "amqplib";

export interface IRPCServer {
    connectAndListen(): Promise<void>;
}

/**
 * Простой RPC сервер для прослушивания очереди, обработки сообщения и
 * обратной передачи в очередь микросервису м1.
 */
@injectable()
export class RPCServer implements IRPCServer {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    private readonly rabbitMQUrl: string = process.env.RABBITMQ_URL;
    private readonly baseQueue: string = process.env.QUEUE;

    // Единственный метод для сервера: прием, обработка и отправка сообщения на m1
    async connectAndListen(): Promise<void> {
        try {
            this.connection = await amqp.connect(this.rabbitMQUrl);
            this.channel = await this.connection.createChannel();
        } catch (err: unknown) {
            console.log(err);
        }

        await this.channel.assertQueue(this.baseQueue, { durable: false });

        await this.channel.prefetch(1);

        await this.channel.consume(this.baseQueue, async (message) => {
            let response = JSON.parse(message.content.toString());

            // Имитация 5-секундной задержки
            await new Promise((resolve) => setTimeout(resolve, 5000));

            // Преобразование значения из сообщения
            response = response.value * 2;

            // Отправка сообщения
            this.channel.sendToQueue(
                message.properties.replyTo,
                Buffer.from(response.toString()),
                {
                    correlationId: message.properties.correlationId,
                },
            );

            this.channel.ack(message);
        });
    }
}

/**
 * В данном кейсе доменная модель - сообщение котрое отправляется в очередь
 */
export class Message {
    readonly value: number;

    constructor(item: number) {
        this.value = item;
    }
}

/**
 * Data Transfer Object входящего значения
 */
export class InputDto {
    readonly value: number | string;

    constructor(value: number | string) {
        this.value = value;
    }
}

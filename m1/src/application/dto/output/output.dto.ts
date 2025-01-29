/**
 * Data Transfer Object передаваемого пользователю значения
 */
export class OutputDto {
    readonly doubledValue: number;

    constructor(value: number) {
        this.doubledValue = value;
    }
}

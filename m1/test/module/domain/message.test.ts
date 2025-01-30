import { describe, test, expect } from "@jest/globals";
import { Message } from '../../../src/domain/Message';

describe('Creating Message object', () => {
    test('Valid Message object', () => {
        const obj = new Message(8);
        expect(obj).toEqual({ value: 8 });
    })
});
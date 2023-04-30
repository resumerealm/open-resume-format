import { describe, expect, it } from 'vitest';
import { getSchema } from './getSchema';

describe('getSchema', () => {
    it('should getSchema', async () => {
        expect(await getSchema('2023-04-28')).toBeTruthy();
    });
});

import { describe, expect, it } from 'vitest';
import { matchVersion } from './matchVersion';
import { OpenResumeVersion } from './OpenResumeVersion';

describe('matchVersion', () => {
    const versions = [
        '2023-01-01',
        '2023-04-10',
        '2023-05-08',
        '2023-06-30',
    ] as unknown as OpenResumeVersion[];

    it('should match versions for dates', async () => {
        expect(matchVersion('2023-04-28', versions)).toBe('2023-04-10');
        expect(matchVersion('2023-04-02', versions)).toBe('2023-01-01');
        expect(matchVersion('2023-05-08', versions)).toBe('2023-05-08');
        expect(matchVersion('2023-07-01', versions)).toBe('2023-06-30');
    })

    it('should throw error when version is not found', async () => {
        expect(() => matchVersion('2022-07-01', versions)).toThrowError(`Date 2022-07-01 is before the first available version 2023-01-01`);
    })
});

import { sanitizeTitle } from '../../../src/utils/sanitizeTitle';

describe('sanitizeTitle', () => {
    it('should remove special characters and multiple spaces from the title', () => {
        const input = "This!! is a ##Test@@ title  with  multiple spaces!!!";
        const expectedOutput = "This is a Test title with multiple spaces";
        const result = sanitizeTitle(input);
        expect(result).toBe(expectedOutput);
    });

    it('should trim leading and trailing spaces', () => {
        const input = "   This is a test title   ";
        const expectedOutput = "This is a test title";
        const result = sanitizeTitle(input);
        expect(result).toBe(expectedOutput);
    });

    it('should handle titles with no special characters or extra spaces', () => {
        const input = "This is a test title";
        const expectedOutput = "This is a test title";
        const result = sanitizeTitle(input);
        expect(result).toBe(expectedOutput);
    });

    it('should return an empty string if the input is an empty string', () => {
        const input = "";
        const expectedOutput = "";
        const result = sanitizeTitle(input);
        expect(result).toBe(expectedOutput);
    });

    it('should handle titles with only special characters', () => {
        const input = "!!!###@@@";
        const expectedOutput = "";
        const result = sanitizeTitle(input);
        expect(result).toBe(expectedOutput);
    });

    it('should handle titles with multiple spaces correctly', () => {
        const input = "This  is    a    test  title";
        const expectedOutput = "This is a test title";
        const result = sanitizeTitle(input);
        expect(result).toBe(expectedOutput);
    });

    it('should handle titles with mixed special characters and spaces correctly', () => {
        const input = "This!!  is  a ##Test@@ title";
        const expectedOutput = "This is a Test title";
        const result = sanitizeTitle(input);
        expect(result).toBe(expectedOutput);
    });
});

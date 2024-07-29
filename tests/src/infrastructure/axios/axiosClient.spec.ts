import axios, { AxiosInstance } from 'axios';
import { AxiosClient } from '../../../../src/infrastructure/axios/axiosClient';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('AxiosClient', () => {
    const apiBaseUrl = 'http://mockapi.com';
    let originalEnv: NodeJS.ProcessEnv;

    beforeAll(() => {
        originalEnv = process.env;
    });

    beforeEach(() => {
        jest.resetAllMocks();
        process.env = { ...originalEnv };
        AxiosClient['instances'].clear();
    });

    afterAll(() => {
        process.env = originalEnv;
    });

    it('should create a new Axios instance if one does not exist for the given base URL', () => {
        process.env.TMDB_API_TOKEN = 'mockToken';

        mockedAxios.create.mockReturnValue({} as AxiosInstance);

        const instance = AxiosClient.getInstance(apiBaseUrl);

        expect(mockedAxios.create).toHaveBeenCalledWith({
            baseURL: apiBaseUrl,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer mockToken`
            }
        });
        expect(instance).toBeDefined();
    });

    it('should return the same Axios instance if one already exists for the given base URL', () => {
        process.env.TMDB_API_TOKEN = 'mockToken';

        const firstInstance = AxiosClient.getInstance(apiBaseUrl);
        const secondInstance = AxiosClient.getInstance(apiBaseUrl);

        expect(mockedAxios.create).toHaveBeenCalledTimes(1);
        expect(firstInstance).toBe(secondInstance);
    });

    it('should throw an error if the TMDB API token is not provided', () => {
        delete process.env.TMDB_API_TOKEN;

        expect(() => AxiosClient.getInstance(apiBaseUrl)).toThrowError(
            "Token da API TMDB não fornecido. Defina a variável de ambiente TMDB_API_TOKEN."
        );
    });

    it('should create a new instance with the correct headers', () => {
        process.env.TMDB_API_TOKEN = 'mockToken';

        mockedAxios.create.mockReturnValue({} as AxiosInstance);

        const instance = AxiosClient.getInstance(apiBaseUrl);

        expect(mockedAxios.create).toHaveBeenCalledWith({
            baseURL: apiBaseUrl,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer mockToken`
            }
        });
        expect(instance).toBeDefined();
    });

    it('should handle multiple different base URLs', () => {
        process.env.TMDB_API_TOKEN = 'mockToken';

        const anotherApiBaseUrl = 'http://anothermockapi.com';

        mockedAxios.create.mockReturnValueOnce({} as AxiosInstance);
        mockedAxios.create.mockReturnValueOnce({} as AxiosInstance);

        const firstInstance = AxiosClient.getInstance(apiBaseUrl);
        const secondInstance = AxiosClient.getInstance(anotherApiBaseUrl);

        expect(mockedAxios.create).toHaveBeenCalledWith({
            baseURL: apiBaseUrl,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer mockToken`
            }
        });

        expect(mockedAxios.create).toHaveBeenCalledWith({
            baseURL: anotherApiBaseUrl,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer mockToken`
            }
        });

        expect(firstInstance).not.toBe(secondInstance);
    });
});

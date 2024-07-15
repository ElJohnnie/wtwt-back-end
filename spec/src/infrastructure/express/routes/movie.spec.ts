import request from 'supertest';
import app from '../../../../../src/infrastructure/express/server';
import axios from 'axios';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express'; // Importe as definições de tipo necessárias do Express

dotenv.config({
    path: '.env.test',
});

jest.mock('axios');
jest.mock('../../../../../src/infrastructure/express/middlewares/checkAuthorizationCode', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((req: Request, res: Response, next: NextFunction) => {
        return next();
    }),
}));

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Movie router', () => {
    beforeEach(() => {
        mockedAxios.get.mockReset();
    });

    it('should trigger domain route', async () => {
        mockedAxios.get.mockResolvedValue({ data: [{ title: 'Movie 1' }, { title: 'Movie 2' }] });

        const response = await request(app)
            .get('/movie')
            .set('Authorization', `Bearer ${process.env.API_KEY}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ title: 'Movie 1' }, { title: 'Movie 2' }]);
    });
});

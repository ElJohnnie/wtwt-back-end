import request from 'supertest';
import app from '../src/infrastructure/server';
import dotenv from 'dotenv';
import { mockMLApiServiceImp } from './mocks/external-services.mock';
import { mockTMDBApiExternalService } from './mocks/external-services.mock';

jest.mock('../src/application/external-services/recommendation-algorithm/recommendation-algorithm.external-service.ts', () => ({
    RecommendationAlgorithm: jest.fn().mockImplementation(() => mockMLApiServiceImp)
}));

jest.mock('../src/application/external-services/the-movie-database/the-movie-database.external-service.ts', () => ({
    TMDBExternalService: jest.fn().mockImplementation(() => mockTMDBApiExternalService)
}));

dotenv.config({
    path: '.env.test',
});

describe('E2E Tests for Movie Routes', () => {
    describe('GET /movies', () => {
        it('should return recommended movies successfully', async () => {
            const response = await request(app)
                .get('/movies')
                .query({
                    mood: 'happy',
                    primaryGenre: 'Comedy',
                    secondaryGenre: 'Romance',
                    epoch: '2000s'
                })
                .set('Authorization', `Bearer ${process.env.AUTHORIZATION_TOKEN}`);

            expect(response.status).toBe(200);
            expect(response.body).toHaveProperty('id');
            expect(response.body).toHaveProperty('backdrop_path');
            expect(response.body).toHaveProperty('popularity');
            expect(response.body).toHaveProperty('title');
            expect(response.body).toHaveProperty('overview');
            expect(response.body).toHaveProperty('otherMovies');
        });

        it('should return 400 for invalid query parameters', async () => {
            const response = await request(app)
                .get('/movies')
                .query({
                    mood: '',
                    primaryGenre: '',
                    secondaryGenre: '',
                    epoch: ''
                })
                .set('Authorization', `Bearer ${process.env.AUTHORIZATION_TOKEN}`);

            expect(response.status).toBe(400);
            expect(response.body).toHaveProperty('error');
        });

        it('should return 401 for missing authorization token', async () => {
            const response = await request(app)
                .get('/movies')
                .query({
                    mood: 'happy',
                    primaryGenre: 'Comedy',
                    secondaryGenre: 'Romance',
                    epoch: '2000s'
                });

            expect(response.status).toBe(401);
            expect(response.text).toBe('Unauthorized: No token provided');
        });

        it('should return 401 for invalid authorization token', async () => {
            const response = await request(app)
                .get('/movies')
                .query({
                    mood: 'happy',
                    primaryGenre: 'Comedy',
                    secondaryGenre: 'Romance',
                    epoch: '2000s'
                })
                .set('Authorization', 'Bearer invalid_token');

            expect(response.status).toBe(401);
            expect(response.text).toBe('Unauthorized: Invalid token');
        });
    });

    describe('GET /movies/more-recommendations', () => {
        it('should return more recommended movies successfully', async () => {
            const response = await request(app)
                .get('/movies/more-recommendations')
                .query({
                    movies: 'Movie1,Movie2'
                })
                .set('Authorization', `Bearer ${process.env.AUTHORIZATION_TOKEN}`);

            expect(response.status).toBe(200);
            expect(response.body).toBeInstanceOf(Array);
            expect(response.body.length).toBeGreaterThan(0);
        });

        it('should return 400 for missing query parameters', async () => {
            const response = await request(app)
                .get('/movies/more-recommendations')
                .set('Authorization', `Bearer ${process.env.AUTHORIZATION_TOKEN}`);

            expect(response.status).toBe(500);
            expect(response.body).toHaveProperty('error');
        });

        it('should return 401 for missing authorization token', async () => {
            const response = await request(app)
                .get('/movies/more-recommendations')
                .query({
                    movies: 'Movie1,Movie2'
                });

            expect(response.status).toBe(401);
            expect(response.text).toBe('Unauthorized: No token provided');
        });

        it('should return 401 for invalid authorization token', async () => {
            const response = await request(app)
                .get('/movies/more-recommendations')
                .query({
                    movies: 'Movie1,Movie2'
                })
                .set('Authorization', 'Bearer invalid_token');

            expect(response.status).toBe(401);
            expect(response.text).toBe('Unauthorized: Invalid token');
        });
    });
});

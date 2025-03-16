import request from 'supertest';
import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import movieRouter from '../../../../../src/infrastructure/express/routes/movieRoutes';
import { MLApiServiceImp } from '../../../../../src/application/external-services/mlApiServiceImp';
import { TMDBApiExternalService } from '../../../../../src/application/external-services/tmdbServiceImp';
import { GetRecommendedMoviesUseCase } from '../../../../../src/application/usecases/getRecommendedMoviesUseCase';
import { GetMoviesByTitleUseCase } from '../../../../../src/application/usecases/getMoviesByTitleUseCase';
import { MoreRecommendationsController } from '../../../../../src/application/controllers/moreMoviesRecomendationController';
import { MoreMoviesRecommendationUseCase } from '../../../../../src/application/usecases/moreMovieRecommendationUseCase';
import { MovieController } from '../../../../../src/application/controllers/movieController';

dotenv.config({
    path: '.env.test',
});

jest.mock('../../../../../src/infrastructure/express/middlewares/checkAuthorizationCode', () => ({
    __esModule: true,
    default: jest.fn().mockImplementation((req: Request, res: Response, next: NextFunction) => {
        return next();
    }),
}));

jest.mock('../../../../../src/application/external-services/mlApiServiceImp');
jest.mock('../../../../../src/application/external-services/tmdbServiceImp');
jest.mock('../../../../../src/application/usecases/getRecommendedMoviesUseCase');
jest.mock('../../../../../src/application/usecases/getMoviesByTitleUseCase');
jest.mock('../../../../../src/application/usecases/moreMovieRecommendationUseCase');
jest.mock('../../../../../src/application/controllers/movieController');
jest.mock('../../../../../src/application/controllers/moreMoviesRecomendationController');

const app = express();
app.use('/movies', movieRouter);

describe('Movie router', () => {
    it('should trigger the command route', async () => {
        (MLApiServiceImp as jest.Mock).mockImplementation(() => ({
            triggerML: jest.fn().mockResolvedValue([{ title: 'Movie 1' }, { title: 'Movie 2' }])
        }));

        (TMDBApiExternalService as jest.Mock).mockImplementation(() => ({
            getMoviesByTitle: jest.fn().mockResolvedValue({ results: [{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }] })
        }));

        (GetRecommendedMoviesUseCase as jest.Mock).mockImplementation(() => ({
            execute: jest.fn().mockResolvedValue([{ title: 'Movie 1' }, { title: 'Movie 2' }])
        }));

        (GetMoviesByTitleUseCase as jest.Mock).mockImplementation(() => ({
            execute: jest.fn().mockResolvedValue({ results: [{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }] })
        }));

        (MovieController as jest.Mock).mockImplementation(() => ({
            command: (req, res) => res.json([{ title: 'Movie 1' }, { title: 'Movie 2' }])
        }));

        const response = await request(app)
            .get('/movies')
            .query({
                mood: 'sad',
                primaryGenre: 'Thriller',
                secondaryGenre: 'Thriller',
                epoch: '2010'
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ title: 'Movie 1' }, { title: 'Movie 2' }]);
    });

    it('should trigger the moreRecommendations route', async () => {
        (TMDBApiExternalService as jest.Mock).mockImplementation(() => ({
            getMoviesByTitle: jest.fn().mockResolvedValue({ results: [{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }] })
        }));

        (MoreMoviesRecommendationUseCase as jest.Mock).mockImplementation(() => ({
            execute: jest.fn().mockResolvedValue({ results: [{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }] })
        }));

        (MoreRecommendationsController as jest.Mock).mockImplementation(() => ({
            command: (req, res) => res.json([{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }])
        }));

        const response = await request(app)
            .get('/movies/more-recommendations')
            .query({
                movies: 'Movie 1,Movie 2'
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }]);
    });

    it('should trigger the moreRecommendations route', async () => {
        (TMDBApiExternalService as jest.Mock).mockImplementation(() => ({
            getMoviesByTitle: jest.fn().mockResolvedValue({ results: [{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }] })
        }));

        (MoreMoviesRecommendationUseCase as jest.Mock).mockImplementation(() => ({
            execute: jest.fn().mockResolvedValue({ results: [{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }] })
        }));

        (MoreRecommendationsController as jest.Mock).mockImplementation(() => ({
            command: (req, res) => res.json([{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }])
        }));

        const response = await request(app)
            .get('/movies/more-recommendations')
            .query({
                movies: 'Movie 1,Movie 2'
            });

        expect(response.status).toBe(200);
        expect(response.body).toEqual([{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }]);
    });

    it('should handle errors from TMDBApiExternalService', async () => {
        (TMDBApiExternalService as jest.Mock).mockImplementation(() => ({
            getMoviesByTitle: jest.fn().mockRejectedValue(new Error('TMDB API Error'))
        }));

        (MoreMoviesRecommendationUseCase as jest.Mock).mockImplementation(() => ({
            execute: jest.fn().mockRejectedValue(new Error('TMDB API Error'))
        }));

        (MoreRecommendationsController as jest.Mock).mockImplementation(() => ({
            command: (req, res) => res.status(500).json({ error: 'TMDB API Error' })
        }));

        const response = await request(app)
            .get('/movies/more-recommendations')
            .query({
                movies: 'Movie 1,Movie 2'
            });

        expect(response.status).toBe(500);
        expect(response.body).toEqual({ error: 'TMDB API Error' });
    });
});

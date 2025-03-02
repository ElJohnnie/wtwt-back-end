import request from 'supertest';
import express from 'express';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';
import movieRouter from '../../../../../src/infrastructure/express/routes/movieRoutes';
import { MLApiServiceImp } from '../../../../../src/application/external-services/mlApiServiceImp';
import { TMDBApiExternalService } from '../../../../../src/application/external-services/tmdbServiceImp';
import { MLUsecaseImpl } from '../../../../../src/application/usecases/mlUsecaseImp';
import { MovieByTitleServiceImpl } from '../../../../../src/application/usecases/movieByTitleServiceImp';
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
jest.mock('../../../../../src/application/usecases/mlUsecaseImp');
jest.mock('../../../../../src/application/usecases/movieByTitleServiceImp');
jest.mock('../../../../../src/application/controllers/movieController');


const app = express();
app.use('/movies', movieRouter);

describe('Movie router', () => {
    it('should trigger domain route', async () => {
        (MLApiServiceImp as jest.Mock).mockImplementation(() => ({
            triggerML: jest.fn().mockResolvedValue([{ title: 'Movie 1' }, { title: 'Movie 2' }])
        }));

        (TMDBApiExternalService as jest.Mock).mockImplementation(() => ({
            getMoviesByTitle: jest.fn().mockResolvedValue({ results: [{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }] })
        }));

        (MLUsecaseImpl as jest.Mock).mockImplementation(() => ({
            recommendMovies: jest.fn().mockResolvedValue([{ title: 'Movie 1' }, { title: 'Movie 2' }])
        }));

        (MovieByTitleServiceImpl as jest.Mock).mockImplementation(() => ({
            getMoviesByTitle: jest.fn().mockResolvedValue({ results: [{ title: 'Found Movie 1' }, { title: 'Found Movie 2' }] })
        }));

        (MovieController as jest.Mock).mockImplementation(() => ({
            recommendMovies: (req, res) => res.json([{ title: 'Movie 1' }, { title: 'Movie 2' }])
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
});

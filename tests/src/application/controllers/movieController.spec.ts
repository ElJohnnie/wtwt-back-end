import { Request, Response } from 'express';
import { MovieController } from '../../../../src/application/controllers/movieController';
import { sanitizeTitle } from '../../../../src/utils/sanitizeTitle';
import { TmdbResponse } from '../../../../src/interfaces/dtos/TmdbResponseDTO';

jest.mock('../../../../src/utils/sanitizeTitle');

const mockMovieService = {
    execute: jest.fn()
};

const mockMovieByTitleService = {
    execute: jest.fn()
};
const mockSanitizeTitle = sanitizeTitle as jest.MockedFunction<typeof sanitizeTitle>;


describe('MovieController', () => {
    let movieController: MovieController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        movieController = new MovieController(mockMovieService, mockMovieByTitleService);
        req = {
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    it('should return 400 if data is invalid', async () => {
        req.query = { invalid: 'data' };

        await movieController.command(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            error: "Dados inválidos"
        }));
    });

    it('should return 404 if no recommended movies are found', async () => {
        req.query = { mood: 'sad', primaryGenre: 'Thriller', secondaryGenre: 'Thriller', epoch: '2010' };
        mockMovieService.execute.mockResolvedValue([]);

        await movieController.command(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({ error: "Nenhum filme recomendado encontrado" });
    });

    it('should return recommended and detailed movie data if movies are found', async () => {
        req.query = { mood: 'sad', primaryGenre: 'Thriller', secondaryGenre: 'Thriller', epoch: '2010' };
        const recommendedMovies = [{ title: 'Recommended Movie' }];
        const detailedMovie: TmdbResponse = {
            page: 1,
            results: [{
                adult: false,
                backdrop_path: '/path/to/backdrop.jpg',
                genre_ids: [1, 2, 3],
                id: 12345,
                original_language: 'en',
                original_title: 'Detailed Movie',
                overview: 'Overview of the movie.',
                popularity: 100,
                poster_path: '/path/to/poster.jpg',
                release_date: '2023-01-01',
                title: 'Detailed Movie',
                video: false,
                vote_average: 8.5,
                vote_count: 1000
            }],
            total_pages: 1,
            total_results: 1
        };

        mockMovieService.execute.mockResolvedValue(recommendedMovies);
        mockSanitizeTitle.mockReturnValue('Sanitized Movie');
        mockMovieByTitleService.execute.mockResolvedValue(detailedMovie);

        await movieController.command(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith({
            title: 'Detailed Movie',
            popularity: 8.5,
            backdrop_path: '/path/to/backdrop.jpg',
            overview: 'Overview of the movie.',
            otherMovies: []
        });
    });

    it('should handle errors and return appropriate status and message', async () => {
        req.query = { mood: 'sad', primaryGenre: 'Thriller', secondaryGenre: 'Thriller', epoch: '2010' };
        const error = new Error('Test error');
        mockMovieService.execute.mockRejectedValue(error);

        await movieController.command(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            status: 500,
            error: 'Internal Server Error',
            message: error.message
        }));
    });

    it('should handle errors without response and return status 500', async () => {
        req.query = { mood: 'sad', primaryGenre: 'Thriller', secondaryGenre: 'Thriller', epoch: '2010' };
        const error = new Error('Test error without response');
        mockMovieService.execute.mockRejectedValue(error);

        await movieController.command(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            error: 'Internal Server Error',
            message: 'Test error without response'
        });
    });

    it('should handle errors with response and return the appropriate status and message', async () => {
        req.query = { mood: 'sad', primaryGenre: 'Thriller', secondaryGenre: 'Thriller', epoch: '2010' };
        const error = {
            response: {
                status: 404,
                statusText: 'Not Found'
            },
            message: 'Test error with response'
        };
        mockMovieService.execute.mockRejectedValue(error);

        await movieController.command(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 404,
            error: 'Not Found',
            message: 'Test error with response'
        });
    });

    it('should handle detailed movie fetch errors and return appropriate status and message', async () => {
        req.query = { mood: 'sad', primaryGenre: 'Thriller', secondaryGenre: 'Thriller', epoch: '2010' };
        const recommendedMovies = [{ title: 'Recommended Movie' }];
        mockMovieService.execute.mockResolvedValue(recommendedMovies);
        mockSanitizeTitle.mockReturnValue('Sanitized Movie');
        const error = new Error('Test error during detailed movie fetch');
        mockMovieByTitleService.execute.mockRejectedValue(error);

        await movieController.command(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            error: 'Internal Server Error',
            message: 'Test error during detailed movie fetch'
        });
    });
});

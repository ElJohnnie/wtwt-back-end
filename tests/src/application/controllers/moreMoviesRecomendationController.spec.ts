import { Request, Response } from 'express';
import { MoreRecommendationsController } from '../../../../src/application/controllers/moreMoviesRecomendationController';
import { IUseCases } from '../../../../src/interfaces/usecases/IuseCases';
import { TmdbResponse } from '../../../../src/interfaces/dtos/TmdbResponseDTO';

const mockMoreMoviesRecommendation: IUseCases<TmdbResponse> = {
    execute: jest.fn()
};

describe('MoreRecommendationsController', () => {
    let moreRecommendationsController: MoreRecommendationsController;
    let req: Partial<Request>;
    let res: Partial<Response>;

    beforeEach(() => {
        moreRecommendationsController = new MoreRecommendationsController(mockMoreMoviesRecommendation);
        req = {
            query: {}
        };
        res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };
    });

    afterAll(() => {
        jest.clearAllMocks();
      })

    it('should return combined results from multiple movie titles', async () => {
        req.query = { movies: 'Movie 1,Movie 2' };

        const mockResponse: TmdbResponse = {
            page: 1,
            results: [
                {
                    title: 'Found Movie 1', id: 1, overview: 'Overview 1', popularity: 10, backdrop_path: '', genre_ids: [], original_language: '', original_title: '', poster_path: '', release_date: '', video: false, vote_average: 0, vote_count: 0,
                    adult: false
                },
                {
                    title: 'Found Movie 2', id: 2, overview: 'Overview 2', popularity: 20, backdrop_path: '', genre_ids: [], original_language: '', original_title: '', poster_path: '', release_date: '', video: false, vote_average: 0, vote_count: 0,
                    adult: false
                }
            ],
            total_pages: 1,
            total_results: 2
        };

        (mockMoreMoviesRecommendation.execute as jest.Mock).mockResolvedValue(mockResponse);

        await moreRecommendationsController.command(req as Request, res as Response);

        expect(res.json).toHaveBeenCalledWith(mockResponse);
    });

    it('should handle errors and return appropriate status and message', async () => {
        req.query = { movies: 'Movie 1,Movie 2' };

        const error = new Error('Test error');
        (mockMoreMoviesRecommendation.execute as jest.Mock).mockRejectedValue(error);

        await moreRecommendationsController.command(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            status: 500,
            error: 'Internal Server Error',
            message: error.message
        });
    });

    it('should handle errors with response and return the appropriate status and message', async () => {
        req.query = { movies: 'Movie 1,Movie 2' };

        const error = {
            response: {
                status: 404,
                statusText: 'Not Found'
            },
            message: 'Test error with response'
        };
        (mockMoreMoviesRecommendation.execute as jest.Mock).mockRejectedValue(error);

        await moreRecommendationsController.command(req as Request, res as Response);

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
            status: 404,
            error: 'Not Found',
            message: 'Test error with response'
        });
    });
});

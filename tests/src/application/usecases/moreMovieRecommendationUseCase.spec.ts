import { TMDBApiExternalService } from '../../../../src/application/external-services/tmdbServiceImp';
import { MoreMoviesRecommendationUseCase } from '../../../../src/application/usecases/moreMovieRecommendationUseCase';
import { TmdbResponse } from '../../../../src/interfaces/tmdbServiceInterface';

jest.mock('../../../../src/application/external-services/tmdbServiceImp');

const mockTMDBApiExternalService = new TMDBApiExternalService() as jest.Mocked<TMDBApiExternalService>;

describe('MoreMoviesRecommendationUseCase', () => {
    let moreMoviesRecommendationUseCase: MoreMoviesRecommendationUseCase;

    beforeEach(() => {
        jest.clearAllMocks();
        moreMoviesRecommendationUseCase = new MoreMoviesRecommendationUseCase(mockTMDBApiExternalService);
    });

    it('should return combined results from multiple movie titles', async () => {
        const params = {
            query: ['Movie 1', 'Movie 2'],
            language: 'en-US'
        };

        const mockResponse1: TmdbResponse = {
            page: 1,
            results: [
                {
                    title: 'Movie 1', id: 1, overview: 'Overview 1', popularity: 10, backdrop_path: '', genre_ids: [], original_language: '', original_title: '', poster_path: '', release_date: '', video: false, vote_average: 0, vote_count: 0,
                    adult: false
                }
            ],
            total_pages: 1,
            total_results: 1
        };

        const mockResponse2: TmdbResponse = {
            page: 1,
            results: [
                {
                    title: 'Movie 2', id: 2, overview: 'Overview 2', popularity: 20, backdrop_path: '', genre_ids: [], original_language: '', original_title: '', poster_path: '', release_date: '', video: false, vote_average: 0, vote_count: 0,
                    adult: false
                }
            ],
            total_pages: 1,
            total_results: 1
        };

        mockTMDBApiExternalService.getMoviesByTitle
            .mockResolvedValueOnce(mockResponse1)
            .mockResolvedValueOnce(mockResponse2);

        const result = await moreMoviesRecommendationUseCase.execute(params);

        expect(result.results).toHaveLength(2);
        expect(result.results).toEqual(expect.arrayContaining([
            expect.objectContaining({ title: 'Movie 1' }),
            expect.objectContaining({ title: 'Movie 2' })
        ]));
    });

    it('should handle empty query array', async () => {
        const params = {
            query: [],
            language: 'en-US'
        };

        const result = await moreMoviesRecommendationUseCase.execute(params);

        expect(result.results).toHaveLength(0);
        expect(result.total_results).toBe(0);
    });

    it('should handle errors from TMDBApiExternalService', async () => {
        const params = {
            query: ['Movie 1'],
            language: 'en-US'
        };

        mockTMDBApiExternalService.getMoviesByTitle.mockRejectedValue(new Error('TMDB API Error'));

        await expect(moreMoviesRecommendationUseCase.execute(params)).rejects.toThrow('TMDB API Error');
    });
});

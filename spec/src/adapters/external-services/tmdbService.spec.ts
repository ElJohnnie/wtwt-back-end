import { AxiosError } from 'axios';
import { TMDBApiExternalService } from '../../../../src/adapters/external-services/tmdbService';
import { TmdbResponseDTO } from '../../../../src/adapters/external-services/dtos/tmdb-dto';

process.env.TMDB_API_TOKEN = 'mock';

const tmdbApiService = new TMDBApiExternalService();

describe('TMDBApiExternalService', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    it('should fetch movies by title', async () => {
        const params = {
            query: 'Movie Title',
            include_adult: false,
            language: 'en-US'
        };

        const mockResponse: TmdbResponseDTO = {
            page: 1,
            results: [
                {
                    adult: false,
                    backdrop_path: '/backdrop_path.jpg',
                    genre_ids: [1, 2],
                    id: 123,
                    original_language: 'en',
                    original_title: 'Original Movie Title',
                    overview: 'Movie overview',
                    popularity: 100.0,
                    poster_path: '/poster_path.jpg',
                    release_date: '2023-01-01',
                    title: 'Movie Title',
                    video: false,
                    vote_average: 8.5,
                    vote_count: 1000
                }
            ],
            total_pages: 1,
            total_results: 1
        };

        jest.spyOn(tmdbApiService['_axiosInstance'], 'get').mockResolvedValue({ data: mockResponse });

        const movies = await tmdbApiService.getMoviesByTitle(params);

        expect(movies.results.length).toBeGreaterThan(0);
        expect(movies.results[0].title).toBe('Movie Title');
    });

    it('should handle error when fetching movies with invalid params', async () => {
        const params = {
            query: '',
            include_adult: false,
            language: 'en-US'
        };

        jest.spyOn(tmdbApiService['_axiosInstance'], 'get').mockRejectedValue(new AxiosError('Invalid params'));

        await expect(tmdbApiService.getMoviesByTitle(params)).rejects.toThrowError(AxiosError);
    });
});

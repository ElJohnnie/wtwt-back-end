import { TMDBApiExternalService } from '../../../../src/adapters/external-services/tmdbService';
import { AxiosError } from 'axios';

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

        const movies = await tmdbApiService.getMoviesByTitle(params);

        expect(movies.results.length).toBeGreaterThan(0);
    });

    it('should handle error when fetching movies with invalid params', async () => {
        const params = {
            query: '',
            include_adult: false,
            language: 'en-US'
        };

        await expect(tmdbApiService.getMoviesByTitle(params)).rejects.toThrowError(AxiosError);
    });
});

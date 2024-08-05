import { TMDBApiExternalService } from '../../../../src/application/external-services/tmdbService';
import { AxiosInstance } from 'axios';
import { MovieByTitleServiceImpl } from '../../../../src/application/usecases/movieByTitleServiceImp';

process.env.TMDB_API_TOKEN = 'mock';

const axiosInstance = {
    get: jest.fn().mockResolvedValue({ data: { results: [{ title: 'Movie 1' }, { title: 'Movie 2' }] } })
} as unknown as AxiosInstance;

class MockTMDBApiExternalService extends TMDBApiExternalService {
    constructor() {
        super();
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (this as any)._axiosInstance = axiosInstance;
    }
}

const mockTMDBApiService = new MockTMDBApiExternalService();
const movieByTitleService = new MovieByTitleServiceImpl(mockTMDBApiService);

describe('MovieByTitleServiceImpl', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });
    it('should fetch movies by title', async () => {
        const params = {
            query: 'Movie Title',
            include_adult: false,
            language: 'en-US'
        };

        const movies = await movieByTitleService.getMoviesByTitle(params);

        expect(movies.results).toEqual([{ title: 'Movie 1' }, { title: 'Movie 2' }]);

        expect(axiosInstance.get).toHaveBeenCalledWith('/search/movie', {
            params: {
                query: 'Movie Title',
                include_adult: false,
                language: 'en-US',
                primary_release_year: undefined,
                page: undefined,
                region: undefined,
                year: undefined
            }
        });
    });
});

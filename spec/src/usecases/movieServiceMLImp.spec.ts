import { MovieServiceImpl } from '../../../src/usecases/movieServiceMLImp';
import { MovieApiService } from '../../../src/adapters/external-services/mlApiServiceInterface';
import { Movie } from '../../../src/domain/entities/movie';

const mockMovieApiService: MovieApiService = {
    triggerML: jest.fn().mockResolvedValue([{ title: 'Movie 1' }, { title: 'Movie 2' }])
};

const movieService = new MovieServiceImpl(mockMovieApiService);

describe('MovieServiceImpl', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    });

    it('should return processed recommended movies', async () => {
        const movieData: Movie = {
            mood: 'sad',
            primaryGenre: 'Thriller',
            secondaryGenre: 'Thriller',
            epoch: '2010'
        };

        const recommendedMovies = await movieService.getRecommendedMovies(movieData);

        expect(recommendedMovies).toEqual([{ title: 'Movie 1' }, { title: 'Movie 2' }]);
    });
});

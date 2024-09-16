import { Movie } from '../../../../src/domain/entities/movie';
import { MovieServiceImpl } from '../../../../src/application/usecases/movieServiceMLImp';

const mockMovieApiService = {
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

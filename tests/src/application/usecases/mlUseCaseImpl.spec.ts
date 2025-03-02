import { Movie } from '../../../../src/domain/entities/movie';
import { MLUsecaseImpl } from '../../../../src/application/usecases/mlUsecaseImp';


const mockMovieApiService = {
    triggerML: jest.fn().mockResolvedValue([{ title: 'Movie 1' }, { title: 'Movie 2' }])
};

const mlUsecase = new MLUsecaseImpl(mockMovieApiService);

describe('MovieServiceImpl', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('should return processed recommended movies', async () => {
        const movieData: Movie = {
            mood: 'sad',
            primaryGenre: 'Thriller',
            secondaryGenre: 'Thriller',
            epoch: '2010'
        };

        const recommendedMovies = await mlUsecase.getRecommendedMovies(movieData);

        expect(recommendedMovies).toEqual(expect.any(Array));
        expect(recommendedMovies[0]).toHaveProperty('title');
    });

    it('should call triggerML with correct movie data', async () => {
        const movieData: Movie = {
            mood: 'happy',
            primaryGenre: 'Comedy',
            secondaryGenre: 'Romance',
            epoch: '2000'
        };

        await mlUsecase.getRecommendedMovies(movieData);

        expect(mockMovieApiService.triggerML).toHaveBeenCalledWith(movieData);
    });

    it('should process recommended movies correctly', async () => {
        const movieData: Movie = {
            mood: 'excited',
            primaryGenre: 'Action',
            secondaryGenre: 'Adventure',
            epoch: '2020'
        };

        const recommendedMovies = await mlUsecase.getRecommendedMovies(movieData);

        expect(recommendedMovies[0]).toEqual(expect.objectContaining({ title: expect.any(String) }));
    });

    it('should randomize choice correctly when there is more than one movie', async () => {
        const movieData: Movie = {
            mood: 'bored',
            primaryGenre: 'Drama',
            secondaryGenre: 'Mystery',
            epoch: '1990'
        };

        const recommendedMovies = await mlUsecase.getRecommendedMovies(movieData);

        expect(recommendedMovies.length).toBe(2);
        expect(['Movie 1', 'Movie 2']).toContain(recommendedMovies[0].title);
    });

    it('should return the only movie when there is one movie', async () => {
        mockMovieApiService.triggerML.mockResolvedValueOnce([{ title: 'Only Movie' }]);

        const movieData: Movie = {
            mood: 'neutral',
            primaryGenre: 'Documentary',
            secondaryGenre: 'Biography',
            epoch: '2015'
        };

        const recommendedMovies = await mlUsecase.getRecommendedMovies(movieData);

        expect(recommendedMovies.length).toBe(1);
        expect(recommendedMovies[0].title).toBe('Only Movie');
    });
});

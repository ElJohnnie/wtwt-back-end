import { randomizeChoice } from '../../../src/utils/randomizeChoise';
import { MoviePredicted } from '../../../src/interfaces/dtos/mlApi-dto';

const mockMovies: MoviePredicted[] = [
    { title: 'Movie 1', genres: ['Action', 'Adventure'] },
    { title: 'Movie 2', genres: ['Drama', 'Romance'] },
    { title: 'Movie 3', genres: ['Comedy'] },
];

describe('randomizeChoice', () => {

    it('should return a movie from the array', () => {
        const result = randomizeChoice(mockMovies);
        expect(mockMovies).toContain(result);
    });

    it('should handle arrays with one element', () => {
        const singleMovieArray: MoviePredicted[] = [{ title: 'Movie 4', genres: ['Horror'] }];
        const result = randomizeChoice(singleMovieArray);
        expect(result).toEqual(singleMovieArray[0]);
    });
});

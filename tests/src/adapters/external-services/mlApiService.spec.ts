
import axios from 'axios';
import { MovieApiServiceImp } from '../../../../src/adapters/external-services/mlApiService';
import { Movie } from '../../../../src/domain/entities/movie';
import { AxiosClient } from '../../../../src/infrastructure/axios/axiosClient';

process.env.ML_API_URL = 'http://mockapi.com';
process.env.ML_API_TOKEN = 'mockToken';

jest.mock('axios');
jest.mock('../../../../src/infrastructure/axios/axiosClient');
const mockedAxios = axios as jest.Mocked<typeof axios>;
const mockedAxiosClient = AxiosClient as jest.Mocked<typeof AxiosClient>;

describe('MovieApiServiceImp', () => {
    let movieApiService: MovieApiServiceImp;

    beforeEach(() => {
        mockedAxiosClient.getInstance.mockReturnValue(mockedAxios);
        movieApiService = new MovieApiServiceImp();
    });

    it('should trigger ML API with movie parameters', async () => {
        const movieParams: Movie = {
            mood: 'happy',
            primaryGenre: 'Action',
            secondaryGenre: 'Comedy',
            epoch: '2020'
        };

        const mockResponse = {
            data: [
                { title: 'Predicted Movie 1' },
                { title: 'Predicted Movie 2' }
            ]
        };

        mockedAxios.post.mockResolvedValueOnce({ data: mockResponse });

        const predictedMovies = await movieApiService.triggerML(movieParams);

        expect(predictedMovies).toEqual(mockResponse.data);
        expect(mockedAxios.post).toHaveBeenCalledWith('/ml', {
            mood: movieParams.mood,
            primaryGenre: movieParams.primaryGenre,
            secondaryGenre: movieParams.secondaryGenre,
            epoch: Number(movieParams.epoch)
        });
    });
});

import { MLApiServiceImp } from '../../../../src/application/external-services/mlApiServiceImp';
import { AxiosAdapter } from '../../../../src/infrastructure/adapters/axiosAdapter';
import { MainRequestDTO } from '../../../../src/interfaces/dtos/mainRequestDTO';

jest.mock('../../../../src/infrastructure/adapters/axiosAdapter');

describe('MLApiServiceImp with Adapter', () => {
    let mlApiService: MLApiServiceImp;
    const postMock = jest.fn();

    beforeEach(() => {
        (AxiosAdapter as jest.Mock).mockClear();
        postMock.mockClear();

        (AxiosAdapter as jest.Mock).mockImplementation(() => ({
            post: postMock
        }));

        process.env.ML_API_URL = 'http://mockapi.com';
        process.env.ML_API_TOKEN = 'mockToken';

        mlApiService = new MLApiServiceImp();
    });

    it('should trigger ML API with movie parameters using adapter', async () => {
        const movieParams: MainRequestDTO = {
            mood: 'happy',
            primaryGenre: 'Action',
            secondaryGenre: 'Comedy',
            epoch: '2020'
        };

        const mockResponseData = [
            { title: 'Predicted Movie 1' },
            { title: 'Predicted Movie 2' }
        ];

        const mockResponse = { data: mockResponseData };

        postMock.mockResolvedValueOnce(mockResponse);

        const result = await mlApiService.command(movieParams);

        expect(result).toEqual(mockResponseData);
        expect(postMock).toHaveBeenCalledWith('/ml', {
            mood: movieParams.mood,
            primaryGenre: movieParams.primaryGenre,
            secondaryGenre: movieParams.secondaryGenre,
            epoch: Number(movieParams.epoch)
        });

        expect(AxiosAdapter).toHaveBeenCalledWith('http://mockapi.com');
    });
});

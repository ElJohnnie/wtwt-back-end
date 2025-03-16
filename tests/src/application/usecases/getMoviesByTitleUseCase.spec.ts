import { TMDBApiExternalService } from '../../../../src/application/external-services/tmdbServiceImp';
import { AxiosAdapter } from '../../../../src/infrastructure/adapters/axiosAdapter';
import { TmdbResponse } from '../../../../src/interfaces/dtos/TmdbResponseDTO';
import { GetMoviesByTitleUseCase } from '../../../../src/application/usecases/getMoviesByTitleUseCase';

jest.mock('../../../../src/infrastructure/adapters/axiosAdapter');

describe('GetMoviesByTitleUseCase', () => {
  const mockToken = 'mockToken';
  const mockURL = 'http://mocktmdb.com';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TMDB_API_TOKEN = mockToken;
    process.env.TMDB_API_URL = mockURL;
  });

  it('should fetch movies by title', async () => {
    const params = {
      query: 'Some Movie',
      include_adult: false,
      language: 'en-US'
    };

    const mockTmdbResponse: TmdbResponse = {
      page: 1,
      results: [
        {
          adult: false,
          backdrop_path: '/someBackdrop.jpg',
          genre_ids: [1, 2],
          id: 456,
          original_language: 'en',
          original_title: 'Some Original Title',
          overview: 'Overview text',
          popularity: 50.0,
          poster_path: '/somePoster.jpg',
          release_date: '2022-12-12',
          title: 'Some Movie',
          video: false,
          vote_average: 7.2,
          vote_count: 345
        }
      ],
      total_pages: 1,
      total_results: 1
    };

    const getMock = jest.fn().mockResolvedValue(mockTmdbResponse );
    (AxiosAdapter as jest.Mock).mockImplementation(() => ({
      get: getMock
    }));

    const tmdbService = new TMDBApiExternalService();
    const useCase = new GetMoviesByTitleUseCase(tmdbService);

    const response = await useCase.execute(params);

    expect(getMock).toHaveBeenCalledWith('/search/movie', {
      params: {
        query: params.query,
        include_adult: params.include_adult,
        language: params.language,
        primary_release_year: undefined,
        page: undefined,
        region: undefined,
        year: undefined
      }
    });
    expect(response.results[0].title).toBe('Some Movie');
    expect(AxiosAdapter).toHaveBeenCalledWith(mockURL, mockToken);
  });
});

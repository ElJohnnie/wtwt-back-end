import { AxiosError } from 'axios';
import { TMDBApiExternalService } from '../../../../src/application/external-services/tmdbServiceImp';
import { TmdbResponse } from '../../../../src/interfaces/dtos/TmdbResponseDTO';
import { AxiosAdapter } from '../../../../src/infrastructure/adapters/axiosAdapter';

jest.mock('../../../../src/infrastructure/adapters/axiosAdapter');

describe('TMDBApiExternalService', () => {
  const mockToken = 'mockToken';
  const mockURL = 'http://mocktmdb.com';

  beforeEach(() => {
    jest.clearAllMocks();
    process.env.TMDB_API_TOKEN = mockToken;
    process.env.TMDB_API_URL = mockURL;
  });

  it('should fetch movies by title', async () => {
    const params = {
      query: 'Movie Title',
      include_adult: false,
      language: 'en-US'
    };

    const mockResponse: TmdbResponse = {
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

    const getMock = jest.fn().mockResolvedValue(mockResponse);
    (AxiosAdapter as jest.Mock).mockImplementation(() => ({
      get: getMock
    }));

    const tmdbApiService = new TMDBApiExternalService();
    const movies = await tmdbApiService.command(params);

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

    expect(movies.results).toBeDefined();
    expect(movies.results[0].title).toBe('Movie Title');
    expect(AxiosAdapter).toHaveBeenCalledWith(mockURL, mockToken);
  });

  it('should handle error when fetching movies with invalid params', async () => {
    const params = {
      query: '',
      include_adult: false,
      language: 'en-US'
    };

    const getMock = jest.fn().mockRejectedValue(new AxiosError('Invalid params'));
    (AxiosAdapter as jest.Mock).mockImplementation(() => ({
      get: getMock
    }));

    const tmdbApiService = new TMDBApiExternalService();
    await expect(tmdbApiService.command(params)).rejects.toThrowError(AxiosError);
  });
});

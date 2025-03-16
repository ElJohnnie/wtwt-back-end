import { TmdbResponse } from '../../interfaces/dtos/TmdbResponseDTO';
import { IRestClient } from '../../interfaces/infrastructure/adapters/IrestClient';
import { AxiosAdapter } from '../../infrastructure/adapters/axiosAdapter';
import { IExternalServices } from '../../interfaces/external-services/IExternalServices';

export class TMDBApiExternalService implements IExternalServices<TmdbResponse> {
    private readonly restClient: IRestClient;

    constructor() {
        const baseURL = process.env.TMDB_API_URL;
        const token = process.env.TMDB_API_TOKEN;
        this.restClient = new AxiosAdapter(baseURL, token);
    }

    async command(params: {
        query: string;
        include_adult?: boolean;
        language?: string;
        primary_release_year?: string;
        page?: number;
        region?: string;
        year?: string;
    }): Promise<TmdbResponse> {
        const response = await this.restClient.get<TmdbResponse>('/search/movie', {
            params: {
                query: params.query,
                include_adult: params.include_adult,
                language: params.language,
                primary_release_year: params.primary_release_year,
                page: params.page,
                region: params.region,
                year: params.year
            }
        });
        return response;
    }
}

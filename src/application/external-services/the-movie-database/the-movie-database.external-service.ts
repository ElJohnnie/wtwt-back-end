import { OutputTMDB } from './the-movie-database.dto';
import { IRestClient } from '../../../@shared/infrastructure/adapters/adapters.interface';
import { AxiosAdapter } from '../../../infrastructure/adapters/axios.adapter';
import { IExternalServices } from '../../../@shared/external-services/external-services.interface';

export class TMDBExternalService implements IExternalServices<OutputTMDB> {
    private readonly restClient: IRestClient;

    constructor() {
        const baseURL = process.env.TMDB_API_URL;
        const token = process.env.TMDB_API_TOKEN;
        this.restClient = new AxiosAdapter(baseURL, token);
    }

    async command(params): Promise<OutputTMDB> {
        const response = await this.restClient.get<OutputTMDB>('/search/movie', {
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

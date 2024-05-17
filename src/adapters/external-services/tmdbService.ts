import { AxiosInstance } from 'axios';
import { TmdbResultDTO } from './dtos/tmdb-dto';
import { AxiosClient } from "../../infrastructure/axios/axiosClient";

export class TMDBApiExternalService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = AxiosClient.getInstance();
    }

    async getMoviesByTitle(params: {
        query: string;
        include_adult: boolean;
        language: string;
        primary_release_year: string;
        page: number;
        region: string;
        year: string;
    }): Promise<TmdbResultDTO> {
        const response = await this.axiosInstance.get<TmdbResultDTO>('/search/movie', {
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

        return response.data;
    }
}

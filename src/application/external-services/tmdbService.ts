import { AxiosInstance } from 'axios';
import { TmdbResponseDTO } from '../../interfaces/dtos/tmdb-dto';
import { AxiosClient } from "../../infrastructure/axios/axiosClient";

export class TMDBApiExternalService {
    private _axiosInstance: AxiosInstance;

    constructor() {
        this._axiosInstance = AxiosClient.getInstance(process.env.TMDB_API_URL);
    }

    async getMoviesByTitle(params: {
        query: string;
        include_adult?: boolean;
        language?: string;
        primary_release_year?: string;
        page?: number;
        region?: string;
        year?: string;
    }): Promise<TmdbResponseDTO> {
        const response = await this._axiosInstance.get<TmdbResponseDTO>('/search/movie', {
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
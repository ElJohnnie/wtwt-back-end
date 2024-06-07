import { ProcessedMovie, Movie } from "../../domain/movie";
import { MovieApiService } from "./movieApiService";
import { AxiosInstance } from 'axios';
import { PredictionResponseDTO } from './dtos/tmdb-dto';
import { AxiosClient } from "../../infrastructure/axios/axiosClient";
import { enviroment } from "../../infrastructure/express/config/dotEnvConfig";

export class MovieApiServiceImp implements MovieApiService {
    private axiosInstance: AxiosInstance;

    constructor() {
        this.axiosInstance = AxiosClient.getInstance(enviroment.ML_API_URL);
    }

    async triggerML(params: Movie): Promise<ProcessedMovie[]> {

        const response = await this.axiosInstance.post<PredictionResponseDTO>('/ml', {
            mood: params.mood,
            primaryGenre: params.primaryGenre,
            secondaryGenre: params.secondaryGenre,
            epoch: parseInt(params.epoch)
        });

        const { data } = response;

        return data.data;
    }
}

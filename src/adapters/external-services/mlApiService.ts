import { Movie } from "../../domain/entities/movie";
import { MovieApiService } from "./mlApiServiceInterface";
import { AxiosInstance } from 'axios';
import { PredictionResponseDTO, MoviePredicted } from "./dtos/mlApi-dto";
import { AxiosClient } from "../../infrastructure/axios/axiosClient";

export class MovieApiServiceImp implements MovieApiService {
    private _axiosInstance: AxiosInstance;

    constructor() {
        this._axiosInstance = AxiosClient.getInstance(process.env.ML_API_URL);
    }

    async triggerML(params: Movie): Promise<MoviePredicted[]> {

        const response = await this._axiosInstance.post<PredictionResponseDTO>('/ml', {
            mood: params.mood,
            primaryGenre: params.primaryGenre,
            secondaryGenre: params.secondaryGenre,
            epoch: parseInt(params.epoch)
        });

        const { data } = response;

        return data.data;
    }
}

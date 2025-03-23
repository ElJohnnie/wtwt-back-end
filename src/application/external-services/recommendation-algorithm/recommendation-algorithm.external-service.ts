import { IRestClient } from "../../../@shared/infrastructure/adapters/adapters.interface";
import { AxiosAdapter } from "../../../infrastructure/adapters/axios.adapter";
import { OutputRecommendationAlgorithm, InputRecommendationAlgorithm, PredictionResponse } from "./recommendation-algorithm.dto";
import { IExternalServices } from "../../../@shared/external-services/external-services.interface";

export class RecommendationAlgorithm implements IExternalServices<OutputRecommendationAlgorithm[]> {
    private readonly restClient: IRestClient;

    constructor() {
        const baseURL = process.env.ML_API_URL;
        this.restClient = new AxiosAdapter(baseURL);
    }

    async command(params: InputRecommendationAlgorithm): Promise<OutputRecommendationAlgorithm[]> {
        const response = await this.restClient.post<PredictionResponse>('/ml', {
            mood: params.mood,
            primaryGenre: params.primaryGenre,
            secondaryGenre: params.secondaryGenre,
            epoch: parseInt(params.epoch)
        });

        return response.data;
    }
}

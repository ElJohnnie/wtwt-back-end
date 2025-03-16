import { IRestClient } from "../../interfaces/infrastructure/adapters/IrestClient";
import { AxiosAdapter } from "../../infrastructure/adapters/axiosAdapter";
import { MoviePredicted, PredictionResponse } from "../../interfaces/dtos/mlServiceDTO";
import { IExternalServices } from "../../interfaces/external-services/IExternalServices";

export class MLApiServiceImp implements IExternalServices<MoviePredicted[]> {
    private readonly restClient: IRestClient;

    constructor() {
        const baseURL = process.env.ML_API_URL;
        this.restClient = new AxiosAdapter(baseURL);
    }

    async command(params): Promise<MoviePredicted[]> {
        const response = await this.restClient.post<PredictionResponse>('/ml', {
            mood: params.mood,
            primaryGenre: params.primaryGenre,
            secondaryGenre: params.secondaryGenre,
            epoch: parseInt(params.epoch)
        });

        return response.data;
    }
}

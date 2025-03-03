export interface MoreMoviesRecommendationsInterface<T> {
    execute(params: {
        query: string[];
        include_adult?: boolean;
        language?: string;
        primary_release_year?: string;
        page?: number;
        region?: string;
        year?: string;
    }): Promise<T>;
}

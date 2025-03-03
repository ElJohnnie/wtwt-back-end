export interface GetRecommendedMoviesInterface<T> {
    execute(data: unknown): Promise<T>;
}

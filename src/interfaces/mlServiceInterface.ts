export interface MLServiceInterface<T> {
    getRecommendedMovies(data: unknown): Promise<T>;
}

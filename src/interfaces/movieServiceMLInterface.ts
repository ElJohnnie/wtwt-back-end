export interface MovieServiceInterface<T> {
    getRecommendedMovies(data: unknown): Promise<T>;
}

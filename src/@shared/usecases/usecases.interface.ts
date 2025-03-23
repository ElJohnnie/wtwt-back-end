export interface IUseCases<T> {
    execute(data: unknown): Promise<T>;
}

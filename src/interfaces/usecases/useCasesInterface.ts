export interface UseCasesInterface<T> {
    execute(data: unknown): Promise<T>;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRestClient {
    get<T>(url: string, config?: any): Promise<T>;
    post<T>(url: string, data?: any, config?: any): Promise<T>;
}

import axios, { AxiosRequestConfig } from 'axios';
import { AxiosAdapter } from '../../../../src/infrastructure/adapters/axiosAdapter';

jest.mock('axios');

describe('AxiosAdapter', () => {
  const baseURL = 'http://example.com';
  const token = 'myToken';
  let axiosInstanceMock: { get: jest.Mock; post: jest.Mock };
  let adapter: AxiosAdapter;

  beforeEach(() => {
    axiosInstanceMock = {
      get: jest.fn(),
      post: jest.fn()
    };

    (axios.create as jest.Mock).mockReturnValue(axiosInstanceMock);
    adapter = new AxiosAdapter(baseURL, token);
  });

  afterAll(() => {
    jest.clearAllMocks();
  })

  describe('get', () => {
    it('should call axios instance get and return response data', async () => {
      const targetData = { foo: 'bar' };
      const response = { data: targetData };
      axiosInstanceMock.get.mockResolvedValue(response);

      const config: AxiosRequestConfig = { params: { test: 'param' } };
      const result = await adapter.get<{ foo: string }>('/endpoint', config);

      expect(axiosInstanceMock.get).toHaveBeenCalledWith('/endpoint', config);
      expect(result).toEqual(targetData);
    });
  });

  describe('post', () => {
    it('should call axios instance post and return response data', async () => {
      const targetData = { success: true };
      const response = { data: targetData };
      axiosInstanceMock.post.mockResolvedValue(response);

      const dataToSend = { key: 'value' };
      const config: AxiosRequestConfig = { headers: { 'Content-Type': 'application/json' } };
      const result = await adapter.post<{ success: boolean }>('/endpoint', dataToSend, config);

      expect(axiosInstanceMock.post).toHaveBeenCalledWith('/endpoint', dataToSend, config);
      expect(result).toEqual(targetData);
    });
  });
});

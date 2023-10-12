import axios, { AxiosResponse, AxiosError } from 'axios';

class ApiService {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.get(`${this.baseUrl}/${endpoint}`);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.post(`${this.baseUrl}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.put(`${this.baseUrl}/${endpoint}`, data);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  async delete<T>(endpoint: string): Promise<T> {
    try {
      const response: AxiosResponse<T> = await axios.delete(`${this.baseUrl}/${endpoint}`);
      return response.data;
    } catch (error) {
      throw this.handleApiError(error);
    }
  }

  private handleApiError(error: AxiosError) {
    if (error.response) {
      // Handle the API response error (e.g., status code, error messages)
      console.error('API Error:', error.response.status, error.response.data);
      throw new Error(`API Error: ${error.response.status}`);
    } else {
      // Handle other types of errors (e.g., network issues)
      console.error('Network Error:', error.message);
      throw new Error('Network Error');
    }
  }
}

export default ApiService;

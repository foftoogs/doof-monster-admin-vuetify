import axios from 'axios';

export default class dmApi {
  constructor({ token }) {
    
    this.baseUrl = import.meta.env.VITE_DOOF_MONSTER_API_BASE_URL;

    const headers = {
      'Content-Type': 'application/json'
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: headers
    });

    // this.axiosInstance.interceptors.request.use(config => {
    //   // Modify the request config here if needed
    //   return config;
    // });

    // this.axiosInstance.interceptors.response.use(response => {
    //   // Modify the response data here if needed
    //   return response;
    // }, error => {
    //   // Handle common error scenarios here
    //   return Promise.reject(error);
    // });
  }

  async get(resource, params = {}) {
    try {
      const response = await this.axiosInstance.get(resource, { params });
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: error.response.data,
        error: `GET request to ${resource} failed: ${error.message}`
      };
    }
  }

  async post(resource, data) {
    try {
      const response = await this.axiosInstance.post(resource, data);
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: error.response.data,
        error: `POST request to ${resource} failed: ${error.message}`
      };
    }
  }

  async put(resource, data) {
    try {
      const response = await this.axiosInstance.put(resource, data);
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: `PUT request to ${resource} failed: ${error.message}`
      };
    }
  }

  async delete(resource) {
    try {
      const response = await this.axiosInstance.delete(resource);
      return {
        success: true,
        data: response.data,
        error: null
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        error: `DELETE request to ${resource} failed: ${error.message}`
      };
    }
  }
}
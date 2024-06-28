import axios from "axios";

import { checkToken, clearToken } from "../utils/tokenHandler";
const baseURL = import.meta.env.VITE_BASEURL;


const instance = axios.create({
    baseURL,
    headers: {
        "Access-Control-Allow-Origin": "*"
    },
});

// Function to add the access token to the headers
export const addAccessToken = (token) => {
    if (!token) {
        const { access_token } = checkToken();
        instance.defaults.headers.common["Authorization"] = `${access_token ? access_token : ""}`;
    } else {
        instance.defaults.headers.common["Authorization"] = `${token}`;
    }
    instance.defaults.headers.common["Accept"] = `application/json`;
};

// Axios interceptor for handling 401 responses
const interceptor = instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const { status } = error.response;
        if (status === 401 && !error.config._isRetry) {
            try {
                // Retry the original request after token refresh
                error.config._isRetry = true;
                clearToken()
                return instance(error.config);
            } catch (refreshError) {
                if (refreshError.response && refreshError.response.status === 401) {
                    clearToken();
                    throw refreshError;
                }
            }
        }
        throw error;
    }
);

// Function to remove the interceptor when it's no longer needed
const removeInterceptor = () => {
    instance.interceptors.response.eject(interceptor);
};

// Add the access token to headers
addAccessToken();

const Api = {
    get: async (url, params) => {
        try {
            const response = await instance.get(url, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    post: async (url, data, params) => {
        try {
            const response = await instance.post(url, data, { params });
            console.log(response)
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    put: async (url, data, params) => {
        try {
            const response = await instance.put(url, data, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    delete: async (url, params) => {
        try {
            const response = await instance.delete(url, { params });
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    removeInterceptor, // Expose the removeInterceptor function for cleanup
};

export default Api;

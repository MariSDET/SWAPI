// Import necessary modules
import axios, { AxiosRequestConfig } from "axios";

// Define Star Wars API base URL and timeout
const starWarsBaseUrl = "https://swapi.dev/api";
const starWarsTimeout = 20000;

// Configuration for Axios HTTP client
export const axiosConfiguration: AxiosRequestConfig = {
    baseURL: starWarsBaseUrl,
    timeout: starWarsTimeout,
    validateStatus: function (status: number) {
        return status < 500;
    },
};

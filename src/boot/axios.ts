import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: 'en-US',
  },
});

import axios from 'axios';

const API_KEY = 'db45f2cd18573c9215c3ec521b0ac439';
const BASE_URL = 'https://api.themoviedb.org/3';

export const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: 'en-US',
  },
});

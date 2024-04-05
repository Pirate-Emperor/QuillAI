import axios from 'axios';

const axios_b = axios.create({
    baseURL: `http://localhost:8000/api/blog`, // dev
  });

const config = {
    axios_b,
    DEFAULT_PAGE_SIZE: 10,
};
  
export default config;
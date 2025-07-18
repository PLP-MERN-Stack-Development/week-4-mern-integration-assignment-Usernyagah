import axios from 'axios';

const useApi = () => {
  const instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  });

  return instance;
};

export default useApi;

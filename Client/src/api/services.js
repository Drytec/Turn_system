import axios from "axios";

const servicesApi = axios.create({
    baseURL: 'http://127.0.0.1:8000/service/',
  });

export const getServices = async () => {
  const response = await servicesApi.get ('/');
  return response.data;
};


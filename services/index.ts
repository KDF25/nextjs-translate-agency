import axios, { AxiosHeaders, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const $host: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

const $authHost: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json'
  },
});

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const token = localStorage.getItem("token");
  if (token) {
    if (config.headers) {
      (config.headers as AxiosHeaders).set('authorization', `Bearer ${token}`);
    } else {
      config.headers = new AxiosHeaders({ authorization: `Bearer ${token}` });
    }
  }
  return config;
};

$authHost.interceptors.request.use(authInterceptor);

export { $host, $authHost };

import axios from "axios";
import store from "./../store";

const api = axios.create({});

api.interceptors.request.use((config) => {
  const session = store.state.user.session;
  if (session == null) {
    return config;
  }

  config.headers.common["Authorization"] = `Bearer ${session.access_token}`;
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const API_KEY = process.env.VUE_APP_API_KEY;
      const API_SECRET = process.env.VUE_APP_API_SECRET;
      const encodedApiCredentials = btoa(`${API_KEY}:${API_SECRET}`);
      const refreshToken = store.state.user.session?.refresh_token;
      error.config.headers["Authorization"] = `Basic ${encodedApiCredentials}`;
      const url = `https://rest.cameramanager.com/oauth/token?grant_type=refresh_token&scope=write&refresh_token=${refreshToken}`;
      const response = await axios.post(url);
      store.commit("setSession", response.data);
      error.config.headers[
        "Authorization"
      ] = `Bearer ${response.data.access_token}`;
      return axios(error.config);
    } else {
      return Promise.reject(error);
    }
  }
);

export default api;

import { getCookie } from "./cookies";

export const BASE_URL = "http://localhost:8888";

async function apiClient(endpoint, { body, ...customConfig } = {}) {
  const headers = { "Content-Type": "application/json" };
  const token = getCookie("access_token");

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? "POST" : "GET",
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    if (body instanceof FormData) {
      config.body = body;
      delete config.headers["Content-Type"];
    } else {
      config.body = JSON.stringify(body);
    }
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    return Promise.reject(data);
  } catch (err) {
    return Promise.reject(err.message || "Network Error");
  }
}

apiClient.get = (endpoint, config) => apiClient(endpoint, { ...config, method: "GET" });
apiClient.post = (endpoint, body, config) => apiClient(endpoint, { ...config, method: "POST", body });
apiClient.put = (endpoint, body, config) => apiClient(endpoint, { ...config, method: "PUT", body });
apiClient.patch = (endpoint, body, config) => apiClient(endpoint, { ...config, method: "PATCH", body });
apiClient.delete = (endpoint, config) => apiClient(endpoint, { ...config, method: "DELETE" });

export default apiClient;

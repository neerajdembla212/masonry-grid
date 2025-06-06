const BASE_URL = "https://api.pexels.com/v1/"; // proxied to https://api.pexels.com/v1 (Please check vite config)
const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

if (!API_KEY) {
  throw new Error("Missing VITE_PEXELS_API_KEY in environment variables");
}

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "OPTIONS";

interface RequestOptions<TBody = unknown>
  extends Omit<RequestInit, "body" | "method"> {
  method?: HttpMethod;
  body?: TBody;
  queryParams?: Record<string, string | number>;
}

async function request<TBody = unknown, TResponse = any>(
  endpoint: string,
  options: RequestOptions<TBody>
): Promise<TResponse> {
  const { method = "GET", headers, body, queryParams } = options;
  const requestConfig: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: API_KEY,
      ...headers,
    },
  };

  let url = `${BASE_URL}${endpoint}`;

  if (queryParams && Object.entries(queryParams).length > 0) {
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(queryParams)) {
      searchParams.set(key, String(value));
    }

    url += `?${searchParams.toString()}`;
  }


  if (body) {
    requestConfig.body = JSON.stringify(body);
  }

  const response = await fetch(url, requestConfig);

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Api error: ${response.status} ${errorText}`);
  }

  return response.json();
}

export const http = {
  get: <TResponse = unknown>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<undefined, TResponse>(endpoint, { method: "GET", ...options }),

  post: <TBody, TResponse>(
    endpoint: string,
    body: TBody,
    options?: Omit<RequestOptions, "method" | "body">
  ) =>
    request<TBody, TResponse>(endpoint, { method: "POST", body, ...options }),

  put: <TBody, TResponse>(
    endpoint: string,
    body: TBody,
    options?: Omit<RequestOptions, "method" | "body">
  ) => request<TBody, TResponse>(endpoint, { method: "PUT", body, ...options }),

  delete: <TResponse>(
    endpoint: string,
    options?: Omit<RequestOptions, "method" | "body">
  ) =>
    request<undefined, TResponse>(endpoint, { method: "DELETE", ...options }),
};

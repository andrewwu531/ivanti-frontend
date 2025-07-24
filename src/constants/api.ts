export const API_BASE_URL = "http://localhost:5000";

export const API_ENDPOINTS = {
  TEMPERATURES: "/api/temperatures",
  TEMPERATURE_BY_ID: (id: number) => `/api/temperatures/${id}`,
  TEMPERATURE_STATS: "/api/temperatures/stats/summary",
  DEBUG_VIEW: "/api/debug/view",
  HEALTH: "/health",
} as const;

export const HTTP_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

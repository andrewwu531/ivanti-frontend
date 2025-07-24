export interface TemperatureRequest {
  temperatures: number[];
}

export interface TemperatureResponse {
  closestToZero: number;
  temperatures: number[];
}

export function validateTemperaturePayload(data: any): TemperatureRequest {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid payload: must be an object");
  }

  if (!Array.isArray(data.temperatures)) {
    throw new Error("Invalid payload: temperatures must be an array");
  }

  if (data.temperatures.length === 0) {
    throw new Error("Invalid payload: temperatures array cannot be empty");
  }

  for (let i = 0; i < data.temperatures.length; i++) {
    const temp = data.temperatures[i];
    if (typeof temp !== "number" || isNaN(temp)) {
      throw new Error(
        `Invalid payload: temperature at index ${i} must be a valid number`
      );
    }
  }

  return data as TemperatureRequest;
}

export function findClosestToZero(temperatures: number[]): number {
  if (temperatures.length === 0) {
    throw new Error("No temperatures provided");
  }

  let closest = temperatures[0];
  let minDistance = Math.abs(closest);

  for (const temp of temperatures) {
    const distance = Math.abs(temp);

    if (distance < minDistance) {
      closest = temp;
      minDistance = distance;
    } else if (distance === minDistance && temp > closest) {
      // If equally close, prefer positive number
      closest = temp;
    }
  }

  return closest;
}

export function processTemperatureRequest(
  data: TemperatureRequest
): TemperatureResponse {
  const validatedData = validateTemperaturePayload(data);
  const closestToZero = findClosestToZero(validatedData.temperatures);

  return {
    closestToZero,
    temperatures: validatedData.temperatures,
  };
}

export interface TemperatureRecord {
  id: number;
  personName: string;
  temperatureSeries: number[];
  closestToZero: number;
  recordedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTemperatureRequest {
  personName: string;
  temperatureSeries: number[];
}

export interface UpdateTemperatureRequest {
  personName?: string;
  temperatureSeries?: number[];
}

export interface TemperatureStats {
  totalRecords: number;
  uniquePeopleCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

const API_BASE_URL = "http://localhost:5000/api";

class TemperatureApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        headers: {
          "Content-Type": "application/json",
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || `HTTP error! status: ${response.status}`
        );
      }

      return data;
    } catch (error) {
      throw new Error(error instanceof Error ? error.message : "Network error");
    }
  }

  // Get all temperature records
  async getTemperatureRecords(params?: {
    personName?: string;
    startDate?: string;
    endDate?: string;
    limit?: number;
  }): Promise<TemperatureRecord[]> {
    const searchParams = new URLSearchParams();
    if (params?.personName)
      searchParams.append("personName", params.personName);
    if (params?.startDate) searchParams.append("startDate", params.startDate);
    if (params?.endDate) searchParams.append("endDate", params.endDate);
    if (params?.limit) searchParams.append("limit", params.limit.toString());

    const queryString = searchParams.toString();
    const endpoint = `/temperature-records${queryString ? `?${queryString}` : ""}`;

    const response = await this.request<TemperatureRecord[]>(endpoint);
    return response.data;
  }

  // Get single temperature record
  async getTemperatureRecord(id: number): Promise<TemperatureRecord> {
    const response = await this.request<TemperatureRecord>(
      `/temperature-records/${id}`
    );
    return response.data;
  }

  // Create new temperature record
  async createTemperatureRecord(
    data: CreateTemperatureRequest
  ): Promise<TemperatureRecord> {
    const response = await this.request<TemperatureRecord>(
      "/temperature-records",
      {
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    return response.data;
  }

  // Update temperature record
  async updateTemperatureRecord(
    id: number,
    data: UpdateTemperatureRequest
  ): Promise<TemperatureRecord> {
    const response = await this.request<TemperatureRecord>(
      `/temperature-records/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
      }
    );
    return response.data;
  }

  // Delete temperature record
  async deleteTemperatureRecord(id: number): Promise<void> {
    await this.request(`/temperature-records/${id}`, {
      method: "DELETE",
    });
  }

  // Get temperature statistics
  async getStats(): Promise<TemperatureStats> {
    const response = await this.request<TemperatureStats>(
      "/temperature-records/stats/summary"
    );
    return response.data;
  }
}

export const temperatureApi = new TemperatureApiService();

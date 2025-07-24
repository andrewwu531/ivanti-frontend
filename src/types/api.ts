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
  averageTemperature: number;
  minTemperature: number;
  maxTemperature: number;
  uniquePeopleCount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface ApiError {
  success: false;
  message: string;
  error: string;
}

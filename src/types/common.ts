export type LoadingState = "idle" | "loading" | "success" | "error";

export interface FormState {
  personName: string;
  temperatureSeries: string;
  errors: Record<string, string>;
  isSubmitting: boolean;
}

export interface ChartDataPoint {
  index: number;
  temperature: number;
  isClosestToZero: boolean;
}

export type TemperatureVariant = "normal" | "warning" | "danger";

export interface ValidationError {
  field: string;
  message: string;
}

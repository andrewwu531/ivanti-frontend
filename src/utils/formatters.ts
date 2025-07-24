export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleString();
};

export const formatTemperature = (temperature: number): string => {
  return `${temperature}°C`;
};

export const formatTemperatureSeries = (temperatures: number[]): string => {
  return temperatures.join(", ");
};

export const formatRecordCount = (count: number): string => {
  return `${count} temperature${count !== 1 ? "s" : ""}`;
};

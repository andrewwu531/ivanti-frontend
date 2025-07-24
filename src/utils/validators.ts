export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export const validatePersonName = (name: string): ValidationResult => {
  if (!name.trim()) {
    return { isValid: false, message: "Person name is required" };
  }
  if (name.length < 2) {
    return {
      isValid: false,
      message: "Person name must be at least 2 characters",
    };
  }
  if (name.length > 50) {
    return {
      isValid: false,
      message: "Person name must be less than 50 characters",
    };
  }
  return { isValid: true };
};

export const validateTemperatureSeries = (
  temperatures: string
): ValidationResult => {
  if (!temperatures.trim()) {
    return { isValid: false, message: "Temperature series is required" };
  }

  const tempArray = temperatures.split(",").map((t) => t.trim());

  if (tempArray.length === 0) {
    return { isValid: false, message: "At least one temperature is required" };
  }

  for (const temp of tempArray) {
    const num = parseFloat(temp);
    if (isNaN(num)) {
      return { isValid: false, message: `Invalid temperature: ${temp}` };
    }
    if (num < -100 || num > 100) {
      return {
        isValid: false,
        message: `Temperature must be between -100 and 100°C`,
      };
    }
  }

  return { isValid: true };
};

export const validateForm = (
  personName: string,
  temperatureSeries: string
): ValidationResult => {
  const nameValidation = validatePersonName(personName);
  if (!nameValidation.isValid) {
    return nameValidation;
  }

  const tempValidation = validateTemperatureSeries(temperatureSeries);
  if (!tempValidation.isValid) {
    return tempValidation;
  }

  return { isValid: true };
};

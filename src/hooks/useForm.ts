import { useState, useCallback } from "react";
import type { FormState, ValidationError } from "../types/common";
import { validateForm } from "../utils/validators";

export const useForm = (initialData?: {
  personName: string;
  temperatureSeries: string;
}) => {
  const [formState, setFormState] = useState<FormState>({
    personName: initialData?.personName || "",
    temperatureSeries: initialData?.temperatureSeries || "",
    errors: {},
    isSubmitting: false,
  });

  const updateField = useCallback(
    (
      field: keyof Omit<FormState, "errors" | "isSubmitting">,
      value: string
    ) => {
      setFormState((prev) => ({
        ...prev,
        [field]: value,
        errors: { ...prev.errors, [field]: undefined },
      }));
    },
    []
  );

  const validateField = useCallback((field: string, value: string) => {
    let validationResult;

    if (field === "personName") {
      validationResult = validatePersonName(value);
    } else if (field === "temperatureSeries") {
      validationResult = validateTemperatureSeries(value);
    } else {
      return;
    }

    setFormState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        [field]: validationResult.isValid
          ? undefined
          : validationResult.message,
      },
    }));
  }, []);

  const validateAll = useCallback(() => {
    const validationResult = validateForm(
      formState.personName,
      formState.temperatureSeries
    );

    if (!validationResult.isValid) {
      setFormState((prev) => ({
        ...prev,
        errors: { general: validationResult.message },
      }));
      return false;
    }

    setFormState((prev) => ({ ...prev, errors: {} }));
    return true;
  }, [formState.personName, formState.temperatureSeries]);

  const setSubmitting = useCallback((isSubmitting: boolean) => {
    setFormState((prev) => ({ ...prev, isSubmitting }));
  }, []);

  const reset = useCallback(() => {
    setFormState({
      personName: "",
      temperatureSeries: "",
      errors: {},
      isSubmitting: false,
    });
  }, []);

  return {
    formState,
    updateField,
    validateField,
    validateAll,
    setSubmitting,
    reset,
  };
};

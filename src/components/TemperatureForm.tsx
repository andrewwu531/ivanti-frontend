import React, { useState } from "react";
import type { CreateTemperatureRequest } from "../utils/temperatureApi";
import FormContainer from "./form/FormContainer";
import FormHeader from "./form/FormHeader";
import FormField from "./form/FormField";
import FormError from "./form/FormError";
import FormActions from "./form/FormActions";

interface TemperatureFormProps {
  onSubmit: (data: CreateTemperatureRequest) => void;
  isLoading?: boolean;
  initialData?: {
    personName: string;
    temperatureSeries: number[];
  };
  submitText?: string;
}

const TemperatureForm: React.FC<TemperatureFormProps> = ({
  onSubmit,
  isLoading = false,
  initialData,
  submitText = "Add Temperature Record",
}) => {
  const [formData, setFormData] = useState({
    personName: initialData?.personName || "",
    temperatureSeries: initialData?.temperatureSeries?.join(", ") || "",
  });
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (!formData.personName.trim()) {
      setError("Person name is required");
      return;
    }

    if (!formData.temperatureSeries.trim()) {
      setError("Temperature series is required");
      return;
    }

    try {
      // Parse the input as comma-separated numbers
      const temperatures = formData.temperatureSeries
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0)
        .map((s) => {
          const num = parseFloat(s);
          if (isNaN(num)) {
            throw new Error(`Invalid number: ${s}`);
          }
          return num;
        });

      if (temperatures.length === 0) {
        throw new Error("Please enter at least one temperature");
      }

      onSubmit({
        personName: formData.personName.trim(),
        temperatureSeries: temperatures,
      });

      // Reset form if not editing
      if (!initialData) {
        setFormData({ personName: "", temperatureSeries: "" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid input");
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (error) setError("");
  };

  const title = initialData
    ? "Edit Temperature Record"
    : "Create New Temperature Record";

  return (
    <FormContainer>
      <FormHeader title={title} />
      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <FormField
          id="personName"
          label="Person Name"
          type="text"
          value={formData.personName}
          onChange={(value) => handleInputChange("personName", value)}
          placeholder="Enter person name"
          disabled={isLoading}
          required
        />

        <FormField
          id="temperatureSeries"
          label="Temperature Series (comma-separated)"
          type="textarea"
          value={formData.temperatureSeries}
          onChange={(value) => handleInputChange("temperatureSeries", value)}
          placeholder="e.g., 7, -10, 13, -7.2, 8, -12, 4, -3.7, 3.5, -9.6, 6.5, -1.7, -6.2, 7"
          disabled={isLoading}
          required
          helpText="Enter temperatures separated by commas (e.g., 7, -10, 13, -7.2)"
        />

        <FormError error={error} />

        <FormActions
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitText={submitText}
        />
      </form>
    </FormContainer>
  );
};

export default TemperatureForm;

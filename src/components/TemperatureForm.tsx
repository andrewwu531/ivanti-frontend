import React, { useState } from "react";
import type { CreateTemperatureRequest } from "../utils/temperatureApi";

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

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">
          {initialData
            ? "Edit Temperature Record"
            : "Create New Temperature Record"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-6">
        <div>
          <label
            htmlFor="personName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Person Name *
          </label>
          <input
            id="personName"
            type="text"
            value={formData.personName}
            onChange={(e) => handleInputChange("personName", e.target.value)}
            placeholder="Enter person name"
            className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="temperatureSeries"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Temperature Series (comma-separated) *
          </label>
          <textarea
            id="temperatureSeries"
            value={formData.temperatureSeries}
            onChange={(e) =>
              handleInputChange("temperatureSeries", e.target.value)
            }
            placeholder="e.g., 7, -10, 13, -7.2, 8, -12, 4, -3.7, 3.5, -9.6, 6.5, -1.7, -6.2, 7"
            className="px-3 py-2 w-full rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            rows={4}
            disabled={isLoading}
          />
          <p className="mt-2 text-sm text-gray-500">
            Enter temperatures separated by commas (e.g., 7, -10, 13, -7.2)
          </p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 rounded-md border border-red-200">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="w-5 h-5 text-red-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md border border-transparent shadow-sm transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <svg
                  className="mr-2 -ml-1 w-4 h-4 text-white animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : (
              submitText
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TemperatureForm;

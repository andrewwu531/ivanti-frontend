import React from "react";

interface FormActionsProps {
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
  submitText?: string;
}

const FormActions: React.FC<FormActionsProps> = ({
  onSubmit,
  isLoading = false,
  submitText = "Submit",
}) => {
  return (
    <div className="flex justify-end space-x-3">
      <button
        type="submit"
        onClick={onSubmit}
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
  );
};

export default FormActions;

import React from "react";
import type { TemperatureRecord } from "../../utils/temperatureApi";

interface RecordHeaderProps {
  record: TemperatureRecord;
  onEdit: (record: TemperatureRecord) => void;
  onDelete: () => void; // Changed to no parameters since it just shows the modal
  onBack: () => void;
}

const RecordHeader: React.FC<RecordHeaderProps> = ({
  record,
  onEdit,
  onDelete,
  onBack,
}) => {
  return (
    <div className="px-6 py-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="inline-flex items-center text-gray-600 transition-colors duration-200 hover:text-gray-900"
        >
          <svg
            className="mr-2 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Dashboard
        </button>
        <div className="flex space-x-3">
          <button
            onClick={() => onEdit(record)}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md border border-gray-300 transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
            Edit
          </button>
          <button
            onClick={onDelete} // Changed to just call the function
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md border border-transparent transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            <svg
              className="mr-2 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordHeader;

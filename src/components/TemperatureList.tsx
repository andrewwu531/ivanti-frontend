import React, { useState } from "react";
import type {
  TemperatureRecord,
  CreateTemperatureRequest,
} from "../utils/temperatureApi";
import TemperatureChart from "./TemperatureChart";
import TemperatureForm from "./TemperatureForm";

interface TemperatureListProps {
  temperatures: TemperatureRecord[];
  onEdit: (id: number, data: CreateTemperatureRequest) => Promise<void>;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const TemperatureList: React.FC<TemperatureListProps> = ({
  temperatures,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const [deleteConfirmId, setDeleteConfirmId] = useState<number | null>(null);
  const [editId, setEditId] = useState<number | null>(null);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const handleDeleteClick = (id: number) => {
    setDeleteConfirmId(id);
  };

  const handleDeleteConfirm = () => {
    if (deleteConfirmId) {
      onDelete(deleteConfirmId);
      setDeleteConfirmId(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteConfirmId(null);
  };

  const toggleExpanded = (id: number) => {
    // This function is no longer needed for inline editing,
    // but keeping it for now as it might be used elsewhere or removed later.
    // setExpandedRecord(expandedRecord === id ? null : id);
  };

  if (isLoading) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="animate-pulse">
          <div className="mb-4 w-1/4 h-4 bg-gray-200 rounded"></div>
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-12 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (temperatures.length === 0) {
    return (
      <div className="p-6 bg-white rounded-lg shadow-lg">
        <div className="py-8 text-center text-gray-500">
          <svg
            className="mx-auto w-12 h-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">
            No temperature records
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Get started by adding a new temperature record.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-2xl font-semibold text-gray-800">
        Temperature Records ({temperatures.length})
      </h2>

      <div className="space-y-4">
        {temperatures.map((record) => (
          <div
            key={record.id}
            className="p-4 rounded-lg border border-gray-200"
          >
            {editId === record.id ? (
              <TemperatureForm
                onSubmit={async (data) => {
                  await onEdit(record.id, data);
                  setEditId(null);
                }}
                isLoading={false}
                initialData={{
                  personName: record.personName,
                  temperatureSeries: record.temperatureSeries,
                }}
                submitText="Save"
              />
            ) : (
              <>
                <div className="flex justify-between items-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {record.personName}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Recorded: {formatDate(record.recordedAt)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Temperatures: {record.temperatureSeries.join(", ")}
                    </p>
                    <p className="text-sm font-medium text-blue-600">
                      Closest to zero: {record.closestToZero}
                    </p>
                  </div>
                  <div className="flex ml-4 space-x-2">
                    <button
                      onClick={() => setEditId(record.id)}
                      className="text-indigo-600 transition-colors duration-200 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(record.id)}
                      className="text-red-600 transition-colors duration-200 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                {/* The chart is no longer expanded/collapsed, so it's always shown */}
                <div className="mt-4">
                  <TemperatureChart
                    temperatures={record.temperatureSeries}
                    closestToZero={record.closestToZero}
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="overflow-y-auto fixed inset-0 z-50 w-full h-full bg-gray-600 bg-opacity-50">
          <div className="relative top-20 p-5 mx-auto w-96 bg-white rounded-md border shadow-lg">
            <div className="mt-3 text-center">
              <h3 className="mb-4 text-lg font-medium text-gray-900">
                Confirm Delete
              </h3>
              <p className="mb-6 text-sm text-gray-500">
                Are you sure you want to delete this temperature record? This
                action cannot be undone.
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleDeleteCancel}
                  className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md transition-colors duration-200 hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteConfirm}
                  className="px-4 py-2 text-white bg-red-600 rounded-md transition-colors duration-200 hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TemperatureList;

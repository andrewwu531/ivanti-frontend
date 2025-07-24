import React from "react";
import type { TemperatureRecord } from "../../utils/temperatureApi";

interface RecordDetailsProps {
  record: TemperatureRecord;
}

const RecordDetails: React.FC<RecordDetailsProps> = ({ record }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <div className="p-6 w-[30%] border-r border-gray-200">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Record Details
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Person Name
          </label>
          <div className="text-lg font-medium text-gray-900">
            {record.personName}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Temperature Series
          </label>
          <div className="overflow-y-auto p-3 max-h-32 text-sm text-gray-900 bg-gray-50 rounded-md">
            {record.temperatureSeries.join(", ")}
          </div>
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Closest to Zero
          </label>
          <div className="text-lg font-semibold text-blue-600">
            {record.closestToZero}°C
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Recorded At
            </label>
            <div className="text-sm text-gray-900">
              {formatDate(record.recordedAt)}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Created At
            </label>
            <div className="text-sm text-gray-900">
              {formatDate(record.createdAt)}
            </div>
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Last Updated
            </label>
            <div className="text-sm text-gray-900">
              {formatDate(record.updatedAt)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordDetails;

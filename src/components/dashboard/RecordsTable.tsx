import React from "react";
import type { TemperatureRecord } from "../../utils/temperatureApi";
import RecordRow from "./RecordRow";

interface RecordsTableProps {
  records: TemperatureRecord[];
  onView: (record: TemperatureRecord) => void;
}

const RecordsTable: React.FC<RecordsTableProps> = ({ records, onView }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Person Name
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Temperature Count
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Closest to Zero
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Last Updated
            </th>
            <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {records.map((record) => (
            <RecordRow key={record.id} record={record} onView={onView} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecordsTable;

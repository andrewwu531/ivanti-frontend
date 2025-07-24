import React from "react";
import type { TemperatureRecord } from "../../utils/temperatureApi";
import Button from "../ui/Button";
import TemperatureBadge from "./TemperatureBadge";

interface RecordRowProps {
  record: TemperatureRecord;
  onView: (record: TemperatureRecord) => void;
  isLast?: boolean;
}

const RecordRow: React.FC<RecordRowProps> = ({
  record,
  onView,
  isLast = false,
}) => {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleString();

  return (
    <tr className={` ${isLast ? "border-b-0" : ""}`}>
      <td
        className={`px-11 py-2 whitespace-nowrap ${isLast ? "rounded-bl-xl" : ""}`}
      >
        <div className="text-sm font-medium text-gray-900">
          {record.personName}
        </div>
      </td>
      <td className="px-6 whitespace-nowrap">
        <div className="text-sm text-gray-900">
          {record.temperatureSeries.length} temperatures
        </div>
      </td>
      <td className="px-6 whitespace-nowrap">
        <TemperatureBadge temperature={record.closestToZero} />
      </td>
      <td className="px-6 text-sm text-gray-500 whitespace-nowrap">
        {formatDate(record.updatedAt)}
      </td>
      <td
        className={`px-6 py-3 text-sm font-medium whitespace-nowrap ${isLast ? "rounded-br-xl" : ""}`}
      >
        <Button onClick={() => onView(record)} variant="view" size="md">
          <svg
            className="mr-1 w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
          View
        </Button>
      </td>
    </tr>
  );
};

export default RecordRow;

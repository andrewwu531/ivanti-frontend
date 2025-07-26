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
        <Button
          onClick={() => onView(record)}
          variant="view"
          size="md"
          icon="view"
        >
          View
        </Button>
      </td>
    </tr>
  );
};

export default RecordRow;

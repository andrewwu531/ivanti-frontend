import React from "react";
import type { TemperatureRecord } from "../../utils/temperatureApi";
import Button from "../ui/Button";

interface RecordHeaderProps {
  record: TemperatureRecord;
  onEdit: (record: TemperatureRecord) => void;
  onDelete: () => void;
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
        <Button
          onClick={onBack}
          variant="secondary"
          icon="back"
          className="text-gray-600 hover:text-gray-900"
        >
          Back to Dashboard
        </Button>
        <div className="flex space-x-3">
          <Button
            onClick={() => onEdit(record)}
            variant="secondary"
            icon="edit"
          >
            Edit
          </Button>
          <Button onClick={onDelete} variant="danger" icon="delete">
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RecordHeader;

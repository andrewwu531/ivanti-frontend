import React, { useState } from "react";
import type { TemperatureRecord } from "../utils/temperatureApi";
import RecordChart from "./record/RecordChart";
import RecordHeader from "./record/RecordHeader";
import RecordDetails from "./record/RecordDetails";
import DeleteConfirmationModal from "./ui/DeleteConfirmationModal";

interface RecordDetailProps {
  record: TemperatureRecord;
  onEdit: (record: TemperatureRecord) => void;
  onDelete: (id: number) => void;
  onBack: () => void;
}

const RecordDetail: React.FC<RecordDetailProps> = ({
  record,
  onEdit,
  onDelete,
  onBack,
}) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(record.id);
    setShowDeleteModal(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-gray-200 shadow-lg">
        <RecordHeader
          record={record}
          onEdit={onEdit}
          onDelete={handleDeleteClick}
          onBack={onBack}
        />
        <div className="flex">
          <RecordDetails record={record} />
          {/* Chart Section - 70% */}
          <div className="p-6 w-[70%]">
            <h3 className="mb-6 text-xl font-semibold text-gray-900">
              Temperature Analysis
            </h3>
            <div className="h-full">
              <RecordChart
                temperatures={record.temperatureSeries}
                closestToZero={record.closestToZero}
              />
            </div>
          </div>
        </div>
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        personName={record.personName}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
      />
    </>
  );
};

export default RecordDetail;

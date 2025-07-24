import React from "react";
import type { TemperatureRecord } from "../../utils/temperatureApi";
import TemperatureForm from "../TemperatureForm";
import Dashboard from "../Dashboard";
import RecordDetail from "../RecordDetail";
import ErrorDisplay from "../ui/ErrorDisplay";

type ViewMode = "dashboard" | "detail" | "create" | "edit";

interface MainContentProps {
  viewMode: ViewMode;
  records: TemperatureRecord[];
  selectedRecord: TemperatureRecord | null;
  editRecord: TemperatureRecord | null;
  error: string;
  formLoading: boolean;
  onView: (record: TemperatureRecord) => void;
  onCreate: (data: {
    personName: string;
    temperatureSeries: number[];
  }) => Promise<void>;
  onEdit: (data: {
    personName: string;
    temperatureSeries: number[];
  }) => Promise<void>;
  onEditClick: (record: TemperatureRecord) => void;
  onDelete: (id: number) => Promise<void>;
  onBack: () => void;
  onCreateClick: () => void;
}

const MainContent: React.FC<MainContentProps> = ({
  viewMode,
  records,
  selectedRecord,
  editRecord,
  error,
  formLoading,
  onView,
  onCreate,
  onEdit,
  onEditClick,
  onDelete,
  onBack,
  onCreateClick,
}) => {
  return (
    <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <ErrorDisplay error={error} />

        {viewMode === "create" && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Create New Record
              </h2>
              <button
                onClick={onBack}
                className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
            <TemperatureForm
              onSubmit={onCreate}
              isLoading={formLoading}
              submitText="Create Record"
            />
          </div>
        )}

        {viewMode === "edit" && editRecord && (
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Record
              </h2>
              <button
                onClick={onBack}
                className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                Cancel
              </button>
            </div>
            <TemperatureForm
              onSubmit={onEdit}
              isLoading={formLoading}
              initialData={{
                personName: editRecord.personName,
                temperatureSeries: editRecord.temperatureSeries,
              }}
              submitText="Update Record"
            />
          </div>
        )}

        {viewMode === "dashboard" && (
          <Dashboard
            records={records}
            onView={onView}
            onCreate={onCreateClick} // Fix: Use onCreateClick instead of onBack
          />
        )}

        {viewMode === "detail" && selectedRecord && (
          <RecordDetail
            record={selectedRecord}
            onEdit={onEditClick}
            onDelete={onDelete}
            onBack={onBack}
          />
        )}
      </div>
    </main>
  );
};

export default MainContent;

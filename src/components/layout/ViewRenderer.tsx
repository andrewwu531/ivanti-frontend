import React from "react";
import type { TemperatureRecord } from "../../utils/temperatureApi";
import Dashboard from "../Dashboard";
import RecordDetail from "../RecordDetail";
import FormView from "./FormView";

type ViewMode = "dashboard" | "detail" | "create" | "edit";

interface ViewRendererProps {
  viewMode: ViewMode;
  records: TemperatureRecord[];
  selectedRecord: TemperatureRecord | null;
  editRecord: TemperatureRecord | null;
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

const ViewRenderer: React.FC<ViewRendererProps> = ({
  viewMode,
  records,
  selectedRecord,
  editRecord,
  formLoading,
  onView,
  onCreate,
  onEdit,
  onEditClick,
  onDelete,
  onBack,
  onCreateClick,
}) => {
  switch (viewMode) {
    case "create":
      return (
        <FormView
          mode="create"
          formLoading={formLoading}
          onSubmit={onCreate}
          onCancel={onBack}
        />
      );

    case "edit":
      return (
        <FormView
          mode="edit"
          editRecord={editRecord}
          formLoading={formLoading}
          onSubmit={onEdit}
          onCancel={onBack}
        />
      );

    case "dashboard":
      return (
        <Dashboard records={records} onView={onView} onCreate={onCreateClick} />
      );

    case "detail":
      return selectedRecord ? (
        <RecordDetail
          record={selectedRecord}
          onEdit={onEditClick}
          onDelete={onDelete}
          onBack={onBack}
        />
      ) : null;

    default:
      return null;
  }
};

export default ViewRenderer;

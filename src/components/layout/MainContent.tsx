import React from "react";
import type { TemperatureRecord } from "../../utils/temperatureApi";
import ErrorDisplay from "../ui/ErrorDisplay";
import ViewRenderer from "./ViewRenderer";

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

const MainContent: React.FC<MainContentProps> = (props) => {
  return (
    <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="px-4 py-6 sm:px-0">
        <ErrorDisplay error={props.error} />
        <ViewRenderer {...props} />
      </div>
    </main>
  );
};

export default MainContent;

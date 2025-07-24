import React from "react";
import type { TemperatureRecord } from "../utils/temperatureApi";
import DashboardHeader from "./dashboard/DashboardHeader";
import RecordsTable from "./dashboard/RecordsTable";
import DashboardEmpty from "./dashboard/DashboardEmpty";

interface DashboardProps {
  records: TemperatureRecord[];
  onView: (record: TemperatureRecord) => void;
  onCreate: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ records, onView, onCreate }) => {
  if (records.length === 0) {
    return <DashboardEmpty onCreate={onCreate} />;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-lg">
      <DashboardHeader recordCount={records.length} onCreate={onCreate} />
      <RecordsTable records={records} onView={onView} />
    </div>
  );
};

export default Dashboard;

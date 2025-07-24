import { useEffect, useState } from "react";
import type { TemperatureRecord } from "./utils/temperatureApi";
import { temperatureApi } from "./utils/temperatureApi";
import Header from "./components/layout/Header";
import MainContent from "./components/layout/MainContent";

type ViewMode = "dashboard" | "detail" | "create" | "edit";

function App() {
  const [records, setRecords] = useState<TemperatureRecord[]>([]);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [selectedRecord, setSelectedRecord] =
    useState<TemperatureRecord | null>(null);
  const [editRecord, setEditRecord] = useState<TemperatureRecord | null>(null);

  // Fetch all records
  const fetchData = async () => {
    setError("");
    try {
      const recordsData = await temperatureApi.getTemperatureRecords();
      setRecords(recordsData);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch data");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create new record
  const handleCreate = async (data: {
    personName: string;
    temperatureSeries: number[];
  }) => {
    setFormLoading(true);
    setError("");
    try {
      await temperatureApi.createTemperatureRecord(data);
      await fetchData();
      setViewMode("dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to save record");
    }
    setFormLoading(false);
  };

  // Edit record
  const handleEdit = async (data: {
    personName: string;
    temperatureSeries: number[];
  }) => {
    if (!editRecord) return;

    setFormLoading(true);
    setError("");
    try {
      await temperatureApi.updateTemperatureRecord(editRecord.id, data);
      await fetchData();
      setViewMode("dashboard");
      setEditRecord(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update record");
    }
    setFormLoading(false);
  };

  // Delete record
  const handleDelete = async (id: number) => {
    setError("");
    try {
      await temperatureApi.deleteTemperatureRecord(id);
      await fetchData();
      if (viewMode === "detail" && selectedRecord?.id === id) {
        setViewMode("dashboard");
        setSelectedRecord(null);
      }
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to delete record");
    }
  };

  // View record detail
  const handleView = (record: TemperatureRecord) => {
    setSelectedRecord(record);
    setViewMode("detail");
  };

  // Edit record (opens edit form)
  const handleEditClick = (record: TemperatureRecord) => {
    setEditRecord(record);
    setViewMode("edit");
  };

  // Back to dashboard
  const handleBack = () => {
    setViewMode("dashboard");
    setSelectedRecord(null);
    setEditRecord(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <MainContent
        viewMode={viewMode}
        records={records}
        selectedRecord={selectedRecord}
        editRecord={editRecord}
        error={error}
        formLoading={formLoading}
        onView={handleView}
        onCreate={handleCreate}
        onEdit={handleEdit}
        onEditClick={handleEditClick}
        onDelete={handleDelete}
        onBack={handleBack}
      />
    </div>
  );
}

export default App;

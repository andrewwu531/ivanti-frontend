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

  const handleEdit = async (data: {
    personName: string;
    temperatureSeries: number[];
  }) => {
    if (!editRecord) return;

    setFormLoading(true);
    setError("");
    try {
      const updatedRecord = await temperatureApi.updateTemperatureRecord(
        editRecord.id,
        data
      );
      await fetchData();
      setSelectedRecord(updatedRecord);
      setViewMode("detail");
      setEditRecord(null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to update record");
    }
    setFormLoading(false);
  };

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

  const handleView = (record: TemperatureRecord) => {
    setSelectedRecord(record);
    setViewMode("detail");
  };

  const handleEditClick = (record: TemperatureRecord) => {
    setEditRecord(record);
    setViewMode("edit");
  };

  const handleBack = () => {
    setViewMode("dashboard");
    setSelectedRecord(null);
    setEditRecord(null);
  };

  const handleCreateClick = () => {
    setViewMode("create");
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
        onCreateClick={handleCreateClick}
      />
    </div>
  );
}

export default App;

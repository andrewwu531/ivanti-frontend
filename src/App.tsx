import React, { useEffect, useState } from "react";
import type { TemperatureRecord } from "./utils/temperatureApi";
import { temperatureApi } from "./utils/temperatureApi";
import TemperatureForm from "./components/TemperatureForm";
import Dashboard from "./components/Dashboard";
import RecordDetail from "./components/RecordDetail";

type ViewMode = "dashboard" | "detail" | "create" | "edit";

function App() {
  const [records, setRecords] = useState<TemperatureRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [selectedRecord, setSelectedRecord] =
    useState<TemperatureRecord | null>(null);
  const [editRecord, setEditRecord] = useState<TemperatureRecord | null>(null);

  // Fetch all records
  const fetchData = async () => {
    setLoading(true);
    setError("");
    try {
      const recordsData = await temperatureApi.getTemperatureRecords();
      setRecords(recordsData);
    } catch (err: any) {
      setError(err.message || "Failed to fetch data");
    }
    setLoading(false);
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
    } catch (err: any) {
      setError(err.message || "Failed to save record");
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
    } catch (err: any) {
      setError(err.message || "Failed to update record");
    }
    setFormLoading(false);
  };

  // Delete record
  const handleDelete = async (id: number) => {
    setLoading(true);
    setError("");
    try {
      await temperatureApi.deleteTemperatureRecord(id);
      await fetchData();
      if (viewMode === "detail" && selectedRecord?.id === id) {
        setViewMode("dashboard");
        setSelectedRecord(null);
      }
    } catch (err: any) {
      setError(err.message || "Failed to delete record");
    }
    setLoading(false);
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
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h1 className="text-2xl font-bold text-gray-900">Ivanti</h1>
                <p className="text-sm text-gray-500">
                  Temperature Management System
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {error && (
            <div className="p-4 mb-6 bg-red-50 rounded-md border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="w-5 h-5 text-red-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {viewMode === "create" && (
            <div className="mb-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Create New Record
                </h2>
                <button
                  onClick={handleBack}
                  className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
              <TemperatureForm
                onSubmit={handleCreate}
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
                  onClick={handleBack}
                  className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  Cancel
                </button>
              </div>
              <TemperatureForm
                onSubmit={handleEdit}
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
              onView={handleView}
              onCreate={() => setViewMode("create")}
              isLoading={loading}
            />
          )}

          {viewMode === "detail" && selectedRecord && (
            <RecordDetail
              record={selectedRecord}
              onEdit={handleEditClick}
              onDelete={handleDelete}
              onBack={handleBack}
            />
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
